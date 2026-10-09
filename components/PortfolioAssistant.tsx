'use client';

import { useEffect, useRef, useState } from 'react';
import { answerPortfolioQuestion, suggestedQuestions, type Answer } from '@/lib/portfolio-assistant';
import styles from '@/app/simple/assistant.module.css';

type Exchange = { question: string; answer: Answer };
export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { if(open) input.current?.focus(); }, [open]);
  useEffect(() => { if(exchanges.length) end.current?.scrollIntoView({block:'nearest'}); }, [exchanges]);
  function ask(value: string) {
    const trimmed=value.trim().slice(0,500);
    if(!trimmed) return;
    setExchanges(items=>[...items.slice(-19), {question:trimmed,answer:answerPortfolioQuestion(trimmed,items.at(-1)?.answer.topic)}]);
    setQuestion('');
  }
  return <aside className={styles.assistant} aria-label="Offline portfolio assistant">
    <div className={styles.heading}>
      <div><span className={styles.kicker}>A CONVERSATION, WITHOUT THE CLOUD</span><h2>Ask about Nitish.</h2><p>Projects, skills, and the person behind them.</p></div>
      <button type="button" aria-expanded={open} aria-controls="portfolio-chat" onClick={()=>setOpen(value=>!value)}>{open?'Close AI mode':'Open AI mode'} <span aria-hidden="true">{open?'−':'↗'}</span></button>
    </div>
    {open && <div id="portfolio-chat" className={styles.panel}>
      <p className={styles.explainer}>Instant, offline answers from this portfolio. No model download, accounts, or messages sent to a server. This is a local knowledge assistant, not a generative chatbot.</p>
      <div className={styles.suggestions} aria-label="Suggested questions">{suggestedQuestions.map(q=><button type="button" key={q} onClick={()=>ask(q)}>{q} <span aria-hidden="true">↗</span></button>)}</div>
      <div className={styles.messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {!exchanges.length && <p className={styles.empty}>Start with a question above, or type something you’d like to know.</p>}
        {exchanges.map((entry,index)=><div key={index} className={styles.exchange}>
          <p className={styles.question}><span>You</span>{entry.question}</p>
          <div className={styles.answer}><span>Portfolio assistant</span><p>{entry.answer.text}</p>{entry.answer.sources.length>0 && <div className={styles.sources}>{entry.answer.sources.map(source=><a key={source.href} href={source.href}>{source.label} ↗</a>)}</div>}</div>
        </div>)}<div ref={end}/>
      </div>
      <form className={styles.form} onSubmit={event=>{event.preventDefault();ask(question);}}>
        <label htmlFor="portfolio-question">Your question</label>
        <div><input id="portfolio-question" ref={input} value={question} onChange={event=>setQuestion(event.target.value)} placeholder="e.g. What is QuietNote?" maxLength={500} autoComplete="off"/><button type="submit" disabled={!question.trim()}>Ask ↗</button></div>
      </form>
      <div className={styles.bottom}><span>On your device · This session only</span><button type="button" disabled={!exchanges.length} onClick={()=>{setExchanges([]);setQuestion('');input.current?.focus();}}>Clear conversation</button></div>
    </div>}
  </aside>;
}
