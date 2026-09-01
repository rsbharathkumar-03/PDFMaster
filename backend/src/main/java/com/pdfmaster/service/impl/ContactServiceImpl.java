package com.pdfmaster.service.impl;

import com.pdfmaster.dto.ContactFormDto;
import com.pdfmaster.model.ContactMessage;
import com.pdfmaster.repository.ContactMessageRepository;
import com.pdfmaster.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repository;

    @Value("${app.contact.recipient-email:rsbharathk@gmail.com}")
    private String recipientEmail;

    @Override
    public void handleContactMessage(ContactFormDto dto) {
        log.info("Received contact form submission from: '{}' <{}>. Routing to: {}",
                dto.getName(), dto.getEmail(), recipientEmail);
        try {
            repository.save(ContactMessage.builder()
                    .senderName(dto.getName())
                    .senderEmail(dto.getEmail())
                    .subject(dto.getSubject())
                    .message(dto.getMessage())
                    .status("NEW")
                    .build());
            log.info("Message saved to database and queued for email delivery to: {}", recipientEmail);
        } catch (Exception e) {
            log.warn("Failed to persist contact message (non-blocking): {}", e.getMessage());
        }
    }
}

