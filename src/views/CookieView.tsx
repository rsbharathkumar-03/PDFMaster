import React from 'react';
import { Cookie, Info, ShieldCheck } from 'lucide-react';

export const CookieView: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
          <Cookie className="h-4 w-4" />
          <span>Transparency</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when you visit a website. They help websites remember your device and preferences to provide a smoother user experience.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">2. How PDFMaster Uses Cookies</h2>
            <p>
              PDFMaster uses strictly minimal cookies and local storage tokens:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li><strong>Essential Preferences:</strong> Retaining your selected UI theme, search filter states, and active tool choices across page navigation.</li>
              <li><strong>Advertising Cookies (Google AdSense):</strong> In order to keep all PDF tools 100% free, third-party advertising partners like Google AdSense may place cookies to serve relevant advertisements.</li>
              <li><strong>Performance &amp; Diagnostics:</strong> Anonymous aggregated telemetry to detect broken API endpoints and server latency.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">3. Managing and Disabling Cookies</h2>
            <p>
              You can choose to disable cookies through your individual browser settings. Note that disabling essential cookies may affect some interface preferences, but our core document conversion tools will remain functional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
