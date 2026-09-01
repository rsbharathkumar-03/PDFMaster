import React from 'react';
import { ShieldCheck, Zap, Laptop, Award, Lock, Sparkles } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: '100% Privacy & Security',
      desc: 'Files are processed in ephemeral memory and automatically purged immediately after download. We never sell, log, or permanently store your files.'
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Processing',
      desc: 'Optimized processing engines handle conversions and compressions in seconds, without waiting in long server queues.'
    },
    {
      icon: Laptop,
      title: 'Works on All Devices',
      desc: 'Fully responsive web experience. Works seamlessly on Windows, macOS, Linux, iOS iPhones/iPads, and Android smartphones.'
    },
    {
      icon: Award,
      title: 'High-Precision Output',
      desc: 'Clean vector graphics, sharp fonts, accurate tables, and preserved document hierarchies for every conversion.'
    },
    {
      icon: Lock,
      title: 'TLS 1.3 Encryption',
      desc: 'All file streams are encrypted using modern TLS protocols to ensure tamper-proof data transmission.'
    },
    {
      icon: Sparkles,
      title: 'Free Forever with No Limits',
      desc: 'No hidden paywalls, credit cards, or watermarks attached to standard operations. Access every PDF utility for free.'
    }
  ];

  return (
    <section className="mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Why Choose PDFMaster</h2>
        <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Engineered for Speed, Reliability, &amp; Privacy
        </h3>
        <p className="mt-3 text-base text-slate-600">
          Everything you need to handle PDFs professionally in one unified, modern workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
