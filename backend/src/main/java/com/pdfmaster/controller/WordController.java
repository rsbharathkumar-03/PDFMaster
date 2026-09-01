package com.pdfmaster.controller;

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

@Slf4j
@RestController
@RequestMapping("/api/word")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WordController {

    private final PdfProcessingService pdfService;

    @PostMapping(value = "/to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertWordToPdf(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("REST: POST /api/word/to-pdf (size: {} bytes)", file.getSize());
        byte[] pdfBytes = pdfService.convertWordToPdf(file);
        ByteArrayResource resource = new ByteArrayResource(pdfBytes);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"converted.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(resource);
    }
}
