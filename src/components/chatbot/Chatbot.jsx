import React, { useState, useEffect, useRef } from 'react';
import './chatbot.scss';

function Message({ m }) {
  // m.text may be a string or a structured object { type, items }
  const renderText = () => {
    if (!m.text) return null;
    if (typeof m.text === 'string') return <div className="cb-message-text">{m.text}</div>;
    if (typeof m.text === 'object' && m.text.type === 'list') {
      return (
        <div className="cb-message-text cb-list-result">
          {m.text.items.map((it, i) => (
            // navigate to the kurral page when clicked
            <div key={i} className="cb-list-item">
              <a href={`/kurral/${it.id}`} onClick={(e) => { e.preventDefault(); window.location.href = `/kurral/${it.id}`; }}>
                #{it.id} — {it.title}
              </a>
            </div>
          ))}
        </div>
      );
    }
    if (typeof m.text === 'object' && m.text.type === 'kurral') {
      const it = m.text;
      return (
        <div className="cb-message-text">
          <a href={`/kurral/${it.id}`} onClick={(e) => { e.preventDefault(); window.location.href = `/kurral/${it.id}`; }}>
            Open Kurral #{it.id}
          </a>
        </div>
      );
    }
    // fallback: JSON stringify
    return <div className="cb-message-text">{JSON.stringify(m.text)}</div>;
  };

  return (
    <div className={`cb-message ${m.from === 'user' ? 'user' : 'bot'}`}>
      {renderText()}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  function pushMessage(from, text) {
    setMessages((m) => [...m, { from, text, ts: Date.now() }]);
  }

  async function handleSend() {
    const q = input && input.trim();
    if (!q) return;
    pushMessage('user', q);
    setInput('');
    setLoading(true);
    try {
      const resp = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, topN: 6 }),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        pushMessage('bot', `Error: ${resp.status} ${txt}`);
      } else {
        const json = await resp.json();
        // Build a friendly summary
        const r = json.result || json;
        if (r.kurral) {
          const item = (r.results && r.results[0]) || null;
          pushMessage('bot', { type: 'kurral', id: r.kurral, title: item ? (item.line1 || item.Tamil || item.English) : '' });
        } else if (r.adikaram) {
          pushMessage('bot', `Adikaram ${r.adikaram}: ${r.results?.length || 0} kurrals found`);
        } else if (Array.isArray(r.results)) {
          if (r.results.length === 0) pushMessage('bot', 'No matches found.');
          else {
            const items = r.results.slice(0, 6).map(x => ({ id: x.Index || x.Kurral_id || x.kurral_id, title: x.line1 || x.Tamil || x.English }));
            pushMessage('bot', { type: 'list', items });
          }
        } else {
          pushMessage('bot', JSON.stringify(r));
        }
      }
    } catch (err) {
      pushMessage('bot', `Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={`chatbot-root ${open ? 'open' : 'closed'}`}>
      <div className="chatbot-button" onClick={() => setOpen((s) => !s)} aria-label="Open chat">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path fill="currentColor" d="M12 3C7 3 3.2 6.2 3.2 10.4c0 1.9.8 3.6 2.1 4.9V21l4.1-2.2c1.1.3 2.3.5 3.6.5 5 0 8.8-3.2 8.8-7.4S17 3 12 3z"></path>
        </svg>
      </div>

      <div className="chatbot-panel" role="dialog" aria-hidden={!open}>
        <div className="cb-header">
          <strong>Thirukkural Chat</strong>
          <button className="cb-close" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="cb-list" ref={listRef}>
          {messages.map((m, i) => <Message key={m.ts + '-' + i} m={m} />)}
        </div>
        <div className="cb-input">
          <textarea
            placeholder="Ask e.g. 'kurral:10' or 'adikaram:3' or 'virtue of rain'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
          />
          <div className="cb-actions">
            <button className="cb-send" onClick={handleSend} disabled={loading}>{loading ? '...' : 'Send'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
