import { useState } from 'react';
import playbookData from '../data/playbook.json';

function PlaybookPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="page">
      <div className="topbar">
        <h1 className="page-title">Playbook</h1>
      </div>

      <div className="panel card">
        <div className="accordion">
          {playbookData.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div key={item.title} className="accordion-item">
                <button className="accordion-toggle" onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span>{item.title}</span>
                  <span>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className="accordion-content">{item.content}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlaybookPage;
