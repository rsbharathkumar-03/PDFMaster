package com.pdfmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompressResultDto {
    private long originalSizeBytes;
    private long compressedSizeBytes;
    private int savingsPercentage;
    private String downloadUrl;
    private String fileName;
}
