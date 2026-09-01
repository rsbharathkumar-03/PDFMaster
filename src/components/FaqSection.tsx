import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  title = 'Frequently Asked Questions'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
      <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
        <HelpCircle className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-wider">Help &amp; Answers</span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">{title}</h3>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                id={`faq-btn-${idx}`}
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-800 hover:text-indigo-600 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2.5 text-sm text-slate-600 leading-relaxed animate-in fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
