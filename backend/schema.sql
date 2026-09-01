-- ==========================================================
-- PDFMaster Database Initialization Script (MySQL 8.x)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS pdfmaster_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pdfmaster_db;

-- 1. Tool Usage Analytics & Telemetry Table
-- (Strictly records processing metrics - NO document contents are ever stored)
CREATE TABLE IF NOT EXISTS tool_usage_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tool_name VARCHAR(64) NOT NULL COMMENT 'e.g. PDF_TO_WORD, MERGE_PDF, COMPRESS_PDF',
    file_size_bytes BIGINT NOT NULL COMMENT 'Upload size in bytes',
    processing_time_ms BIGINT COMMENT 'Duration of PDFBox transformation',
    success BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tool_name (tool_name),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. User Feedback and Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(128) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'NEW' COMMENT 'NEW, REVIEWED, RESOLVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
