package com.pdfmaster.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 128)
    private String senderName;

    @Column(nullable = false, length = 255)
    private String senderEmail;

    @Column(nullable = false, length = 255)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Builder.Default
    @Column(length = 32)
    private String status = "NEW";

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
