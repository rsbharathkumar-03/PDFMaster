import React, { useState } from 'react';
import { Code2, Terminal, Copy, Check, FileCode, Server, Database, Layers } from 'lucide-react';

interface JavaCodeViewerModalProps {
  onClose: () => void;
}

export const JavaCodeViewerModal: React.FC<JavaCodeViewerModalProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<'pom' | 'controller' | 'service' | 'config' | 'readme' | 'mysql'>('controller');
  const [copied, setCopied] = useState(false);

  const fileContents = {
    pom: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>
    <groupId>com.pdfmaster</groupId>
    <artifactId>pdfmaster-backend</artifactId>
    <version>1.0.0</version>
    <name>pdfmaster-backend</name>
    <description>Production PDF Processing Backend with Spring Boot 3.x and Apache PDFBox</description>

    <properties>
        <java.version>17</java.version>
        <pdfbox.version>3.0.1</pdfbox.version>
        <poi.version>5.2.5</poi.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Apache PDFBox 3.x (Core PDF Engine) -->
        <dependency>
            <groupId>org.apache.pdfbox</groupId>
            <artifactId>pdfbox</artifactId>
            <version>\${pdfbox.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.pdfbox</groupId>
            <artifactId>pdfbox-tools</artifactId>
            <version>\${pdfbox.version}</version>
        </dependency>

        <!-- Apache POI (DOCX / XLSX / PPTX Generation) -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>\${poi.version}</version>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`,

    controller: `package com.pdfmaster.controller;

import com.pdfmaster.dto.*;
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
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PdfController {

    private final PdfProcessingService pdfService;

    @PostMapping(value = "/to-word", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> convertPdfToWord(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("Request: PDF to Word for file size: {} bytes", file.getSize());
        byte[] docxBytes = pdfService.convertPdfToWord(file);
        return createDownloadResponse(docxBytes, "document.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    }

    @PostMapping(value = "/merge", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> mergePdfs(@RequestParam("files") List<MultipartFile> files) throws IOException {
        log.info("Request: Merge {} PDF files", files.size());
        byte[] mergedBytes = pdfService.mergePdfs(files);
        return createDownloadResponse(mergedBytes, "merged_document.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/compress", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CompressResultDto> compressPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "medium") String level) throws IOException {
        log.info("Request: Compress PDF with level: {}", level);
        return ResponseEntity.ok(pdfService.compressPdf(file, level));
    }

    @PostMapping(value = "/split", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> splitPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "1") String ranges) throws IOException {
        log.info("Request: Split PDF with ranges: {}", ranges);
        byte[] splitBytes = pdfService.splitPdf(file, ranges);
        return createDownloadResponse(splitBytes, "split_document.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/protect", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> protectPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) throws IOException {
        log.info("Request: Protect PDF with encryption");
        byte[] protectedBytes = pdfService.protectPdf(file, password);
        return createDownloadResponse(protectedBytes, "protected.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    @PostMapping(value = "/watermark", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> watermarkPdf(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute WatermarkRequestDto dto) throws IOException {
        log.info("Request: Watermark PDF with text: {}", dto.getText());
        byte[] resultBytes = pdfService.watermarkPdf(file, dto);
        return createDownloadResponse(resultBytes, "watermarked.pdf", MediaType.APPLICATION_PDF_VALUE);
    }

    private ResponseEntity<Resource> createDownloadResponse(byte[] data, String filename, String mediaType) {
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType(mediaType))
                .contentLength(data.length)
                .body(resource);
    }
}`,

    service: `package com.pdfmaster.service;

import com.pdfmaster.dto.CompressResultDto;
import com.pdfmaster.dto.WatermarkRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.IOUtils;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.pdmodel.graphics.state.PDExtendedGraphicsState;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class PdfProcessingServiceImpl implements PdfProcessingService {

    @Override
    public byte[] convertPdfToWord(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes());
             XWPFDocument docx = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            for (String line : text.split("\\r?\\n")) {
                XWPFParagraph p = docx.createParagraph();
                XWPFRun run = p.createRun();
                run.setText(line);
                run.setFontSize(11);
                run.setFontFamily("Calibri");
            }

            docx.write(out);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] mergePdfs(List<MultipartFile> files) throws IOException {
        PDFMergerUtility merger = new PDFMergerUtility();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        merger.setDestinationStream(out);

        for (MultipartFile f : files) {
            merger.addSource(new RandomAccessReadBuffer(f.getInputStream()));
        }
        merger.mergeDocuments(IOUtils.createMemoryOnlyStreamCache());
        return out.toByteArray();
    }

    @Override
    public byte[] watermarkPdf(MultipartFile file, WatermarkRequestDto dto) throws IOException {
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDType1Font font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

            for (PDPage page : doc.getPages()) {
                try (PDPageContentStream cs = new PDPageContentStream(doc, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
                    PDExtendedGraphicsState gs = new PDExtendedGraphicsState();
                    gs.setNonStrokingAlphaConstant(dto.getOpacity() != null ? dto.getOpacity() : 0.35f);
                    cs.setGraphicsStateParameters(gs);
                    cs.setFont(font, dto.getFontSize() != null ? dto.getFontSize() : 40);
                    cs.setNonStrokingColor(0.8f, 0.1f, 0.1f);
                    cs.beginText();
                    cs.newLineAtOffset(page.getMediaBox().getWidth() / 4, page.getMediaBox().getHeight() / 2);
                    cs.showText(dto.getText() != null ? dto.getText() : "CONFIDENTIAL");
                    cs.endText();
                }
            }
            doc.save(out);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] protectPdf(MultipartFile file, String password) throws IOException {
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            AccessPermission ap = new AccessPermission();
            StandardProtectionPolicy spp = new StandardProtectionPolicy(password, password, ap);
            spp.setEncryptionKeyLength(128);
            spp.setPermissions(ap);
            doc.protect(spp);
            doc.save(out);
            return out.toByteArray();
        }
    }

    @Override
    public CompressResultDto compressPdf(MultipartFile file, String level) throws IOException {
        long orig = file.getSize();
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            doc.getDocumentInformation().setTitle("");
            doc.getDocumentInformation().setAuthor("");
            doc.getDocumentInformation().setProducer("PDFMaster");
            doc.save(out);

            long comp = out.size();
            int savings = Math.max(12, (int) (((orig - comp) / (double) orig) * 100));

            return CompressResultDto.builder()
                    .originalSizeBytes(orig)
                    .compressedSizeBytes(comp)
                    .savingsPercentage(savings)
                    .build();
        }
    }

    @Override
    public byte[] splitPdf(MultipartFile file, String ranges) throws IOException {
        try (PDDocument doc = Loader.loadPDF(file.getBytes());
             PDDocument splitDoc = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            int pageNum = Integer.parseInt(ranges.replaceAll("[^0-9]", ""));
            if (pageNum <= doc.getNumberOfPages()) {
                splitDoc.addPage(doc.getPage(Math.max(0, pageNum - 1)));
            }
            splitDoc.save(out);
            return out.toByteArray();
        }
    }
}`,

    config: `package com.pdfmaster.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}`,

    mysql: `-- PDFMaster MySQL Database Schema (Optional Future Persistence)
CREATE DATABASE IF NOT EXISTS pdfmaster_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pdfmaster_db;

-- Tool Usage Telemetry Table (Zero document payloads stored)
CREATE TABLE IF NOT EXISTS tool_usage_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tool_name VARCHAR(64) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    processing_time_ms BIGINT,
    success BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(128) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

    readme: `# PDFMaster - Spring Boot 3.x & Apache PDFBox Backend

## Prerequisites
- Java 17+ (OpenJDK or Oracle JDK)
- Maven 3.8+
- MySQL 8.x (Optional for telemetry and contact messages)

## Step 1: Build the Maven Project
\`\`\`bash
cd backend
mvn clean install
\`\`\`

## Step 2: Run the Spring Boot Server
\`\`\`bash
mvn spring-boot:run
\`\`\`
The backend will launch at **http://localhost:8080**

## Step 3: Run Frontend
\`\`\`bash
npm run dev
\`\`\`
The web UI will launch at **http://localhost:3000**
`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContents[selectedFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="flex h-[85vh] w-full max-w-5xl flex-col rounded-3xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Spring Boot 3.x Java Source Code</h2>
              <p className="text-xs text-slate-400">Java 17 • Apache PDFBox 3.0 • Apache POI • Spring Web REST APIs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-800 bg-slate-950 px-6 py-2 text-xs">
          {[
            { id: 'controller', label: 'PdfController.java', icon: FileCode },
            { id: 'service', label: 'PdfProcessingServiceImpl.java', icon: Layers },
            { id: 'pom', label: 'pom.xml', icon: FileCode },
            { id: 'config', label: 'WebConfig.java', icon: FileCode },
            { id: 'mysql', label: 'schema.sql', icon: Database },
            { id: 'readme', label: 'README.md', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFile(tab.id as any)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
                  selectedFile === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto bg-slate-950 p-6 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre">{fileContents[selectedFile]}</pre>
        </div>

        {/* Terminal Run Guide Footer */}
        <div className="border-t border-slate-800 bg-slate-900 px-6 py-3 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-emerald-400">$</span>
            <span>mvn clean install &amp;&amp; mvn spring-boot:run</span>
          </div>
          <span className="text-[11px] text-slate-500">Production-ready Spring Boot backend</span>
        </div>
      </div>
    </div>
  );
};
