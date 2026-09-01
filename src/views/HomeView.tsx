import React, { useState } from 'react';
import { ViewType, ToolId, ToolCategory } from '../types';
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
      case 'FileText': return <FileText className="h-6 w-6 text-indigo-600" />;
      case 'FileType': return <FileType className="h-6 w-6 text-blue-600" />;
      case 'Image': return <Image className="h-6 w-6 text-emerald-600" />;
      case 'Images': return <Images className="h-6 w-6 text-teal-600" />;
      case 'Layers': return <Layers className="h-6 w-6 text-purple-600" />;
      case 'Scissors': return <Scissors className="h-6 w-6 text-rose-600" />;
      case 'Minimize2': return <Minimize2 className="h-6 w-6 text-amber-600" />;
      case 'Sheet': return <Sheet className="h-6 w-6 text-green-600" />;
      case 'Presentation': return <Presentation className="h-6 w-6 text-orange-600" />;
      case 'Lock': return <Lock className="h-6 w-6 text-red-600" />;
      case 'Unlock': return <Unlock className="h-6 w-6 text-cyan-600" />;
      case 'RotateCw': return <RotateCw className="h-6 w-6 text-indigo-600" />;
      case 'Stamp': return <Stamp className="h-6 w-6 text-pink-600" />;
      default: return <FileText className="h-6 w-6 text-indigo-600" />;
    }
  };

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const homeFaqs = [
    {
      question: 'Is PDFMaster completely free to use?',
      answer: 'Yes, all tools on PDFMaster are 100% free with no account registration, subscriptions, or credit card required.'
    },
    {
      question: 'Are my uploaded documents stored on your servers?',
      answer: 'No. We operate on a strict zero-permanent-storage architecture. Files are processed in temporary memory and completely erased once converted and downloaded.'
    },
    {
      question: 'What is the maximum file size limit?',
      answer: 'You can upload files up to 25 MB per document, which is ample for virtually all business, academic, and personal PDFs.'
    },
    {
      question: 'Can I use PDFMaster on my mobile phone or tablet?',
      answer: 'Yes! PDFMaster is built with modern responsive web standards and works seamlessly on iOS, iPadOS, Android, Windows, and macOS.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Top Banner Ad Slot */}
      <AdContainer slot="header-banner" className="max-w-4xl mx-auto" />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/30 p-8 sm:p-14 text-center shadow-sm">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Fast, Secure, &amp; 100% Free Online PDF Platform</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            All Your PDF Tools in <span className="text-indigo-600">One Place</span>
          </h1>

          <p className="mt-5 text-lg text-slate-600 sm:text-xl leading-relaxed">
            Convert, compress, merge, split and manage your PDF files quickly and easily.
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
              onClick={() => onSelectTool('compress-pdf')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600"
            >
              <span>Compress PDF</span>
            </button>

            <button
              onClick={() => onSelectTool('pdf-to-word')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600"
            >
              <span>PDF to Word</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4">
            <div>
              <div className="text-2xl font-black text-slate-900">13+</div>
              <div className="text-xs font-semibold text-slate-500">Pro PDF Tools</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">100%</div>
              <div className="text-xs font-semibold text-slate-500">Free Forever</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">0 KB</div>
              <div className="text-xs font-semibold text-slate-500">Permanent Storage</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">&lt; 3s</div>
              <div className="text-xs font-semibold text-slate-500">Average Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools-grid" className="mt-16 scroll-mt-24">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Select a PDF Utility
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick from our complete suite of high-precision document tools.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              id="tool-search-input"
              type="text"
              placeholder="Search PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Tools (13)' },
            { id: 'convert-from', label: 'Convert from PDF' },
            { id: 'convert-to', label: 'Convert to PDF' },
            { id: 'organize', label: 'Organize & Edit' },
            { id: 'security', label: 'Security & Protect' },
          ].map((cat) => (
            <button
              key={cat.id}
              id={`filter-category-${cat.id}-btn`}
              onClick={() => setSelectedCategory(cat.id as ToolCategory)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              onClick={() => onSelectTool(tool.id)}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-indigo-50 transition-colors shadow-inner">
                    {getToolIcon(tool.iconName)}
                  </div>
                  {tool.badge && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {tool.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 group-hover:underline">
                  {tool.buttonText}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-base font-bold text-slate-700">No PDF tools found matching &quot;{searchQuery}&quot;</p>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* In-Feed Mid Page Ad Slot */}
      <AdContainer slot="between-sections" className="my-14 max-w-5xl mx-auto" />

      {/* Value Proposition Highlights */}
      <FeatureHighlights />

      {/* Home FAQs */}
      <FaqSection faqs={homeFaqs} title="Frequently Asked Questions about PDFMaster" />
    </div>
  );
};
