import React from 'react';
import { ArrowRight, BookOpen, FileText, ShieldCheck, Zap } from 'lucide-react';
import { ViewType } from '../types';

interface BlogViewProps {
  onNavigate: (view: ViewType) => void;
}

interface Article {
  title: string;
  snippet: string;
  readTime: string;
  tag: string;
  toolLink: ViewType;
  icon: React.ReactNode;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const articles: Article[] = [
    {
      title: 'How to Compress Large PDF Files for Email Without Losing Quality',
      snippet:
        'Learn practical ways to reduce PDF file size, optimize images, and make large documents easier to share by email while maintaining readable document quality.',
      readTime: '4 min read',
      tag: 'PDF Compression',
      toolLink: 'compress-pdf',
      icon: <Zap className="h-5 w-5" aria-hidden="true" />
    },
    {
      title: 'PDF vs Word (DOCX): When to Use Which Format',
      snippet:
        'Understand the differences between PDF and Word documents, when each format is useful, and how to convert PDF files into editable Word documents.',
      readTime: '5 min read',
      tag: 'PDF Conversion',
      toolLink: 'pdf-to-word',
      icon: <FileText className="h-5 w-5" aria-hidden="true" />
    },
    {
      title: 'How to Protect a PDF With a Password',
      snippet:
        'Learn how PDF password protection works, why document security matters, and how to protect sensitive PDF files from unauthorized access.',
      readTime: '6 min read',
      tag: 'PDF Security',
      toolLink: 'protect-pdf',
      icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />
    },
    {
      title: 'How to Convert PDF Tables to Excel Spreadsheets',
      snippet:
        'Learn how converting PDF tables into Excel can make invoices, reports, statements, and other structured information easier to edit and analyze.',
      readTime: '3 min read',
      tag: 'PDF to Excel',
      toolLink: 'pdf-to-excel',
      icon: <FileText className="h-5 w-5" aria-hidden="true" />
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section
        className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"
        aria-labelledby="blog-title"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </div>

        <span className="mt-4 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          PDF Guides &amp; Tutorials
        </span>

        <h1
          id="blog-title"
          className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
        >
          PDF Tools Guides &amp; Tutorials
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Learn how to merge, compress, convert, protect, and manage PDF
          documents with practical guides and easy-to-follow tips.
        </p>
      </section>

      {/* Introduction */}
      <section
        className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="learn-pdf-title"
      >
        <h2
          id="learn-pdf-title"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Learn How to Work With PDF Files
        </h2>

        <p className="mt-3 leading-relaxed text-slate-600">
          PDF files are commonly used for resumes, reports, invoices,
          applications, forms, presentations, and business documents. Knowing
          how to compress, convert, merge, split, and protect PDF files can
          make everyday document tasks faster and easier.
        </p>

        <p className="mt-3 leading-relaxed text-slate-600">
          Explore the guides below to learn practical PDF tips and then use
          the related free PDF tool when you are ready to process your
          document.
        </p>
      </section>

      {/* Articles */}
      <section className="mt-10" aria-labelledby="articles-title">
        <div className="mb-6">
          <h2
            id="articles-title"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Latest PDF Guides
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Helpful information about PDF conversion, compression, security,
            and document management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
            >
              <div>
                {/* Article metadata */}
                <div className="mb-4 flex items-center justify-between gap-3 text-xs">
                  <span className="flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700">
                    {article.icon}
                    {article.tag}
                  </span>

                  <span className="shrink-0 text-slate-400">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {article.snippet}
                </p>
              </div>

              {/* Related tool */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => onNavigate(article.toolLink)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <span>Try Related PDF Tool</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Popular PDF Tools */}
      <section
        className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
        aria-labelledby="popular-tools-title"
      >
        <h2
          id="popular-tools-title"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Popular PDF Tools
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Quickly access PDF tools for common document tasks.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('merge-pdf')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Merge PDF
          </button>

          <button
            type="button"
            onClick={() => onNavigate('compress-pdf')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Compress PDF
          </button>

          <button
            type="button"
            onClick={() => onNavigate('split-pdf')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Split PDF
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pdf-to-word')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            PDF to Word
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pdf-to-jpg')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            PDF to JPG
          </button>

          <button
            type="button"
            onClick={() => onNavigate('protect-pdf')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Protect PDF
          </button>
        </div>
      </section>
    </main>
  );
};
