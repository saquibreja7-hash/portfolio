"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CommandItem = {
  label: string;
  href: string;
  group: string;
  keywords?: string[];
};

export default function CommandMenu({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;

    return items.filter((item) => {
      const haystack = [item.label, item.group, ...(item.keywords || [])].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [items, query]);

  const groups = [...new Set(filtered.map((item) => item.group))];

  function goTo(href: string) {
    setOpen(false);
    setQuery("");
    window.location.href = href;
  }

  return (
    <>
      <button
        type="button"
        className="command-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        title="Search (Ctrl+K)"
      >
        <Search size={14} />
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className="command-overlay" onClick={() => setOpen(false)}>
          <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Search site" onClick={(event) => event.stopPropagation()}>
            <div className="command-input-wrap">
              <Search size={17} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, galleries, writing..."
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command menu">
                <X size={16} />
              </button>
            </div>
            <div className="command-list">
              {filtered.length === 0 && <div className="command-empty">No results.</div>}
              {groups.map((group) => (
                <div key={group} className="command-group">
                  <div className="command-group-label">{group}</div>
                  {filtered.filter((item) => item.group === group).map((item) => (
                    <button key={`${item.group}-${item.href}`} type="button" onClick={() => goTo(item.href)} className="command-item">
                      <span>{item.label}</span>
                      <small>{item.href}</small>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .command-trigger {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 120;
          height: 40px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--hairline);
          border-radius: 999px;
          background: color-mix(in srgb, var(--card) 88%, transparent);
          color: var(--dark);
          padding: 0 10px 0 14px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          backdrop-filter: blur(12px);
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }
        .command-trigger kbd {
          border: 1px solid var(--hairline);
          border-radius: 7px;
          padding: 2px 6px;
          color: var(--muted);
          font-size: 10px;
          font-family: inherit;
          background: var(--bg);
        }
        .command-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.38);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 16vh 20px 40px;
        }
        .command-dialog {
          width: min(620px, 100%);
          border-radius: 14px;
          background: var(--card);
          border: 1px solid var(--hairline);
          box-shadow: 0 24px 80px rgba(0,0,0,0.24);
          overflow: hidden;
        }
        .command-input-wrap {
          height: 58px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          border-bottom: 1px solid var(--hairline);
          color: var(--muted);
        }
        .command-input-wrap input {
          flex: 1;
          border: none;
          outline: none;
          font: inherit;
          font-size: 15px;
          background: transparent;
          color: var(--dark);
        }
        .command-input-wrap button {
          border: none;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          display: inline-flex;
        }
        .command-list {
          max-height: 420px;
          overflow: auto;
          padding: 10px;
        }
        .command-empty {
          padding: 30px;
          text-align: center;
          color: var(--muted);
          font-size: 13px;
        }
        .command-group + .command-group {
          margin-top: 10px;
        }
        .command-group-label {
          padding: 8px 10px;
          color: var(--light-text);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .command-item {
          width: 100%;
          border: none;
          border-radius: 9px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 11px 10px;
          color: var(--dark);
          cursor: pointer;
          text-align: left;
          font: inherit;
          font-size: 14px;
          font-weight: 650;
        }
        .command-item:hover {
          background: var(--bg);
        }
        .command-item small {
          color: var(--light-text);
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
        }
        @media (max-width: 560px) {
          .command-trigger span,
          .command-trigger kbd {
            display: none;
          }
          .command-trigger {
            width: 44px;
            justify-content: center;
            padding: 0;
          }
          .command-item {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </>
  );
}
