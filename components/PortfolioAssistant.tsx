'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { answerPortfolioQuestion, suggestedQuestions, type Answer } from '@/lib/portfolio-assistant';
import styles from '@/app/simple/assistant.module.css';

type Exchange = {
  id: string;
  question: string;
  answer: Answer;
  displayedText: string;
  isTyping: boolean;
};

export function SparklesIcon({ open = false }: { open?: boolean }) {
  if (open) {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.aiSparkleIcon}
      aria-hidden="true"
    >
      {/* Central 4-point AI Star */}
      <path
        d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z"
        className={styles.mainStar}
        fill="currentColor"
      />
      {/* Small accent sparkle top-right */}
      <path
        d="M19 2C19 3.657 17.657 5 16 5C17.657 5 19 6.343 19 8C19 6.343 20.343 5 22 5C20.343 5 19 3.657 19 2Z"
        className={styles.accentStar1}
        fill="currentColor"
      />
      {/* Tiny accent sparkle bottom-left */}
      <path
        d="M5 16C5 17.105 4.105 18 3 18C4.105 18 5 18.895 5 20C5 18.895 5.895 18 7 18C5.895 18 5 17.105 5 16Z"
        className={styles.accentStar2}
        fill="currentColor"
      />
    </svg>
  );
}

export default function PortfolioAssistant({
  variant = 'nav',
}: {
  variant?: 'nav' | 'floating-controls' | 'standalone';
}) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  // Listen to global toggle event (e.g. from FloatingControls)
  useEffect(() => {
    const handleGlobalToggle = () => setOpen(prev => !prev);
    window.addEventListener('toggle-portfolio-ai', handleGlobalToggle);
    return () => window.removeEventListener('toggle-portfolio-ai', handleGlobalToggle);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Click outside and Escape key handler
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (modalRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // Prevent background scrolling when user scrolls over the AI overlay
  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();

      const container = messagesContainerRef.current;
      if (!container) {
        e.preventDefault();
        return;
      }

      // If user scrolls horizontally over the compact suggestions bar
      const target = e.target as Node | null;
      const suggestions = modal.querySelector(`.${styles.compactSuggestions}`);
      if (suggestions && target && suggestions.contains(target) && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        suggestions.scrollLeft += e.deltaX;
        e.preventDefault();
        return;
      }

      // Directly scroll the messages container
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        container.scrollTop = Math.max(0, Math.min(maxScroll, scrollTop + e.deltaY));
      }

      // Always block wheel events from leaking to the document/background page
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      const container = messagesContainerRef.current;
      const target = e.target as Node | null;
      if (!container || !target || !container.contains(target)) {
        e.preventDefault();
      }
    };

    modal.addEventListener('wheel', handleWheel, { passive: false });
    modal.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      modal.removeEventListener('wheel', handleWheel);
      modal.removeEventListener('touchmove', handleTouchMove);
    };
  }, [open]);

  // Scroll messages to bottom as content updates or types
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [exchanges]);

  // Typewriter streaming function ("typeto answer")
  function startTypewriter(msgId: string, fullText: string) {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    let charIndex = 0;
    // Adapt step size to text length: ~1.5s total response duration
    const step = fullText.length > 280 ? 3 : (fullText.length > 130 ? 2 : 1);
    const tickMs = 16;

    typingTimerRef.current = setInterval(() => {
      charIndex += step;
      if (charIndex >= fullText.length) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setExchanges(prev =>
          prev.map(ex =>
            ex.id === msgId ? { ...ex, isTyping: false, displayedText: fullText } : ex
          )
        );
      } else {
        const partial = fullText.slice(0, charIndex);
        setExchanges(prev =>
          prev.map(ex =>
            ex.id === msgId ? { ...ex, displayedText: partial } : ex
          )
        );
      }
    }, tickMs);
  }

  // Fast forward typing on click
  function fastForward(msgId: string, fullText: string) {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setExchanges(prev =>
      prev.map(ex =>
        ex.id === msgId ? { ...ex, isTyping: false, displayedText: fullText } : ex
      )
    );
  }

  function ask(value: string) {
    const trimmed = value.trim().slice(0, 500);
    if (!trimmed) return;

    // Fast-forward any previous message still in typing state
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
      setExchanges(prev =>
        prev.map(ex => (ex.isTyping ? { ...ex, isTyping: false, displayedText: ex.answer.text } : ex))
      );
    }

    const previousTopic = exchanges.at(-1)?.answer.topic;
    const answer = answerPortfolioQuestion(trimmed, previousTopic);
    const msgId = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    const newExchange: Exchange = {
      id: msgId,
      question: trimmed,
      answer,
      displayedText: '',
      isTyping: true,
    };

    setExchanges(prev => [...prev.slice(-19), newExchange]);
    setQuestion('');

    startTypewriter(msgId, answer.text);
  }

  const handleSourceClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/simple${href}`;
      }
    }
  };

  const buttonClass =
    variant === 'floating-controls'
      ? `${styles.aiButtonFloating} ${open ? styles.aiButtonActive : ''}`
      : `${styles.aiButton} ${open ? styles.aiButtonActive : ''}`;

  const buttonElement = (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={open}
      aria-label="Ask AI Assistant"
      title="Ask AI"
      className={buttonClass}
      onClick={() => setOpen(val => !val)}
    >
      <SparklesIcon open={open} />
      <span className={styles.tooltip}>Ask AI</span>
    </button>
  );

  const modalElement = open && mounted && (
    <div
      ref={modalRef}
      role="dialog"
      aria-label="AI Assistant"
      className={styles.chatModal}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
    >
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <div className={styles.headerAvatar} aria-hidden="true">
            <SparklesIcon />
          </div>
          <div className={styles.headerStatus}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Offline · Instant</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          {exchanges.length > 0 && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => {
                if (typingTimerRef.current) {
                  clearInterval(typingTimerRef.current);
                  typingTimerRef.current = null;
                }
                setExchanges([]);
                setQuestion('');
                inputRef.current?.focus();
              }}
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            title="Close"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Messages List ── */}
      <div
        ref={messagesContainerRef}
        className={styles.messages}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
      >
        {exchanges.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateTitle}>Ask anything</div>
            <div className={styles.emptyStateDesc}>
              Instant offline answers grounded in projects, skills, education, photography, and background.
            </div>
            <div className={styles.suggestionsGrid}>
              {suggestedQuestions.map(q => (
                <button
                  type="button"
                  key={q}
                  className={styles.suggestionChip}
                  onClick={() => ask(q)}
                >
                  <span>{q}</span>
                  <span className={styles.suggestionChipArrow} aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          exchanges.map(entry => (
            <React.Fragment key={entry.id}>
              {/* User question */}
              <div className={styles.userMessage}>
                {entry.question}
              </div>

              {/* AI response with typewriter animation */}
              <div
                className={styles.aiMessage}
                onClick={() => entry.isTyping && fastForward(entry.id, entry.answer.text)}
                title={entry.isTyping ? "Click to finish typing immediately" : undefined}
              >
                <p className={styles.answerText}>
                  {entry.displayedText}
                  {entry.isTyping && (
                    <span className={styles.typingCursor} aria-hidden="true">▍</span>
                  )}
                </p>

                {/* Sources list appears once typing finishes */}
                {!entry.isTyping && entry.answer.sources.length > 0 && (
                  <div className={styles.sources}>
                    {entry.answer.sources.map(source => (
                      <a
                        key={source.href}
                        href={source.href}
                        onClick={e => handleSourceClick(e, source.href)}
                        className={styles.sourceChip}
                        target={source.href.startsWith('#') ? undefined : '_blank'}
                        rel={source.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                      >
                        <span>{source.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Compact quick suggestions when conversation is active ── */}
      {exchanges.length > 0 && (
        <div
          className={styles.compactSuggestions}
          aria-label="Suggested follow-up questions"
          data-lenis-prevent="true"
        >
          {suggestedQuestions.slice(0, 5).map(q => (
            <button
              type="button"
              key={q}
              className={styles.compactChip}
              onClick={() => ask(q)}
            >
              <span>{q}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Input Bar ── */}
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          ask(question);
        }}
      >
        <div className={styles.inputGroup}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="e.g. What is his tech stack?"
            maxLength={500}
            autoComplete="off"
            aria-label="Your question"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!question.trim()}
            aria-label="Send question"
            title="Send"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </form>

      {/* ── Footer ── */}
      <div className={styles.footerInfo}>
        <span>Runs 100% locally · Private & offline</span>
        <span>Esc to close</span>
      </div>
    </div>
  );

  return (
    <>
      {buttonElement}
      {mounted && typeof document !== 'undefined' && modalElement && createPortal(modalElement, document.body)}
    </>
  );
}
