package com.pdfmaster.repository;

import com.pdfmaster.model.ToolUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolUsageRepository extends JpaRepository<ToolUsageLog, Long> {
}
