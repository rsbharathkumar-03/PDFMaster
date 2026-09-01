import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    shortDesc: 'Convert PDF documents to editable Microsoft Word (DOCX) files with high precision.',
    longDesc: 'Transform your PDF files into editable DOCX Word documents. Our smart extraction engine extracts text paragraphs, font styles, alignments, and structured tables with maximum accuracy.',
    category: 'convert-from',
    badge: 'Popular',
    iconName: 'FileText',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/to-word',
    buttonText: 'Convert to Word',
    outputExtension: 'docx',
    seoTitle: 'PDF to Word Converter - Free & Accurate PDF to DOCX | PDFMaster',
    metaDesc: 'Convert PDF files to editable Microsoft Word (.docx) documents online for free. Keep your formatting, paragraphs, and tables intact.',
    h1: 'Convert PDF to Word Online',
    h2: 'Editable DOCX with Preserved Paragraphs and Layout',
    features: [
      'Extracts paragraphs, headings, bullet points, and tables',
      'Generates native editable Microsoft Word (.docx) files',
      'No email registration required — 100% free and instant',
      'Secure in-memory processing with automatic file deletion'
    ],
    faqs: [
      {
        question: 'Can I edit the converted Word document in Microsoft Word and Google Docs?',
        answer: 'Yes! The resulting file is a standard .docx document fully compatible with Microsoft Word 2007+, Google Docs, Apple Pages, and LibreOffice Writer.'
      },
      {
        question: 'Will my formatting and tables be preserved?',
        answer: 'Our conversion engine parses text runs, structural breaks, and tabular lines to reconstruct the document layout as closely as possible.'
      },
      {
        question: 'What happens to scanned PDFs?',
        answer: 'Scanned image-only PDFs do not have embedded digital text. While text will be extracted from searchable layers, scanned pages are preserved with their embedded image content.'
      }
    ]
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    shortDesc: 'Convert DOC and DOCX Word documents to universal, high-quality PDF files.',
    longDesc: 'Easily convert your Word documents (.doc, .docx) into pristine PDF files that look identical on any device, tablet, or printer without font shifting.',
    category: 'convert-to',
    badge: 'Popular',
    iconName: 'FileType',
    acceptedFormats: '.doc,.docx',
    acceptMimeTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ],
    multipleFiles: false,
    endpoint: '/api/word/to-pdf',
    buttonText: 'Convert to PDF',
    outputExtension: 'pdf',
    seoTitle: 'Word to PDF Converter - Free DOCX to PDF Online | PDFMaster',
    metaDesc: 'Convert DOCX and DOC files to high-quality PDF documents online. Preserve layouts, margins, and embedded media seamlessly.',
    h1: 'Convert Word to PDF Online',
    h2: 'Transform DOCX Documents into Universal PDFs Instantly',
    features: [
      'Supports modern DOCX as well as legacy DOC files',
      'Standardized PDF/A compliant document generation',
      'Preserves margins, headings, and font spacing',
      'Zero installation needed — works directly in your browser'
    ],
    faqs: [
      {
        question: 'Why should I convert Word to PDF?',
        answer: 'PDF guarantees that your document layout, fonts, and images appear identically on all operating systems and printers without unwanted reflow.'
      },
      {
        question: 'Is my confidential Word file safe?',
        answer: 'Yes. Files are processed entirely in secure memory or temporary storage and deleted immediately after conversion.'
      }
    ]
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    shortDesc: 'Extract pages from your PDF into crisp, high-resolution JPG image files.',
    longDesc: 'Convert every page of a PDF document into high-resolution JPG or PNG images. Download individual page pictures or download all pages in a single ZIP package.',
    category: 'convert-from',
    badge: 'High DPI',
    iconName: 'Image',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/to-jpg',
    buttonText: 'Convert to JPG',
    outputExtension: 'zip',
    seoTitle: 'PDF to JPG Converter - Extract PDF Pages as High-Res Images | PDFMaster',
    metaDesc: 'Convert PDF pages into high-resolution JPG images. Download single page images or grab all pages bundled in a convenient ZIP file.',
    h1: 'Convert PDF to JPG Images',
    h2: 'High-Resolution Image Extraction for Every PDF Page',
    features: [
      'Crystal clear 150-300 DPI image rendering',
      'Preview individual rendered pages right in your browser',
      'Download individual page JPGs or batch download as ZIP',
      'No quality loss or compression artifacts'
    ],
    faqs: [
      {
        question: 'Can I choose specific pages to convert?',
        answer: 'Yes, after rendering you can download specific page images or download all pages bundled in a ZIP archive.'
      },
      {
        question: 'What is the image resolution of the output JPGs?',
        answer: 'Images are rendered at crisp 2x scale (high DPI) for professional presentation and web usage.'
      }
    ]
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    shortDesc: 'Combine multiple JPG, JPEG, and PNG images into a clean single PDF document.',
    longDesc: 'Turn your photos, scanned receipts, certificates, and portfolio images into a consolidated PDF. Rearrange image order, preview thumbnails, and customize margins.',
    category: 'convert-to',
    badge: 'Multi-Image',
    iconName: 'Images',
    acceptedFormats: '.jpg,.jpeg,.png,.webp',
    acceptMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    multipleFiles: true,
    endpoint: '/api/jpg/to-pdf',
    buttonText: 'Convert Images to PDF',
    outputExtension: 'pdf',
    seoTitle: 'JPG to PDF Converter - Merge Photos & Images into PDF | PDFMaster',
    metaDesc: 'Convert JPG, JPEG, and PNG images to PDF online for free. Drag and drop, reorder images, and generate unified PDF documents.',
    h1: 'Convert JPG & Images to PDF',
    h2: 'Combine Photos and Scans into a Single PDF Document',
    features: [
      'Upload multiple JPG, PNG, and WebP images simultaneously',
      'Interactive visual reordering and thumbnail preview',
      'Automatic orientation and aspect ratio calculation',
      'Perfect for receipts, contracts, portfolios, and photo albums'
    ],
    faqs: [
      {
        question: 'Can I change the order of images before generating the PDF?',
        answer: 'Yes! You can use the move up / move down buttons or drag cards to order your pages exactly as you wish.'
      },
      {
        question: 'Does this compress the image quality?',
        answer: 'We maintain pristine visual clarity while fitting each image naturally into standard page dimensions.'
      }
    ]
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one unified, perfectly ordered document.',
    longDesc: 'Combine two or more PDF files into a single, cohesive document. Drag to reorder documents, inspect page counts, and download the merged PDF instantly.',
    category: 'organize',
    badge: 'Essential',
    iconName: 'Layers',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: true,
    endpoint: '/api/pdf/merge',
    buttonText: 'Merge PDFs',
    outputExtension: 'pdf',
    seoTitle: 'Merge PDF - Combine Multiple PDF Files Online for Free | PDFMaster',
    metaDesc: 'Merge multiple PDF files into one document in seconds. Easy drag-and-drop ordering, instant preview, 100% free.',
    h1: 'Merge PDF Files Online',
    h2: 'Combine Multiple Documents into a Single Clean PDF',
    features: [
      'Upload as many PDF documents as you need',
      'Reorder files seamlessly with intuitive controls',
      'Maintains bookmarks, vector graphics, and embedded fonts',
      'Fast processing with zero loss of document quality'
    ],
    faqs: [
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'You can merge dozens of PDF files up to a generous total size limit (25 MB per file).'
      },
      {
        question: 'Will text remain selectable in the merged PDF?',
        answer: 'Yes! The internal vector structure and text streams remain completely intact and searchable.'
      }
    ]
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    shortDesc: 'Extract specific pages or page ranges from a PDF or split it into separate files.',
    longDesc: 'Divide a large PDF into smaller standalone documents. Extract page ranges (e.g. 1-5, 8, 11-15) or burst every page into an individual PDF file inside a ZIP archive.',
    category: 'organize',
    badge: 'Flexible',
    iconName: 'Scissors',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/split',
    buttonText: 'Split PDF',
    outputExtension: 'pdf',
    seoTitle: 'Split PDF - Extract Pages or Ranges from PDF Online | PDFMaster',
    metaDesc: 'Split large PDF documents into smaller files. Specify custom page ranges or extract all pages as individual PDFs with one click.',
    h1: 'Split PDF Documents Online',
    h2: 'Extract Custom Page Ranges or Individual Pages Effortlessly',
    features: [
      'Custom range syntax support (e.g. "1-3, 5, 8-10")',
      'Extract every page as a distinct file bundled in a ZIP',
      'Preserves original page orientation, forms, and formatting',
      'Instant preview of total document page count'
    ],
    faqs: [
      {
        question: 'How do I specify page ranges?',
        answer: 'You can write simple ranges such as "1-4, 7, 10-12". The engine will extract those exact pages into your new PDF.'
      },
      {
        question: 'What if I want every page as a separate PDF?',
        answer: 'Simply choose the "Extract all pages into separate PDFs" option and download a neat ZIP file containing every page.'
      }
    ]
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    shortDesc: 'Reduce PDF file size while keeping high visual quality and readability.',
    longDesc: 'Shrink large PDF documents for email attachments, web uploads, or archiving. Choose from Low, Medium, or High compression and view the exact verified percentage saved.',
    category: 'organize',
    badge: 'Popular',
    iconName: 'Minimize2',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/compress',
    buttonText: 'Compress PDF',
    outputExtension: 'pdf',
    seoTitle: 'Compress PDF - Reduce PDF File Size Online | PDFMaster',
    metaDesc: 'Reduce PDF file size online without sacrificing quality. Choose compression levels and see verified size savings instantly.',
    h1: 'Compress PDF Files Online',
    h2: 'Optimize File Size for Email & Web Sharing with Real Savings Metrics',
    features: [
      'Three selectable compression levels: Low, Medium, and High',
      'Optimizes stream dictionaries, removes redundant metadata, and compacts fonts',
      'Accurate before-and-after size calculation with real percentage saved',
      'Ensures text remains sharp and perfectly legible'
    ],
    faqs: [
      {
        question: 'How much smaller will my PDF become?',
        answer: 'Savings vary depending on whether the original PDF contains uncompressed images or redundant metadata. Typically savings range from 20% to 75%.'
      },
      {
        question: 'Is text quality degraded during compression?',
        answer: 'No, vector text and fonts remain crisp. Compression targets unoptimized streams and oversized embedded image payloads.'
      }
    ]
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    shortDesc: 'Extract tables, spreadsheets, and structured numeric data to XLSX.',
    longDesc: 'Convert tables and structured data from your PDF into editable Microsoft Excel (.xlsx) spreadsheets. Ideal for invoices, financial reports, and data analysis.',
    category: 'convert-from',
    badge: 'Tables',
    iconName: 'Sheet',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/to-excel',
    buttonText: 'Convert to Excel',
    outputExtension: 'xlsx',
    seoTitle: 'PDF to Excel Converter - Extract Tables to XLSX | PDFMaster',
    metaDesc: 'Convert PDF tables and financial statements to editable Excel (.xlsx) sheets online. Fast, structured, and free.',
    h1: 'Convert PDF to Excel Online',
    h2: 'Extract Tables and Tabular Data into Clean XLSX Spreadsheets',
    features: [
      'Detects tabular columns, numeric values, and header rows',
      'Outputs genuine Microsoft Excel (.xlsx) workbooks',
      'Generates clean worksheets with formatted headers',
      'Note: Scanned PDFs without digital text streams may require OCR'
    ],
    faqs: [
      {
        question: 'Does this handle multi-page tables?',
        answer: 'Yes! The converter processes all pages and organizes them into structured worksheets.'
      },
      {
        question: 'What happens if my PDF is a photo/scan?',
        answer: 'Digital PDFs with selectable text produce clean table columns. For pure raster scans, extracted metadata and available text lines are mapped into rows.'
      }
    ]
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF to PowerPoint',
    shortDesc: 'Convert PDF presentation slides into editable Microsoft PowerPoint (PPTX) decks.',
    longDesc: 'Turn PDF slides and documents into editable PowerPoint (.pptx) presentations. Reconstruct slide layouts, text headers, and visual cards ready for editing.',
    category: 'convert-from',
    badge: 'Slides',
    iconName: 'Presentation',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/to-ppt',
    buttonText: 'Convert to PowerPoint',
    outputExtension: 'pptx',
    seoTitle: 'PDF to PowerPoint Converter - PDF to PPTX Online | PDFMaster',
    metaDesc: 'Convert PDF slides into editable Microsoft PowerPoint (.pptx) presentations. Rebuild decks easily with high formatting accuracy.',
    h1: 'Convert PDF to PowerPoint Online',
    h2: 'Transform PDF Documents into Editable PPTX Slide Decks',
    features: [
      'Creates 1 slide per PDF page with 16:9 widescreen layout',
      'Extracts title blocks, content paragraphs, and key points',
      'Fully editable shapes, text boxes, and typography in Microsoft PowerPoint',
      'Fast client & server processing'
    ],
    faqs: [
      {
        question: 'Can I edit the text on the generated PowerPoint slides?',
        answer: 'Yes, the output is a native Microsoft PowerPoint .pptx file with editable text containers.'
      }
    ]
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    shortDesc: 'Encrypt your PDF with a strong user password and restrict unauthorized access.',
    longDesc: 'Secure your sensitive PDF files with password protection and 128/256-bit encryption. Restrict unauthorized opening, copying, or printing.',
    category: 'security',
    badge: 'Encrypted',
    iconName: 'Lock',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/protect',
    buttonText: 'Encrypt & Protect PDF',
    outputExtension: 'pdf',
    seoTitle: 'Protect PDF - Encrypt PDF with Password Online | PDFMaster',
    metaDesc: 'Add password protection and strong encryption to your PDF files online. Free, secure, and zero password logging.',
    h1: 'Protect PDF with Password',
    h2: 'Enterprise-Grade PDF Encryption to Safeguard Confidential Data',
    features: [
      'Standard PDF password protection & encryption',
      'Real-time password strength meter and confirmation check',
      'Passwords are never stored, logged, or sent to tracking services',
      'Fully compatible with Adobe Acrobat, browsers, and mobile readers'
    ],
    faqs: [
      {
        question: 'Do you store or log my password?',
        answer: 'Never. Passwords are used strictly during the active encryption process in memory and are never persisted in any database or server log.'
      },
      {
        question: 'What happens if I forget my password?',
        answer: 'Standard PDF encryption is cryptographically robust. Make sure to keep a copy of your password, as locked files cannot be opened without it.'
      }
    ]
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    shortDesc: 'Remove password and security restrictions from your password-protected PDF.',
    longDesc: 'Decrypt your password-protected PDF file by providing the authorized password. Download a restriction-free PDF that opens instantly without password prompts.',
    category: 'security',
    badge: 'Decrypt',
    iconName: 'Unlock',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/unlock',
    buttonText: 'Unlock PDF',
    outputExtension: 'pdf',
    seoTitle: 'Unlock PDF - Remove Password Security from PDF Online | PDFMaster',
    metaDesc: 'Remove password restrictions and security locks from your PDF files. Fast, secure, and ethical decryption.',
    h1: 'Unlock PDF Online',
    h2: 'Remove Security Restrictions from Your Password-Protected Files',
    features: [
      'Removes user and owner password constraints with authorized credential',
      'Outputs standard, unencumbered PDF file',
      'Zero password retention or logging',
      'Ethical tool: requires the valid document password'
    ],
    faqs: [
      {
        question: 'Does this tool crack unknown passwords?',
        answer: 'No. To ensure legal compliance and security best practices, you must provide the authorized password to unlock the document.'
      }
    ]
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    shortDesc: 'Rotate PDF pages 90°, 180°, or 270° clockwise to fix upside-down or sideways pages.',
    longDesc: 'Quickly rotate individual pages or the entire PDF document by 90, 180, or 270 degrees. Permanently save the corrected page orientations.',
    category: 'organize',
    badge: 'Visual',
    iconName: 'RotateCw',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/rotate',
    buttonText: 'Rotate PDF',
    outputExtension: 'pdf',
    seoTitle: 'Rotate PDF - Permanently Rotate PDF Pages Online | PDFMaster',
    metaDesc: 'Rotate PDF pages 90, 180, or 270 degrees clockwise online for free. Fix sideways and upside-down scans in seconds.',
    h1: 'Rotate PDF Pages Online',
    h2: 'Permanently Correct Page Orientation with Angle Controls',
    features: [
      'Choose 90°, 180°, or 270° clockwise rotation',
      'Apply to all pages or target specific page numbers (e.g. 1, 3, 5)',
      'Immediate visual orientation adjustment',
      'Download permanently oriented PDF'
    ],
    faqs: [
      {
        question: 'Is the rotation saved permanently?',
        answer: 'Yes! The generated PDF modifies the internal /Rotate dictionary entry so the document opens correctly in all viewers.'
      }
    ]
  },
  {
    id: 'watermark-pdf',
    title: 'Watermark PDF',
    shortDesc: 'Add custom text watermarks with custom opacity, angle, size, and position.',
    longDesc: 'Stamp your documents with custom text watermarks such as "CONFIDENTIAL", "DRAFT", or your company name. Customize font size, opacity, rotation angle, and coordinates.',
    category: 'security',
    badge: 'Customizable',
    iconName: 'Stamp',
    acceptedFormats: '.pdf',
    acceptMimeTypes: ['application/pdf'],
    multipleFiles: false,
    endpoint: '/api/pdf/watermark',
    buttonText: 'Apply Watermark',
    outputExtension: 'pdf',
    seoTitle: 'Watermark PDF - Add Custom Text Watermarks Online | PDFMaster',
    metaDesc: 'Add customizable text watermarks to your PDF documents. Set font size, rotation angle, opacity, and position with live preview.',
    h1: 'Add Watermark to PDF Online',
    h2: 'Brand and Protect Documents with Customizable Text Watermarks',
    features: [
      'Custom text with adjustable font size (12pt to 72pt)',
      'Fine-tune transparency and opacity from 10% to 100%',
      'Custom rotation angles (-90° to +90°)',
      'Preset positions (Center diagonal, Top-Left, Bottom-Right, etc.)'
    ],
    faqs: [
      {
        question: 'Does the watermark appear on every page?',
        answer: 'Yes, the text watermark is applied across all pages of your PDF with consistent positioning and opacity.'
      },
      {
        question: 'Can someone easily remove the watermark?',
        answer: 'The watermark is rendered as a native PDF vector text layer across each page stream, making it integrated with the document.'
      }
    ]
  }
];

export const toolsCatalog = TOOLS;
