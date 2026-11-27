import { useState } from 'react';
import '../../styles/landing.css';

const FAQS = [
  {
    id: 'custody',
    question: 'Does AlgoPulse hold or connect to real cryptocurrency funds?',
    answer:
      'No. AlgoPulse is a paper-trading and backtesting sandbox. All balances, ticks, and order fills are simulated—no exchange API keys or real wallets are connected.',
  },
  {
    id: 'validation',
    question: 'How are strategy risk parameters validated?',
    answer:
      'Both the Strategy Builder form and the backend API enforce strict numeric bounds (e.g., Stop-Loss 0.1%–50.0%, Take-Profit 0.5%–200.0%) before a strategy can be saved.',
  },
  {
    id: 'export',
    question: 'Can I export simulated order history for review?',
    answer:
      'Yes. Every simulated order is logged in Order History and can be exported as a CSV file for offline analysis or mentor feedback.',
  },
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-5">
      <div className="text-center mb-4">
        <span className="text-success text-uppercase fw-semibold small">FAQ</span>
        <h2 className="h2 fw-bold text-white mt-1">Frequently Asked Questions</h2>
      </div>

      <div className="mx-auto" style={{ maxWidth: '760px' }}>
        <div className="d-flex flex-column gap-3">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-3 bg-dark bg-opacity-75 border border-secondary border-opacity-25"
              >
                <button
                  type="button"
                  className="btn w-100 text-start d-flex justify-content-between align-items-center p-3 text-white fw-semibold"
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                >
                  <span>{item.question}</span>
                  <i
                    className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'} text-success`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 text-secondary small">{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
