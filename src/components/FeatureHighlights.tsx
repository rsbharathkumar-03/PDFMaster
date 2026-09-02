import React from 'react';
import {
  ShieldCheck,
  Zap,
  Laptop,
  FileCheck,
  Lock,
  Sparkles
} from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Privacy-Focused PDF Tools',
      desc: 'Use PDFMaster to work with your documents through a simple online interface. Avoid unnecessary steps and keep your document workflow straightforward.'
    },
    {
      icon: Zap,
      title: 'Fast and Simple Processing',
      desc: 'Perform common PDF tasks such as merging, splitting, compressing, converting, rotating, and watermarking with an easy-to-use workflow.'
    },
    {
      icon: Laptop,
      title: 'Works Across Devices',
      desc: 'PDFMaster is designed as a responsive web application that works on desktop computers, laptops, tablets, and mobile devices.'
    },
    {
      icon: FileCheck,
      title: 'Multiple PDF Utilities',
      desc: 'Access a collection of useful PDF tools in one place, including PDF conversion, compression, organization, and document protection.'
    },
    {
      icon: Lock,
      title: 'PDF Protection Tools',
      desc: 'Protect PDF documents with available security features and make common document protection tasks easier to manage online.'
    },
    {
      icon: Sparkles,
      title: 'Easy to Use',
      desc: 'No complicated software interface is required. Select a PDF tool, upload your document, configure the available options, and process your file.'
    }
  ];

  return (
    <section
      className="mt-20"
      aria-labelledby="feature-highlights-title"
    >
      {/* Section Heading */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-600">
          Why Choose PDFMaster
        </span>

        <h2
          id="feature-highlights-title"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          Simple Online PDF Tools for Everyday Documents
        </h2>

        <p className="mt-3 text-base leading-relaxed text-slate-600">
          PDFMaster brings common PDF conversion, editing, organization,
          compression, and security tools together in one convenient web
          application.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <Icon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
