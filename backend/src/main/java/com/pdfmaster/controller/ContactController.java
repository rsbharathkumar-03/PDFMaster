package com.pdfmaster.controller;

import com.pdfmaster.dto.ApiResponseDto;
import com.pdfmaster.dto.ContactFormDto;
import com.pdfmaster.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponseDto<Void>> submitContactForm(@Valid @RequestBody ContactFormDto dto) {
        log.info("REST: POST /api/contact from: {}", dto.getEmail());
        contactService.handleContactMessage(dto);
        return ResponseEntity.ok(ApiResponseDto.<Void>builder()
                .success(true)
                .message("Message received successfully")
                .build());
    }
}
