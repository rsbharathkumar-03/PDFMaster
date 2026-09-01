# PDFMaster — Spring Boot 3.x & Apache PDFBox Production Backend

PDFMaster is a high-performance, enterprise-grade PDF processing service built with **Java 17**, **Spring Boot 3.2.x**, **Apache PDFBox 3.0.x**, and **Apache POI 5.2.x**.

## Features & REST API Endpoints

| Method | Endpoint | Description | Input Params |
|---|---|---|---|
| `POST` | `/api/pdf/to-word` | Converts PDF to editable DOCX | `file` (Multipart PDF) |
| `POST` | `/api/word/to-pdf` | Converts DOCX to PDF | `file` (Multipart DOCX) |
| `POST` | `/api/pdf/to-jpg` | Converts PDF pages to high-res JPG ZIP | `file` (Multipart PDF) |
| `POST` | `/api/jpg/to-pdf` | Combines multiple JPGs into single PDF | `files` (Multipart images) |
| `POST` | `/api/pdf/merge` | Merges multiple PDFs sequentially | `files` (Multipart PDFs) |
| `POST` | `/api/pdf/split` | Extracts specified page ranges | `file`, `ranges` |
| `POST` | `/api/pdf/compress` | Optimizes PDF size and strips metadata | `file`, `level` |
| `POST` | `/api/pdf/to-excel` | Extracts tabular data into Excel XLSX | `file` (Multipart PDF) |
| `POST` | `/api/pdf/to-ppt` | Generates presentation slides from PDF | `file` (Multipart PDF) |
| `POST` | `/api/pdf/protect` | Standard 128-bit AES encryption | `file`, `password` |
| `POST` | `/api/pdf/unlock` | Removes owner/user password security | `file`, `password` |
| `POST` | `/api/pdf/rotate` | Permanent page rotation (90, 180, 270) | `file`, `angle`, `pages` |
| `POST` | `/api/pdf/watermark` | Custom text watermark with opacity | `file`, `text`, `fontSize`, etc. |
| `POST` | `/api/contact` | Submits feedback/contact message | JSON: `name`, `email`, `subject`, `message` |
| `GET` | `/api/health` | Service healthcheck & diagnostics | None |

## Build and Run

### 1. Build using Maven:
```bash
mvn clean install
```

### 2. Run locally on Port 8080:
```bash
mvn spring-boot:run
```

### 3. Run with MySQL:
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/pdfmaster_db \
SPRING_DATASOURCE_USERNAME=root \
SPRING_DATASOURCE_PASSWORD=secret \
mvn spring-boot:run
```
