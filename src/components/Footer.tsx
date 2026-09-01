import React from 'react';
import { ViewType, ToolId } from '../types';
import { AdContainer } from './AdContainer';
import { ShieldCheck, Heart, Lock, Zap, Server } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Ad Slot */}
        <AdContainer slot="footer-banner" className="mb-10 max-w-4xl mx-auto" />

        {/* Security & Value Propositions Bar */}
        <div className="mb-12 grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Zero Permanent Storage</h4>
              <p className="text-xs text-slate-500">Your documents are processed temporarily and purged immediately.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">End-to-End Encryption</h4>
              <p className="text-xs text-slate-500">All data transfers use TLS 1.3 encryption with strict security headers.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ultra-Fast Processing</h4>
              <p className="text-xs text-slate-500">Engineered with high-throughput streams for near-instant conversions.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Spring Boot 3.x Ready</h4>
              <p className="text-xs text-slate-500">Enterprise Java 17 + Apache PDFBox &amp; POI backend architecture.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-black text-sm">
                PM
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                PDF<span className="text-indigo-600">Master</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-500 leading-relaxed">
              PDFMaster is an open, free, and secure online platform for converting, compressing, merging, splitting, watermarking, and protecting PDF documents. Built with enterprise standards and privacy by design.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => onNavigate('backend-code')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                <span>View Java Spring Boot Code</span>
              </button>
            </div>
          </div>

          {/* Column: Convert From PDF */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Convert from PDF</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('pdf-to-word')} className="hover:text-indigo-600 transition">
                  PDF to Word
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pdf-to-jpg')} className="hover:text-indigo-600 transition">
                  PDF to JPG
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pdf-to-excel')} className="hover:text-indigo-600 transition">
                  PDF to Excel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pdf-to-ppt')} className="hover:text-indigo-600 transition">
                  PDF to PowerPoint
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Convert & Organize */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Convert &amp; Organize</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('word-to-pdf')} className="hover:text-indigo-600 transition">
                  Word to PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jpg-to-pdf')} className="hover:text-indigo-600 transition">
                  JPG to PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('merge-pdf')} className="hover:text-indigo-600 transition">
                  Merge PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('split-pdf')} className="hover:text-indigo-600 transition">
                  Split PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compress-pdf')} className="hover:text-indigo-600 transition">
                  Compress PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rotate-pdf')} className="hover:text-indigo-600 transition">
                  Rotate PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Security & Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Security &amp; Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('protect-pdf')} className="hover:text-indigo-600 transition">
                  Protect PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unlock-pdf')} className="hover:text-indigo-600 transition">
                  Unlock PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('watermark-pdf')} className="hover:text-indigo-600 transition">
                  Watermark PDF
                </button>
              </li>
              <li className="pt-2 border-t border-slate-100">
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-600 transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-600 transition">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-indigo-600 transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-indigo-600 transition">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookie-policy')} className="hover:text-indigo-600 transition">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-8 sm:flex-row gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PDFMaster. All rights reserved. Free Online PDF Utility Platform.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <button onClick={() => onNavigate('privacy-policy')} className="hover:underline">
              Privacy
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('terms')} className="hover:underline">
              Terms
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('cookie-policy')} className="hover:underline">
              Cookies
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('blog')} className="hover:underline">
              PDF Guides
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
