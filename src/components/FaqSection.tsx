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
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? 0 : null
  );

  const toggle = (idx: number) => {
    setOpenIndex((currentIndex) => (currentIndex === idx ? null : idx));
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
      aria-labelledby="faq-section-title"
    >
      {/* Section Header */}
      <div className="mb-2 flex items-center gap-2.5 text-indigo-600">
        <HelpCircle
          className="h-5 w-5"
          aria-hidden="true"
        />

        <span className="text-xs font-bold uppercase tracking-wider">
          Help &amp; Answers
        </span>
      </div>

      <h2
        id="faq-section-title"
        className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
      >
        {title}
      </h2>

      {/* FAQ List */}
      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          const buttonId = `faq-btn-${idx}`;
          const answerId = `faq-answer-${idx}`;

          return (
            <div key={`${faq.question}-${idx}`} className="py-4">
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-slate-800 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <span>{faq.question}</span>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-2.5 animate-in fade-in text-sm leading-relaxed text-slate-600"
                >
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
