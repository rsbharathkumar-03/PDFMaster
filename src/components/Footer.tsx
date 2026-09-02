import React from 'react';
import { ViewType } from '../types';
import { AdContainer } from './AdContainer';
import {
  ShieldCheck,
  Lock,
  Zap,
  Server,
  FileText,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const SITE_URL = 'https://pdf-master-ezhr.vercel.app';

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigateWithFallback = (
    event: React.MouseEvent<HTMLAnchorElement>,
    view: ViewType
  ) => {
    /*
     * Keep normal browser links available for crawlers and users.
     * App.tsx can still handle SPA navigation through onNavigate().
     */
    event.preventDefault();
    onNavigate(view);
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Footer Ad */}
        <AdContainer
          slot="footer-banner"
          className="mx-auto mb-10 max-w-4xl"
        />

        {/* Security & Value Propositions */}
        <section
          aria-labelledby="footer-benefits"
          className="mb-12 grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <h2 id="footer-benefits" className="sr-only">
            PDFMaster Features and Benefits
          </h2>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Privacy Focused
              </h3>

              <p className="text-xs leading-5 text-slate-500">
                PDFMaster is designed with privacy and secure document
                processing in mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Lock className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Secure Processing
              </h3>

              <p className="text-xs leading-5 text-slate-500">
                Use PDF tools through a secure web application without
                installing desktop software.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Zap className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Easy to Use
              </h3>

              <p className="text-xs leading-5 text-slate-500">
                Simple online PDF utilities for converting, compressing,
                merging, splitting, and managing documents.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Server className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Modern Web Platform
              </h3>

              <p className="text-xs leading-5 text-slate-500">
                Built as a modern web application with PDF processing
                capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2">
            <a
              href={`${SITE_URL}/`}
              onClick={(event) => navigateWithFallback(event, 'home')}
              className="inline-flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="PDFMaster - Free Online PDF Tools"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-sm font-black text-white">
                PM
              </div>

              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                PDF<span className="text-indigo-600">Master</span>
              </span>
            </a>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              PDFMaster provides free online PDF tools for converting,
              compressing, merging, splitting, rotating, watermarking, and
              protecting PDF documents.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Access PDF utilities directly from your web browser on desktop,
              tablet, or mobile devices.
            </p>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => onNavigate('backend-code')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View Java Spring Boot Code</span>
              </button>
            </div>
          </div>

          {/* Convert From PDF */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Convert from PDF
            </h2>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`${SITE_URL}/pdf-to-word`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'pdf-to-word')
                  }
                  className="transition hover:text-indigo-600"
                >
                  PDF to Word
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/pdf-to-jpg`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'pdf-to-jpg')
                  }
                  className="transition hover:text-indigo-600"
                >
                  PDF to JPG
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/pdf-to-excel`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'pdf-to-excel')
                  }
                  className="transition hover:text-indigo-600"
                >
                  PDF to Excel
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/pdf-to-ppt`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'pdf-to-ppt')
                  }
                  className="transition hover:text-indigo-600"
                >
                  PDF to PowerPoint
                </a>
              </li>
            </ul>
          </div>

          {/* Convert & Organize */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Convert &amp; Organize
            </h2>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`${SITE_URL}/word-to-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'word-to-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Word to PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/jpg-to-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'jpg-to-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  JPG to PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/merge-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'merge-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Merge PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/split-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'split-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Split PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/compress-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'compress-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Compress PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/rotate-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'rotate-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Rotate PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Legal */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Security &amp; Legal
            </h2>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`${SITE_URL}/protect-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'protect-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Protect PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/unlock-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'unlock-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Unlock PDF
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/watermark-pdf`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'watermark-pdf')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Watermark PDF
                </a>
              </li>

              <li className="border-t border-slate-100 pt-2">
                <a
                  href={`${SITE_URL}/about`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'about')
                  }
                  className="transition hover:text-indigo-600"
                >
                  About PDFMaster
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/contact`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'contact')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/privacy-policy`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'privacy-policy')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/terms`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'terms')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Terms of Service
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/cookie-policy`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'cookie-policy')
                  }
                  className="transition hover:text-indigo-600"
                >
                  Cookie Policy
                </a>
              </li>

              <li>
                <a
                  href={`${SITE_URL}/blog`}
                  onClick={(event) =>
                    navigateWithFallback(event, 'blog')
                  }
                  className="transition hover:text-indigo-600"
                >
                  PDF Guides
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PDFMaster. All rights reserved.
            Free Online PDF Tools.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <a
              href={`${SITE_URL}/privacy-policy`}
              onClick={(event) =>
                navigateWithFallback(event, 'privacy-policy')
              }
              className="hover:text-indigo-600 hover:underline"
            >
              Privacy
            </a>

            <span aria-hidden="true">&bull;</span>

            <a
              href={`${SITE_URL}/terms`}
              onClick={(event) =>
                navigateWithFallback(event, 'terms')
              }
              className="hover:text-indigo-600 hover:underline"
            >
              Terms
            </a>

            <span aria-hidden="true">&bull;</span>

            <a
              href={`${SITE_URL}/cookie-policy`}
              onClick={(event) =>
                navigateWithFallback(event, 'cookie-policy')
              }
              className="hover:text-indigo-600 hover:underline"
            >
              Cookies
            </a>

            <span aria-hidden="true">&bull;</span>

            <a
              href={`${SITE_URL}/blog`}
              onClick={(event) =>
                navigateWithFallback(event, 'blog')
              }
              className="hover:text-indigo-600 hover:underline"
            >
              PDF Guides
            </a>
          </div>
        </div>

        {/* Small Footer Note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <Heart className="h-3.5 w-3.5" />
          <span>PDF tools made simple for everyone.</span>
        </div>
      </div>
    </footer>
  );
};
