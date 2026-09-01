package com.pdfmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatermarkRequestDto {
    private String text;
    private Integer fontSize;
    private Float opacity;
    private Integer rotation;
    private String position;
    private String color;
}
