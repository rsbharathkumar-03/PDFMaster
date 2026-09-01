package com.pdfmaster.service;

import com.pdfmaster.dto.ContactFormDto;

public interface ContactService {
    void handleContactMessage(ContactFormDto dto);
}
