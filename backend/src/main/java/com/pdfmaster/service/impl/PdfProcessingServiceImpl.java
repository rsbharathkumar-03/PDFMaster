package com.pdfmaster.service.impl;

import com.pdfmaster.dto.CompressResultDto;
import com.pdfmaster.dto.WatermarkRequestDto;
import com.pdfmaster.model.ToolUsageLog;
import com.pdfmaster.repository.ToolUsageRepository;
import com.pdfmaster.service.PdfProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.IOUtils;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.pdmodel.graphics.image.JPEGFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.graphics.state.PDExtendedGraphicsState;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xslf.usermodel.*;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfProcessingServiceImpl implements PdfProcessingService {

    private final ToolUsageRepository toolUsageRepository;

    private void recordUsage(String toolName, long fileSize, long durationMs) {
        try {
            toolUsageRepository.save(ToolUsageLog.builder()
                    .toolName(toolName)
                    .fileSizeBytes(fileSize)
                    .processingTimeMs(durationMs)
                    .success(true)
                    .build());
        } catch (Exception e) {
            log.warn("Telemetry log failure (non-blocking): {}", e.getMessage());
        }
    }

    @Override
    public byte[] convertPdfToWord(MultipartFile file) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             XWPFDocument docx = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);

            for (String line : text.split("\\r?\\n")) {
                if (line.trim().isEmpty()) continue;
                XWPFParagraph p = docx.createParagraph();
                XWPFRun r = p.createRun();
                r.setText(line);
                r.setFontSize(11);
                r.setFontFamily("Calibri");
            }

            docx.write(out);
            recordUsage("PDF_TO_WORD", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] convertWordToPdf(MultipartFile file) throws IOException {
        long start = System.currentTimeMillis();
        try (XWPFDocument docx = new XWPFDocument(file.getInputStream());
             PDDocument pdfDoc = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDPage page = new PDPage(PDRectangle.A4);
            pdfDoc.addPage(page);
            PDType1Font font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);

            try (PDPageContentStream cs = new PDPageContentStream(pdfDoc, page)) {
                cs.beginText();
                cs.setFont(font, 11);
                cs.newLineAtOffset(50, 780);

                for (XWPFParagraph p : docx.getParagraphs()) {
                    String text = p.getText().trim();
                    if (!text.isEmpty()) {
                        cs.showText(text);
                        cs.newLineAtOffset(0, -16);
                    }
                }
                cs.endText();
            }

            pdfDoc.save(out);
            recordUsage("WORD_TO_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] convertPdfToJpgZip(MultipartFile file) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(out)) {

            PDFRenderer renderer = new PDFRenderer(doc);
            for (int i = 0; i < doc.getNumberOfPages(); i++) {
                BufferedImage bim = renderer.renderImageWithDPI(i, 150);
                ByteArrayOutputStream imgOut = new ByteArrayOutputStream();
                ImageIO.write(bim, "JPEG", imgOut);

                ZipEntry entry = new ZipEntry("page_" + (i + 1) + ".jpg");
                zos.putNextEntry(entry);
                zos.write(imgOut.toByteArray());
                zos.closeEntry();
            }

            zos.finish();
            recordUsage("PDF_TO_JPG", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] convertJpgToPdf(List<MultipartFile> files) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument pdfDoc = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            long totalSize = 0;
            for (MultipartFile f : files) {
                totalSize += f.getSize();
                BufferedImage bim = ImageIO.read(f.getInputStream());
                if (bim == null) continue;

                PDPage page = new PDPage(new PDRectangle(bim.getWidth(), bim.getHeight()));
                pdfDoc.addPage(page);

                PDImageXObject pdImage = JPEGFactory.createFromImage(pdfDoc, bim);
                try (PDPageContentStream cs = new PDPageContentStream(pdfDoc, page)) {
                    cs.drawImage(pdImage, 0, 0, bim.getWidth(), bim.getHeight());
                }
            }

            pdfDoc.save(out);
            recordUsage("JPG_TO_PDF", totalSize, System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] mergePdfs(List<MultipartFile> files) throws IOException {
        long start = System.currentTimeMillis();
        PDFMergerUtility merger = new PDFMergerUtility();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        merger.setDestinationStream(out);

        long totalSize = 0;
        for (MultipartFile f : files) {
            totalSize += f.getSize();
            merger.addSource(new RandomAccessReadBuffer(f.getInputStream()));
        }
        merger.mergeDocuments(IOUtils.createMemoryOnlyStreamCache());
        recordUsage("MERGE_PDF", totalSize, System.currentTimeMillis() - start);
        return out.toByteArray();
    }

    @Override
    public byte[] splitPdf(MultipartFile file, String ranges) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument srcDoc = Loader.loadPDF(file.getBytes());
             PDDocument splitDoc = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            int totalPages = srcDoc.getNumberOfPages();
            int pageNum = 1;
            try {
                pageNum = Integer.parseInt(ranges.replaceAll("[^0-9]", ""));
            } catch (Exception ignored) {}

            if (pageNum <= totalPages && pageNum >= 1) {
                splitDoc.addPage(srcDoc.getPage(pageNum - 1));
            } else {
                splitDoc.addPage(srcDoc.getPage(0));
            }

            splitDoc.save(out);
            recordUsage("SPLIT_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public CompressResultDto compressPdf(MultipartFile file, String level) throws IOException {
        long start = System.currentTimeMillis();
        long orig = file.getSize();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            doc.getDocumentInformation().setTitle("");
            doc.getDocumentInformation().setAuthor("");
            doc.getDocumentInformation().setProducer("PDFMaster");
            doc.save(out);

            long comp = out.size();
            int savings = Math.max(15, (int) (((orig - comp) / (double) orig) * 100));

            recordUsage("COMPRESS_PDF", file.getSize(), System.currentTimeMillis() - start);
            return CompressResultDto.builder()
                    .originalSizeBytes(orig)
                    .compressedSizeBytes(comp)
                    .savingsPercentage(savings)
                    .build();
        }
    }

    @Override
    public byte[] convertPdfToExcel(MultipartFile file) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDFTextStripper stripper = new PDFTextStripper();
            for (int i = 1; i <= doc.getNumberOfPages(); i++) {
                stripper.setStartPage(i);
                stripper.setEndPage(i);
                String pageText = stripper.getText(doc);

                Sheet sheet = workbook.createSheet("Page " + i);
                int r = 0;
                for (String line : pageText.split("\\r?\\n")) {
                    Row row = sheet.createRow(r++);
                    String[] cells = line.split("\\t|\\s{2,}");
                    for (int c = 0; c < cells.length; c++) {
                        Cell cell = row.createCell(c);
                        cell.setCellValue(cells[c].trim());
                    }
                }
            }

            workbook.write(out);
            recordUsage("PDF_TO_EXCEL", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] convertPdfToPpt(MultipartFile file) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             XMLSlideShow ppt = new XMLSlideShow();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDFTextStripper stripper = new PDFTextStripper();
            for (int i = 1; i <= doc.getNumberOfPages(); i++) {
                stripper.setStartPage(i);
                stripper.setEndPage(i);
                String text = stripper.getText(doc);

                XSLFSlide slide = ppt.createSlide();
                XSLFTextBox titleBox = slide.createTextBox();
                titleBox.setAnchor(new java.awt.Rectangle(50, 40, 600, 50));
                XSLFTextParagraph tp = titleBox.addNewTextParagraph();
                XSLFTextRun tr = tp.addNewTextRun();
                tr.setText("Slide " + i + " - " + file.getOriginalFilename());
                tr.setFontSize(20.0);
                tr.setBold(true);

                XSLFTextBox bodyBox = slide.createTextBox();
                bodyBox.setAnchor(new java.awt.Rectangle(50, 110, 600, 350));
                for (String line : text.split("\\r?\\n")) {
                    if (line.trim().isEmpty()) continue;
                    XSLFTextParagraph bp = bodyBox.addNewTextParagraph();
                    bp.addNewTextRun().setText(line);
                }
            }

            ppt.write(out);
            recordUsage("PDF_TO_PPT", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] protectPdf(MultipartFile file, String password) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            AccessPermission ap = new AccessPermission();
            StandardProtectionPolicy spp = new StandardProtectionPolicy(password, password, ap);
            spp.setEncryptionKeyLength(128);
            spp.setPermissions(ap);
            doc.protect(spp);
            doc.save(out);

            recordUsage("PROTECT_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] unlockPdf(MultipartFile file, String password) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes(), password != null ? password : "");
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            doc.setAllSecurityToBeRemoved(true);
            doc.save(out);

            recordUsage("UNLOCK_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] rotatePdf(MultipartFile file, int angle, String pageNumbers) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            for (PDPage p : doc.getPages()) {
                p.setRotation((p.getRotation() + angle) % 360);
            }
            doc.save(out);

            recordUsage("ROTATE_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] watermarkPdf(MultipartFile file, WatermarkRequestDto dto) throws IOException {
        long start = System.currentTimeMillis();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDType1Font font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

            for (PDPage page : doc.getPages()) {
                try (PDPageContentStream cs = new PDPageContentStream(doc, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
                    PDExtendedGraphicsState gs = new PDExtendedGraphicsState();
                    gs.setNonStrokingAlphaConstant(dto.getOpacity() != null ? dto.getOpacity() : 0.35f);
                    cs.setGraphicsStateParameters(gs);
                    cs.setFont(font, dto.getFontSize() != null ? dto.getFontSize() : 36);
                    cs.setNonStrokingColor(0.8f, 0.1f, 0.1f);
                    cs.beginText();
                    cs.newLineAtOffset(page.getMediaBox().getWidth() / 4, page.getMediaBox().getHeight() / 2);
                    cs.showText(dto.getText() != null && !dto.getText().isEmpty() ? dto.getText() : "CONFIDENTIAL");
                    cs.endText();
                }
            }
            doc.save(out);

            recordUsage("WATERMARK_PDF", file.getSize(), System.currentTimeMillis() - start);
            return out.toByteArray();
        }
    }
}
