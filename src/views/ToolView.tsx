import React, { useState } from 'react';
import { ToolDefinition, ProcessingResult, WatermarkConfig, SplitConfig, CompressConfig, RotateConfig } from '../types';
import { FileUploader } from '../components/FileUploader';
import { ProgressBar } from '../components/ProgressBar';
import { AdContainer } from '../components/AdContainer';
import { FaqSection } from '../components/FaqSection';
import {
  convertPdfToWord,
  convertWordToPdf,
  convertPdfToJpg,
  convertJpgToPdf,
  mergePdfs,
  splitPdf,
  compressPdf,
  convertPdfToExcel,
  convertPdfToPpt,
  protectPdf,
  unlockPdf,
  rotatePdf,
  watermarkPdf,
  formatBytes,
  triggerBlobDownload
} from '../utils/pdfEngine';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Lock,
  Unlock,
  Sliders,
  ShieldCheck,
  Zap,
  FileCheck,
  Eye
} from 'lucide-react';

interface ToolViewProps {
  tool: ToolDefinition;
  onBack: () => void;
  onNavigateTool?: (id: any) => void;
  onSelectOtherTool?: (id: any) => void;
}

export const ToolView: React.FC<ToolViewProps> = ({
  tool,
  onBack,
  onNavigateTool,
  onSelectOtherTool
}) => {
  const handleNavToOtherTool = (id: any) => {
    if (onNavigateTool) onNavigateTool(id);
    else if (onSelectOtherTool) onSelectOtherTool(id);
  };

  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tool specific states
  const [splitConfig, setSplitConfig] = useState<SplitConfig>({ mode: 'range', pageRanges: '1-3' });
  const [compressConfig, setCompressConfig] = useState<CompressConfig>({ level: 'medium' });
  const [protectPassword, setProtectPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [unlockPassword, setUnlockPassword] = useState('');
  const [rotateConfig, setRotateConfig] = useState<RotateConfig>({ angle: 90, target: 'all', pageNumbers: '' });
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    text: 'CONFIDENTIAL',
    fontSize: 42,
    opacity: 0.35,
    rotation: 45,
    position: 'center',
    color: '#DC2626'
  });

  const handleProcess = async () => {
    if (files.length === 0) {
      setErrorMsg('Please upload at least one file to proceed.');
      return;
    }

    // Validation for specific tools
    if (tool.id === 'protect-pdf') {
      if (!protectPassword || protectPassword.length < 4) {
        setErrorMsg('Password must be at least 4 characters long.');
        return;
      }
      if (protectPassword !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password.');
        return;
      }
    }

    if (tool.id === 'split-pdf' && splitConfig.mode === 'range' && !splitConfig.pageRanges.trim()) {
      setErrorMsg('Please enter a valid page range (e.g., "1-3, 5").');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setProgress(10);

    try {
      let res: ProcessingResult;

      switch (tool.id) {
        case 'pdf-to-word':
          res = await convertPdfToWord(files[0], setProgress);
          break;
        case 'word-to-pdf':
          res = await convertWordToPdf(files[0], setProgress);
          break;
        case 'pdf-to-jpg':
          res = await convertPdfToJpg(files[0], setProgress);
          break;
        case 'jpg-to-pdf':
          res = await convertJpgToPdf(files, setProgress);
          break;
        case 'merge-pdf':
          res = await mergePdfs(files, setProgress);
          break;
        case 'split-pdf':
          res = await splitPdf(files[0], splitConfig, setProgress);
          break;
        case 'compress-pdf':
          res = await compressPdf(files[0], compressConfig, setProgress);
          break;
        case 'pdf-to-excel':
          res = await convertPdfToExcel(files[0], setProgress);
          break;
        case 'pdf-to-ppt':
          res = await convertPdfToPpt(files[0], setProgress);
          break;
        case 'protect-pdf':
          res = await protectPdf(files[0], protectPassword, setProgress);
          break;
        case 'unlock-pdf':
          res = await unlockPdf(files[0], unlockPassword, setProgress);
          break;
        case 'rotate-pdf':
          res = await rotatePdf(files[0], rotateConfig, setProgress);
          break;
        case 'watermark-pdf':
          res = await watermarkPdf(files[0], watermarkConfig, setProgress);
          break;
        default:
          throw new Error('Unsupported tool operation');
      }

      setResult(res);
    } catch (err: any) {
      console.error('Processing error:', err);
      setErrorMsg(err.message || 'Unable to process document. Please check the file and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result && result.downloadUrl && result.fileName) {
      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setErrorMsg(null);
    setProgress(0);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Top Banner Ad */}
      <AdContainer slot="header-banner" className="max-w-4xl mx-auto" />

      {/* Navigation Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Tools</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">{tool.title}</span>
        </div>
      </div>

      {/* Tool Hero Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {tool.badge && (
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200 mb-3">
            {tool.badge}
          </span>
        )}
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {tool.h1}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
          {tool.longDesc}
        </p>
      </div>

      {/* Main Interactive Processing Card */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        {!result ? (
          <div>
            {/* File Uploader */}
            <FileUploader
              files={files}
              onFilesChange={setFiles}
              acceptedFormats={tool.acceptedFormats}
              acceptMimeTypes={tool.acceptMimeTypes}
              multiple={tool.multipleFiles}
              label={tool.multipleFiles ? 'Select multiple files' : `Select ${tool.acceptedFormats} file`}
              sublabel="Drag and drop your file here or click to browse"
            />

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Tool Specific Configuration Panels */}
            {files.length > 0 && !isProcessing && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Sliders className="h-4 w-4 text-indigo-600" />
                  <span>Tool Settings</span>
                </div>

                {/* 1. Compress Settings */}
                {tool.id === 'compress-pdf' && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { level: 'low', title: 'Low Compression', desc: 'Slight reduction, maximum image fidelity.' },
                      { level: 'medium', title: 'Recommended', desc: 'Balanced compression with sharp text.' },
                      { level: 'high', title: 'High Compression', desc: 'Maximum size savings for email sending.' },
                    ].map((opt) => (
                      <button
                        key={opt.level}
                        type="button"
                        onClick={() => setCompressConfig({ level: opt.level as any })}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          compressConfig.level === opt.level
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-bold text-slate-900">{opt.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Split Settings */}
                {tool.id === 'split-pdf' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="splitMode"
                          checked={splitConfig.mode === 'range'}
                          onChange={() => setSplitConfig({ ...splitConfig, mode: 'range' })}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <span>Extract specific page range</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="splitMode"
                          checked={splitConfig.mode === 'all'}
                          onChange={() => setSplitConfig({ ...splitConfig, mode: 'all' })}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <span>Extract all pages into separate PDFs (ZIP)</span>
                      </label>
                    </div>

                    {splitConfig.mode === 'range' && (
                      <div className="mt-2">
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                          Page Ranges (e.g. 1-3, 5, 8-10)
                        </label>
                        <input
                          type="text"
                          value={splitConfig.pageRanges}
                          onChange={(e) => setSplitConfig({ ...splitConfig, pageRanges: e.target.value })}
                          placeholder="e.g. 1-3, 5"
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Protect Password Settings */}
                {tool.id === 'protect-pdf' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Set Password
                      </label>
                      <input
                        type="password"
                        value={protectPassword}
                        onChange={(e) => setProtectPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-full rounded-xl bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
                      <strong>Privacy Notice:</strong> Your password is used for in-memory encryption only. We never save, log, or transmit your password anywhere.
                    </div>
                  </div>
                )}

                {/* 4. Unlock Password Settings */}
                {tool.id === 'unlock-pdf' && (
                  <div className="max-w-md">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Document Password (if known)
                    </label>
                    <input
                      type="password"
                      value={unlockPassword}
                      onChange={(e) => setUnlockPassword(e.target.value)}
                      placeholder="Enter password to unlock..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      This removes encryption locks and restrictions with the authorized password.
                    </p>
                  </div>
                )}

                {/* 5. Rotate Settings */}
                {tool.id === 'rotate-pdf' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                        Rotation Angle
                      </label>
                      <div className="flex gap-3">
                        {[
                          { angle: 90, label: '90° Clockwise' },
                          { angle: 180, label: '180° Flip' },
                          { angle: 270, label: '270° Counter-Clockwise' },
                        ].map((item) => (
                          <button
                            key={item.angle}
                            type="button"
                            onClick={() => setRotateConfig({ ...rotateConfig, angle: item.angle as any })}
                            className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                              rotateConfig.angle === item.angle
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="rotTarget"
                          checked={rotateConfig.target === 'all'}
                          onChange={() => setRotateConfig({ ...rotateConfig, target: 'all' })}
                        />
                        <span>Rotate all pages</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="rotTarget"
                          checked={rotateConfig.target === 'custom'}
                          onChange={() => setRotateConfig({ ...rotateConfig, target: 'custom' })}
                        />
                        <span>Specific pages (e.g. 1, 3, 5)</span>
                      </label>
                    </div>

                    {rotateConfig.target === 'custom' && (
                      <input
                        type="text"
                        placeholder="e.g. 1, 3, 5"
                        value={rotateConfig.pageNumbers}
                        onChange={(e) => setRotateConfig({ ...rotateConfig, pageNumbers: e.target.value })}
                        className="w-full max-w-sm rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                      />
                    )}
                  </div>
                )}

                {/* 6. Watermark Settings */}
                {tool.id === 'watermark-pdf' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        value={watermarkConfig.text}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, text: e.target.value })}
                        placeholder="e.g. CONFIDENTIAL"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Font Size ({watermarkConfig.fontSize}pt)
                      </label>
                      <input
                        type="range"
                        min="16"
                        max="72"
                        value={watermarkConfig.fontSize}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, fontSize: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Opacity ({Math.round(watermarkConfig.opacity * 100)}%)
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={watermarkConfig.opacity}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, opacity: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Rotation Angle ({watermarkConfig.rotation}°)
                      </label>
                      <input
                        type="range"
                        min="-90"
                        max="90"
                        step="5"
                        value={watermarkConfig.rotation}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, rotation: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Position
                      </label>
                      <select
                        value={watermarkConfig.position}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, position: e.target.value as any })}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                      >
                        <option value="center">Center</option>
                        <option value="top-left">Top-Left</option>
                        <option value="top-right">Top-Right</option>
                        <option value="bottom-left">Bottom-Left</option>
                        <option value="bottom-right">Bottom-Right</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={watermarkConfig.color}
                          onChange={(e) => setWatermarkConfig({ ...watermarkConfig, color: e.target.value })}
                          className="h-9 w-12 rounded border cursor-pointer"
                        />
                        <span className="text-xs font-mono text-slate-600">{watermarkConfig.color}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Trigger Button */}
            {files.length > 0 && !isProcessing && (
              <div className="mt-8 flex justify-center">
                <button
                  id="execute-tool-btn"
                  onClick={handleProcess}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 hover:shadow-indigo-500/50"
                >
                  <span>{tool.buttonText}</span>
                </button>
              </div>
            )}

            {/* Progress Animation */}
            {isProcessing && <ProgressBar progress={progress} statusText={`Processing ${tool.title}...`} />}
          </div>
        ) : (
          /* Processing Results Card */
          <div className="text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">Conversion Completed Successfully!</h3>
            <p className="mt-1 text-sm text-slate-500">Your generated file is ready for download.</p>

            {/* Metrics Breakdown (e.g. for Compress or General files) */}
            <div className="mx-auto my-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                <span className="font-semibold text-slate-500">Output File Name:</span>
                <span className="font-bold text-slate-800 truncate max-w-[220px]">{result.fileName}</span>
              </div>

              {result.originalSize && (
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-500">Original Size:</span>
                  <span className="font-bold text-slate-800">{formatBytes(result.originalSize)}</span>
                </div>
              )}

              {result.fileSize && (
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-500">Generated Size:</span>
                  <span className="font-bold text-slate-800">{formatBytes(result.fileSize)}</span>
                </div>
              )}

              {result.savingsPercent !== undefined && (
                <div className="flex items-center justify-between text-xs py-1 text-emerald-700 font-bold">
                  <span>Size Reduced By:</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5">{result.savingsPercent}% SAVED</span>
                </div>
              )}
            </div>

            {/* Previews if PDF to JPG */}
            {result.previewImages && result.previewImages.length > 0 && (
              <div className="my-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Rendered Pages Preview</h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 max-h-80 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50">
                  {result.previewImages.map((imgUrl, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                      <img src={imgUrl} alt={`Page ${i + 1}`} className="w-full object-contain" />
                      <div className="p-2 text-center text-xs font-bold text-slate-600 bg-slate-100/90">
                        Page {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                id="download-result-btn"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 hover:shadow-emerald-600/50"
              >
                <Download className="h-5 w-5" />
                <span>Download {result.fileName}</span>
              </button>

              <button
                id="convert-another-btn"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Convert Another File</span>
              </button>
            </div>

            {/* Below Result Sponsored Slot */}
            <AdContainer slot="below-result" className="mt-10 max-w-xl mx-auto" />
          </div>
        )}
      </div>

      {/* Tool Details, SEO Content & Features */}
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-4">
          {tool.h2}
        </h2>
        <p className="text-base text-slate-600 leading-relaxed mb-8">
          PDFMaster provides a complete, modern, zero-installation solution for your PDF document needs. Powered by enterprise-grade cryptographic and document parsing pipelines, all operations are completed quickly, reliably, and with strict privacy guarantees.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tool.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-slate-800">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tool FAQs */}
      <FaqSection faqs={tool.faqs} title={`Frequently Asked Questions about ${tool.title}`} />
    </div>
  );
};
