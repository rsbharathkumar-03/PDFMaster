package com.pdfmaster.exception;

import com.pdfmaster.dto.ApiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.io.IOException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        log.warn("File upload exceeded maximum configured threshold: {}", exc.getMessage());
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ApiResponseDto.<Void>builder()
                        .success(false)
                        .message("Maximum file size is 25 MB. Please select a smaller file.")
                        .build());
    }

    @ExceptionHandler(InvalidFileException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleInvalidFile(InvalidFileException exc) {
        log.warn("Invalid file validation error: {}", exc.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDto.<Void>builder()
                        .success(false)
                        .message(exc.getMessage())
                        .build());
    }

    @ExceptionHandler(PdfProcessingException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleProcessingError(PdfProcessingException exc) {
        log.error("PDF processing failed: {}", exc.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(ApiResponseDto.<Void>builder()
                        .success(false)
                        .message("Unable to process this document. Please ensure the file is not corrupted.")
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleValidationErrors(MethodArgumentNotValidException exc) {
        String errorMsg = exc.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDto.<Void>builder()
                        .success(false)
                        .message(errorMsg)
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDto<Void>> handleGenericException(Exception exc) {
        log.error("Unexpected server error: ", exc);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseDto.<Void>builder()
                        .success(false)
                        .message("Something went wrong processing your request. Please try again.")
                        .build());
    }
}
