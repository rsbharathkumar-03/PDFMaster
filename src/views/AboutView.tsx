import React from 'react';
import { ShieldCheck, Cpu, Globe, Users, Server, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200 mb-3">
          Our Mission
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Empowering Everyone with Fast, Free &amp; Private PDF Tools
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          PDFMaster was created with a straightforward goal: provide an enterprise-grade, lightning-fast, and trustworthy suite of document utilities without forced paywalls, intrusive tracking, or complicated registrations.
        </p>
      </div>

      {/* Core Values */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Privacy by Default</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            We adhere to a zero-permanent-storage architecture. Your files are processed entirely in secure ephemeral memory and purged immediately after download. We never read, index, or sell your documents.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Cpu className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Enterprise Backend Architecture</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Our technology stack is built on Java 17, Spring Boot 3.x, Apache PDFBox, and Apache POI. This ensures mathematical accuracy for page rotations, vector watermarking, and tabular extractions.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Universal Compatibility</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            PDFMaster runs on all modern browsers across desktop, laptop, tablet, and mobile platforms without needing extensions, third-party software, or plugins.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Free Forever</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Our platform is designed to remain permanently free for students, professionals, and businesses alike, sustained purely through non-intrusive standard web advertisements.
          </p>
        </div>
      </div>

      {/* Spring Boot Technical Details Banner */}
      <div className="mt-12 rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-900 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Server className="h-6 w-6 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Java Spring Boot 3.x Engine</span>
        </div>
        <h2 className="text-2xl font-bold">Inspect Our Production Backend Source Code</h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          PDFMaster includes a complete Spring Boot 3.x project with Maven POM, Controllers, REST APIs, PDFBox processing services, global exception handlers, and MySQL JPA models.
        </p>
        <button
          onClick={() => onNavigate('backend-code')}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
        >
          <span>Explore Spring Boot Source Code</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
