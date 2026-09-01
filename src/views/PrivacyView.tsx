import React from 'react';
import { ShieldCheck, Lock, Trash2, EyeOff, Server, FileText } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Security &amp; Data Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-8 space-y-8 text-sm text-slate-600 leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-indigo-600" />
              1. Zero Permanent Document Storage
            </h2>
            <p>
              At PDFMaster, document privacy is our highest priority. When you upload a document (PDF, Word, Excel, PowerPoint, or Image) to any of our conversion or editing tools:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>Your file is processed dynamically in volatile memory or isolated temporary scratch buffers.</li>
              <li>Once processing completes and the output is downloaded, temporary references are completely purged.</li>
              <li>We <strong>never</strong> store your uploaded documents in permanent MySQL databases or object stores.</li>
              <li>We <strong>never</strong> index, analyze, or train machine learning models on your private documents.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5 text-indigo-600" />
              2. Passwords and Encryption Security
            </h2>
            <p>
              When using the <strong>Protect PDF</strong> or <strong>Unlock PDF</strong> utilities, user-provided passwords are used strictly in-memory during the cryptographic transformation. We never log, store, or transmit your passwords to any database, analytics provider, or third-party loggers.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Server className="h-5 w-5 text-indigo-600" />
              3. Data in Transit (TLS 1.3)
            </h2>
            <p>
              All traffic between your browser and our processing servers is protected using Transport Layer Security (TLS 1.3) encryption. This prevents interception, tampering, or man-in-the-middle attacks.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-indigo-600" />
              4. Cookies and Advertising
            </h2>
            <p>
              PDFMaster uses minimal local storage solely to retain your client-side UI preferences. In order to provide this platform 100% free of charge without requiring subscriptions, we may display standard, non-intrusive advertisements (such as Google AdSense). Google and its advertising partners may use cookies to serve personalized or contextual ads. You may manage your cookie preferences in your browser settings at any time.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              5. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions, inquiries, or audit requests regarding our data protection policies, please contact our administrative team at <a href="mailto:rsbharathk@gmail.com" className="font-semibold text-indigo-600 hover:underline">rsbharathk@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
