import { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import type { FAQ } from '~/lib/mock-data';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
}

export function FAQAccordion({ faqs, title = 'Frequently Asked Questions', className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={className}>
      {title && (
        <h3 className="font-display font-bold text-xl text-brand-navy mb-6">{title}</h3>
      )}

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-brand-navy/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-cream/30 transition-colors"
              >
                <span className="font-bold text-brand-navy pr-4">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-brand-navy/60 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-4 text-brand-navy/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
