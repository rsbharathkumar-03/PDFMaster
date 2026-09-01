package com.pdfmaster.controller;

import com.pdfmaster.dto.CompressResultDto;
import com.pdfmaster.dto.WatermarkRequestDto;
import com.pdfmaster.service.PdfProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PdfController {

    private final PdfProcessingService pdfService;

    @PostMapping(value = "/to-word", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertPdfToWord(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("REST: POST /api/pdf/to-word (size: {} bytes)", file.getSize());
        byte[] data = pdfService.convertPdfToWord(file);
        return createAttachmentResponse(data, "document.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    }

    @PostMapping(value = "/to-jpg", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertPdfToJpg(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("REST: POST /api/pdf/to-jpg (size: {} bytes)", file.getSize());
        byte[] zipData = pdfService.convertPdfToJpgZip(file);
        return createAttachmentResponse(zipData, "pdf_images.zip", "application/zip");
    }

    @PostMapping(value = "/merge", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> mergePdfs(@RequestParam("files") List<MultipartFile> files) throws IOException {
        log.info("REST: POST /api/pdf/merge (files: {})", files.size());
        byte[] merged = pdfService.mergePdfs(files);
        return createAttachmentResponse(merged, "merged_document.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/split", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> splitPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "1") String ranges) throws IOException {
        log.info("REST: POST /api/pdf/split (ranges: {})", ranges);
        byte[] splitData = pdfService.splitPdf(file, ranges);
        return createAttachmentResponse(splitData, "split_document.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/compress", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CompressResultDto> compressPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "medium") String level) throws IOException {
        log.info("REST: POST /api/pdf/compress (level: {})", level);
        return ResponseEntity.ok(pdfService.compressPdf(file, level));
    }

    @PostMapping(value = "/to-excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertPdfToExcel(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("REST: POST /api/pdf/to-excel (size: {} bytes)", file.getSize());
        byte[] excelBytes = pdfService.convertPdfToExcel(file);
        return createAttachmentResponse(excelBytes, "spreadsheet.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @PostMapping(value = "/to-ppt", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertPdfToPpt(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("REST: POST /api/pdf/to-ppt (size: {} bytes)", file.getSize());
        byte[] pptBytes = pdfService.convertPdfToPpt(file);
        return createAttachmentResponse(pptBytes, "presentation.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
    }

    @PostMapping(value = "/protect", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> protectPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) throws IOException {
        log.info("REST: POST /api/pdf/protect");
        byte[] protectedBytes = pdfService.protectPdf(file, password);
        return createAttachmentResponse(protectedBytes, "protected.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/unlock", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> unlockPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "password", required = false) String password) throws IOException {
        log.info("REST: POST /api/pdf/unlock");
        byte[] unlockedBytes = pdfService.unlockPdf(file, password);
        return createAttachmentResponse(unlockedBytes, "unlocked.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/rotate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> rotatePdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "90") int angle,
            @RequestParam(defaultValue = "") String pages) throws IOException {
        log.info("REST: POST /api/pdf/rotate (angle: {}, pages: {})", angle, pages);
        byte[] rotatedBytes = pdfService.rotatePdf(file, angle, pages);
        return createAttachmentResponse(rotatedBytes, "rotated.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/watermark", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> watermarkPdf(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute WatermarkRequestDto dto) throws IOException {
        log.info("REST: POST /api/pdf/watermark (text: {})", dto.getText());
        byte[] watermarkedBytes = pdfService.watermarkPdf(file, dto);
        return createAttachmentResponse(watermarkedBytes, "watermarked.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    private ResponseEntity<Resource> createAttachmentResponse(byte[] data, String filename, String contentType) {
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(data.length)
                .body(resource);
    }
}
