import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, ArrowUp, ArrowDown, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '../utils/pdfEngine';

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  acceptedFormats: string;
  acceptMimeTypes: string[];
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFilesChange,
  acceptedFormats,
  acceptMimeTypes,
  multiple = false,
  maxSizeMB = 25,
  label = 'Select PDF files',
  sublabel = 'or drop PDF documents here'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (incomingFiles: FileList | File[]) => {
    setErrorMsg(null);
    const newFiles: File[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];

      // Empty file check
      if (file.size === 0) {
        setErrorMsg(`The file "${file.name}" is empty and cannot be processed.`);
        continue;
      }

      // Size check
      if (file.size > maxSizeBytes) {
        setErrorMsg(`Maximum file size is ${maxSizeMB} MB. "${file.name}" exceeds the limit (${formatBytes(file.size)}).`);
        continue;
      }

      // Extension / MIME validation
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      const acceptedExtList = acceptedFormats.split(',').map((s) => s.trim().toLowerCase());
      const extValid = acceptedExtList.some((ext) => ext === fileExt || ext === '.*');
      const mimeValid =
        acceptMimeTypes.length === 0 ||
        acceptMimeTypes.some((mime) => file.type.startsWith(mime.replace('*', '')) || mime === '*/*');

      if (!extValid && !mimeValid) {
        setErrorMsg(`Invalid file type for "${file.name}". Supported formats: ${acceptedFormats}`);
        continue;
      }

      newFiles.push(file);
    }

    if (newFiles.length > 0) {
      if (multiple) {
        onFilesChange([...files, ...newFiles]);
      } else {
        onFilesChange([newFiles[0]]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
      // Reset input value so same file can be reselected if needed
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onFilesChange(updated);
  };

  return (
    <div className="w-full">
      {/* Error Alert if any */}
      {errorMsg && (
        <div
          id="uploader-error-banner"
          className="mb-4 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="rounded p-1 text-red-500 hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Drag and Drop Box */}
      {files.length === 0 ? (
        <div
          id="dropzone-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
            isDragging
              ? 'border-indigo-600 bg-indigo-50/70 shadow-lg ring-4 ring-indigo-500/10'
              : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50/80 shadow-sm'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={acceptedFormats}
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-transform group-hover:scale-110 shadow-inner">
            <UploadCloud className="h-10 w-10 text-indigo-600" />
          </div>

          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {label}
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">{sublabel}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
              Formats: {acceptedFormats}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
              Max Size: {maxSizeMB} MB
            </span>
            {multiple && (
              <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">
                Multiple Files Supported
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Selected Files List & Add More */
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold text-slate-800">
                {files.length} {files.length === 1 ? 'file selected' : 'files selected'}
              </span>
            </div>
            {multiple && (
              <button
                id="add-more-files-btn"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                + Add More Files
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={acceptedFormats}
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="space-y-2.5">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs">
                    {file.type.includes('image') ? (
                      <ImageIcon className="h-5 w-5" />
                    ) : (
                      <File className="h-5 w-5" />
                    )}
                  </div>
                  <div className="truncate text-left">
                    <p className="truncate text-sm font-semibold text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {multiple && (
                    <div className="flex items-center gap-1 mr-2">
                      <button
                        onClick={() => moveFile(idx, idx - 1)}
                        disabled={idx === 0}
                        title="Move Up"
                        className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveFile(idx, idx + 1)}
                        disabled={idx === files.length - 1}
                        title="Move Down"
                        className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => removeFile(idx)}
                    title="Remove file"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              id="clear-all-files-btn"
              onClick={() => onFilesChange([])}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Remove all files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
