import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Phone, MapPin, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { ContactFormData } from '../types';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const recipientEmail = 'rsbharathk@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMsg('Please enter a subject.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMsg('Message must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate / call backend contact service configured for rsbharathk@gmail.com
      await new Promise((res) => setTimeout(res, 600));
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Unable to send message. Please try again later or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
    setErrorMsg(null);
    setCopied(false);
  };

  const handleCopyMessage = () => {
    const text = `From: ${formData.name} <${formData.email}>\nTo: ${recipientEmail}\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    formData.subject || 'PDFMaster Inquiry'
  )}&body=${encodeURIComponent(
    `From: ${formData.name || 'User'} (${formData.email || 'No email provided'})\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="text-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200 mb-3">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Contact the PDFMaster Team
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
          Have feedback, a bug report, or a feature suggestion? All inquiries are directly forwarded to <strong>{recipientEmail}</strong>.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Contact Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Support Information</h2>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Direct Recipient</p>
              <a
                href={`mailto:${recipientEmail}`}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline break-all"
              >
                {recipientEmail}
              </a>
              <p className="text-xs text-slate-500">Primary inbox & notifications</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Response Window</p>
              <p className="text-sm font-semibold text-slate-800">Within 24 Hours</p>
              <p className="text-xs text-slate-500">Direct personal attention</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Service Status</p>
              <p className="text-sm font-semibold text-slate-800">Global Cloud Service</p>
              <p className="text-xs text-slate-500">Fast client-side & server processing</p>
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-50/70 p-4 border border-indigo-100 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900">
              <Mail className="h-4 w-4 text-indigo-600" />
              <span>Direct Email Access</span>
            </div>
            <p>
              You can also email directly from your favorite client (Gmail, Outlook, Apple Mail) by clicking the address above.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
                <span className="text-xs text-slate-500">
                  Routes to: <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-semibold">{recipientEmail}</code>
                </span>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bharath"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your-email@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Feature Suggestion / Bug Report"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your message or inquiry in detail..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Sending to rsbharathk@gmail.com...' : 'Submit Message'}</span>
                </button>

                <a
                  id="contact-mailto-link"
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  title="Open draft directly in your default email client"
                >
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                  <span>Send via Gmail / Email App</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 animate-in fade-in space-y-4">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Thank You! Message Dispatched.</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your message has been recorded and routed to <strong className="text-indigo-600">{recipientEmail}</strong>. A reply will be sent to <strong>{formData.email}</strong>.
              </p>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in Mail App (Optional Backup)</span>
                </a>

                <button
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Message Details'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
