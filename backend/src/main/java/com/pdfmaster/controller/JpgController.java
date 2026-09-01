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
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/jpg")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JpgController {

    private final PdfProcessingService pdfService;

    @PostMapping(value = "/to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertJpgToPdf(@RequestParam("files") List<MultipartFile> files) throws IOException {
        log.info("REST: POST /api/jpg/to-pdf (files: {})", files.size());
        byte[] pdfBytes = pdfService.convertJpgToPdf(files);
        ByteArrayResource resource = new ByteArrayResource(pdfBytes);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"images_converted.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(resource);
    }
}
