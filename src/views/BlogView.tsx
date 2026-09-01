import React from 'react';
import { BookOpen, ArrowRight, ShieldCheck, Zap, FileText } from 'lucide-react';
import { ViewType } from '../types';

interface BlogViewProps {
  onNavigate: (view: ViewType) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const articles = [
    {
      title: 'How to Compress Large PDF Files for Email Without Losing Quality',
      snippet: 'Learn how to optimize vector streams, downsample high-DPI imagery, and remove redundant metadata to shrink PDFs under standard 25MB email attachment limits.',
      readTime: '4 min read',
      tag: 'Optimization',
      toolLink: 'compress-pdf' as const
    },
    {
      title: 'PDF vs Word (DOCX): When to Use Which and How to Convert Seamlessly',
      snippet: 'A comprehensive comparison between fixed-layout PDF documents and editable flowing Word documents, with tips for preserving complex table structures.',
      readTime: '5 min read',
      tag: 'Conversion',
      toolLink: 'pdf-to-word' as const
    },
    {
      title: 'Enterprise PDF Security: Passwords, Permissions, and Redaction Explained',
      snippet: 'Understand AES-128 and AES-256 PDF encryption, owner vs user passwords, and how to safeguard confidential contracts against unauthorized copying.',
      readTime: '6 min read',
      tag: 'Security',
      toolLink: 'protect-pdf' as const
    },
    {
      title: 'How to Extract Multi-Page Tables from PDF into Clean Excel Spreadsheets',
      snippet: 'Best practices for handling invoice tables, bank statements, and structured numerical datasets when converting from PDF to Excel XLSX.',
      readTime: '3 min read',
      tag: 'Productivity',
      toolLink: 'pdf-to-excel' as const
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="text-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200 mb-3">
          Knowledge Base &amp; Guides
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          PDFMaster Articles &amp; Document Guides
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
          Practical advice, tutorials, and deep dives on PDF optimization, encryption, and document management.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {articles.map((art, idx) => (
          <div
            key={idx}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700">
                  {art.tag}
                </span>
                <span className="text-slate-400">{art.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {art.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {art.snippet}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate(art.toolLink)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Try Related Tool</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
