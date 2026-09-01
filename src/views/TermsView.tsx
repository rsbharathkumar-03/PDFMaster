import React from 'react';
import { Scale, Check, AlertCircle } from 'lucide-react';

export const TermsView: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
          <Scale className="h-4 w-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PDFMaster, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">2. Permitted and Fair Usage</h2>
            <p>
              PDFMaster is provided free of charge for personal, educational, and commercial document processing. You agree NOT to:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>Upload malicious files containing viruses, worms, or destructive code.</li>
              <li>Attempt to reverse engineer, disrupt, or overload our backend server infrastructure with automated attack scripts or excessive bots.</li>
              <li>Upload illegal, infringing, or unauthorized copyrighted materials without proper rights.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">3. Intellectual Property</h2>
            <p>
              You retain all ownership and copyright of the documents and files you upload to PDFMaster. PDFMaster claims zero ownership, licensing, or intellectual rights over user documents.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">4. Disclaimer of Warranties</h2>
            <p>
              The materials and services on PDFMaster are provided on an &apos;as is&apos; basis. While we utilize industry-standard parsing libraries (Apache PDFBox, Apache POI), PDFMaster makes no warranties regarding 100% layout fidelity for corrupted or non-standard legacy documents.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">5. Modifications to Terms</h2>
            <p>
              PDFMaster reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
