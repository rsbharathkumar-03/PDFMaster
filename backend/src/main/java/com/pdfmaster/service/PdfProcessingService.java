package com.pdfmaster.service;

import com.pdfmaster.dto.CompressResultDto;
import com.pdfmaster.dto.WatermarkRequestDto;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface PdfProcessingService {

    byte[] convertPdfToWord(MultipartFile file) throws IOException;

    byte[] convertWordToPdf(MultipartFile file) throws IOException;

    byte[] convertPdfToJpgZip(MultipartFile file) throws IOException;

    byte[] convertJpgToPdf(List<MultipartFile> files) throws IOException;

    byte[] mergePdfs(List<MultipartFile> files) throws IOException;

    byte[] splitPdf(MultipartFile file, String ranges) throws IOException;

    CompressResultDto compressPdf(MultipartFile file, String level) throws IOException;

    byte[] convertPdfToExcel(MultipartFile file) throws IOException;

    byte[] convertPdfToPpt(MultipartFile file) throws IOException;

    byte[] protectPdf(MultipartFile file, String password) throws IOException;

    byte[] unlockPdf(MultipartFile file, String password) throws IOException;

    byte[] rotatePdf(MultipartFile file, int angle, String pageNumbers) throws IOException;

    byte[] watermarkPdf(MultipartFile file, WatermarkRequestDto dto) throws IOException;
}
