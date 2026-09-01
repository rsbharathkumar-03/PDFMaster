package com.pdfmaster.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tool_usage_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ToolUsageLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String toolName;

    @Column(nullable = false)
    private Long fileSizeBytes;

    private Long processingTimeMs;

    @Builder.Default
    private Boolean success = true;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
