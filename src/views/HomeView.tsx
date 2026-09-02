import React, { useState } from 'react';
import { ToolId, ToolCategory } from '../types';
import { TOOLS } from '../data/toolsData';
import { AdContainer } from '../components/AdContainer';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { FaqSection } from '../components/FaqSection';
import {
  FileText,
  FileType,
  Image,
  Images,
  Layers,
  Scissors,
  Minimize2,
  Sheet,
  Presentation,
  Lock,
  Unlock,
  RotateCw,
  Stamp,
  ArrowRight,
  Search,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onSelectTool: (id: ToolId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="h-6 w-6 text-indigo-600" />;
      case 'FileType':
        return <FileType className="h-6 w-6 text-blue-600" />;
      case 'Image':
        return <Image className="h-6 w-6 text-emerald-600" />;
      case 'Images':
        return <Images className="h-6 w-6 text-teal-600" />;
      case 'Layers':
        return <Layers className="h-6 w-6 text-purple-600" />;
      case 'Scissors':
        return <Scissors className="h-6 w-6 text-rose-600" />;
      case 'Minimize2':
        return <Minimize2 className="h-6 w-6 text-amber-600" />;
      case 'Sheet':
        return <Sheet className="h-6 w-6 text-green-600" />;
      case 'Presentation':
        return <Presentation className="h-6 w-6 text-orange-600" />;
      case 'Lock':
        return <Lock className="h-6 w-6 text-red-600" />;
      case 'Unlock':
        return <Unlock className="h-6 w-6 text-cyan-600" />;
      case 'RotateCw':
        return <RotateCw className="h-6 w-6 text-indigo-600" />;
      case 'Stamp':
        return <Stamp className="h-6 w-6 text-pink-600" />;
      default:
        return <FileText className="h-6 w-6 text-indigo-600" />;
    }
  };

  const filteredTools = TOOLS.filter((tool) => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;

    const matchesSearch =
      tool.title.toLowerCase().includes(normalizedSearch) ||
      tool.shortDesc.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const homeFaqs = [
    {
      question: 'Is PDFMaster completely free to use?',
      answer:
        'Yes, PDFMaster provides free online PDF tools for common tasks such as merging, splitting, compressing, converting, rotating, watermarking, and protecting PDF files.'
    },
    {
      question: 'What PDF tools are available on PDFMaster?',
      answer:
        'PDFMaster includes tools for PDF to Word, Word to PDF, PDF to JPG, JPG to PDF, PDF merging, PDF splitting, PDF compression, PDF to Excel, PDF to PowerPoint, PDF protection, PDF unlocking, PDF rotation, and PDF watermarking.'
    },
    {
      question: 'Can I use PDFMaster on my mobile phone or tablet?',
      answer:
        'Yes. PDFMaster is designed as a responsive web application and can be accessed from modern smartphones, tablets, laptops, and desktop computers.'
    },
    {
      question: 'Do I need to install software to use PDFMaster?',
      answer:
        'No. PDFMaster is an online PDF tool platform. You can open the website in a supported web browser and use the available PDF tools without installing a desktop application.'
    }
  ];

  const handleToolClick = (id: ToolId) => {
    onSelectTool(id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Top Banner Ad */}
      <AdContainer
        slot="header-banner"
        className="mx-auto max-w-4xl"
      />

      {/* Hero Section */}
      <section
        aria-labelledby="homepage-title"
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/30 p-8 text-center shadow-sm sm:p-14"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-bold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Fast, Secure &amp; Free Online PDF Tools</span>
          </div>

          <h1
            id="homepage-title"
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Free Online PDF Tools
            <span className="block text-indigo-600">
              Simple, Fast &amp; Easy to Use
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Manage your PDF files online with PDFMaster. Merge, split,
            compress, convert, rotate, watermark, protect, and transform PDF
            documents quickly from your web browser.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#tools-grid"
              id="explore-pdf-tools-btn"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700 hover:shadow-indigo-500/40"
            >
              <span>Explore PDF Tools</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => handleToolClick('compress-pdf')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600"
            >
              <Minimize2 className="h-4 w-4" />
              <span>Compress PDF</span>
            </button>

            <button
              type="button"
              onClick={() => handleToolClick('pdf-to-word')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600"
            >
              <FileType className="h-4 w-4" />
              <span>PDF to Word</span>
            </button>
          </div>

          {/* Quick Benefits */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4">
            <div>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-slate-900">
                <FileText className="h-5 w-5 text-indigo-600" />
                13+
              </div>
              <div className="text-xs font-semibold text-slate-500">
                PDF Tools
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-slate-900">
                <Zap className="h-5 w-5 text-amber-500" />
                Free
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Online Tools
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-slate-900">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Secure
              </div>
              <div className="text-xs font-semibold text-slate-500">
                PDF Processing
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-slate-900">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Online
              </div>
              <div className="text-xs font-semibold text-slate-500">
                No Installation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Introduction */}
      <section
        aria-labelledby="pdf-tools-introduction"
        className="mx-auto mt-14 max-w-4xl text-center"
      >
        <h2
          id="pdf-tools-introduction"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Free PDF Tools for Everyday Document Tasks
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600">
          PDFMaster brings commonly used PDF utilities together in one place.
          You can convert PDF files to Word, JPG, Excel, and PowerPoint,
          convert images or documents to PDF, merge multiple PDF files, split
          PDF pages, reduce PDF file size, rotate pages, add watermarks, and
          protect PDF documents.
        </p>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Whether you are working with academic documents, business files,
          forms, presentations, or personal documents, PDFMaster provides
          browser-based PDF tools that are easy to access from desktop and
          mobile devices.
        </p>
      </section>

      {/* Tools Section */}
      <section
        id="tools-grid"
        aria-labelledby="available-pdf-tools"
        className="mt-16 scroll-mt-24"
      >
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row">
          <div>
            <h2
              id="available-pdf-tools"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Free Online PDF Tools
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Choose a PDF tool to convert, organize, compress, edit, or
              protect your documents.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />

            <label htmlFor="tool-search-input" className="sr-only">
              Search PDF tools
            </label>

            <input
              id="tool-search-input"
              type="search"
              placeholder="Search PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div
          className="mt-6 flex flex-wrap items-center gap-2"
          aria-label="PDF tool categories"
        >
          {[
            { id: 'all', label: 'All Tools (13)' },
            { id: 'convert-from', label: 'Convert from PDF' },
            { id: 'convert-to', label: 'Convert to PDF' },
            { id: 'organize', label: 'Organize & Edit' },
            { id: 'security', label: 'Security & Protect' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={`filter-category-${cat.id}-btn`}
              aria-pressed={selectedCategory === cat.id}
              onClick={() =>
                setSelectedCategory(cat.id as ToolCategory)
              }
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <article
              key={tool.id}
              id={`tool-card-${tool.id}`}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 shadow-inner transition-colors group-hover:bg-indigo-50">
                    {getToolIcon(tool.iconName)}
                  </div>

                  {tool.badge && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-700">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                  {tool.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {tool.shortDesc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => handleToolClick(tool.id)}
                  className="text-left text-xs font-semibold text-indigo-600 hover:underline"
                  aria-label={`Open ${tool.title}`}
                >
                  {tool.buttonText}
                </button>

                <button
                  type="button"
                  onClick={() => handleToolClick(tool.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-indigo-600 group-hover:text-white"
                  aria-label={`Open ${tool.title}`}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-base font-bold text-slate-700">
              No PDF tools found matching &quot;{searchQuery}&quot;
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try clearing your search query or selecting a different
              category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* In-Feed Mid Page Ad */}
      <AdContainer
        slot="between-sections"
        className="mx-auto my-14 max-w-5xl"
      />

      {/* Value Proposition */}
      <FeatureHighlights />

      {/* Why PDFMaster */}
      <section
        aria-labelledby="why-pdfmaster"
        className="mx-auto mt-16 max-w-5xl"
      >
        <div className="text-center">
          <h2
            id="why-pdfmaster"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Why Use PDFMaster?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Access commonly needed PDF utilities from one simple online
            platform.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Zap className="h-7 w-7 text-indigo-600" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Easy PDF Processing
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use dedicated tools for common PDF tasks without navigating
              through complicated software.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-7 w-7 text-emerald-600" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Convenient Online Access
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Open PDFMaster from a modern web browser on your computer,
              tablet, or smartphone.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Sparkles className="h-7 w-7 text-purple-600" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Multiple PDF Utilities
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Convert, compress, merge, split, rotate, watermark, and protect
              PDF files from one central location.
            </p>
          </div>
        </div>
      </section>

      {/* Home FAQs */}
      <section className="mt-16">
        <FaqSection
          faqs={homeFaqs}
          title="Frequently Asked Questions About PDFMaster"
        />
      </section>
    </div>
  );
};
