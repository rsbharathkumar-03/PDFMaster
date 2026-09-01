export type ToolId =
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'pdf-to-jpg'
  | 'jpg-to-pdf'
  | 'merge-pdf'
  | 'split-pdf'
  | 'compress-pdf'
  | 'pdf-to-excel'
  | 'pdf-to-ppt'
  | 'protect-pdf'
  | 'unlock-pdf'
  | 'rotate-pdf'
  | 'watermark-pdf';

export type ToolCategory = 'convert-from' | 'convert-to' | 'organize' | 'security' | 'all';

export interface ToolDefinition {
  id: ToolId;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: ToolCategory;
  badge?: string;
  iconName: string;
  acceptedFormats: string;
  acceptMimeTypes: string[];
  multipleFiles?: boolean;
  endpoint: string;
  buttonText: string;
  outputExtension: string;
  seoTitle: string;
  metaDesc: string;
  h1: string;
  h2: string;
  features: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProcessingResult {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: number;
  originalSize?: number;
  compressedSize?: number;
  savingsPercent?: number;
  pageCount?: number;
  previewImages?: string[];
  error?: string;
  details?: string;
}

export type ViewType = ToolId | 'home' | 'about' | 'contact' | 'privacy-policy' | 'terms' | 'cookie-policy' | 'blog' | 'backend-code';

export interface WatermarkConfig {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'diagonal';
  color: string;
}

export interface SplitConfig {
  mode: 'range' | 'all' | 'custom';
  pageRanges: string; // e.g. "1-3, 5, 8-10"
}

export interface CompressConfig {
  level: 'low' | 'medium' | 'high';
}

export interface RotateConfig {
  angle: 90 | 180 | 270;
  target: 'all' | 'custom';
  pageNumbers: string; // e.g. "1, 3, 5"
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
