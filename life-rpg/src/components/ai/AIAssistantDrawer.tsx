import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Send, X, Sparkles, User, Brain, Lightbulb } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { aiMessages, sendAIMessage } = useGame();
  const { t } = useLanguage();

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendAIMessage(input.trim());
    setInput('');
  };

  const quickPrompts = [
    'I have an exam tomorrow and two coding assignments.',
    'How should I prioritize today’s quests?',
    'I feel exhausted, what’s a low-effort task to protect my streak?',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 backdrop-blur-xl border-l border-amber-500/40 shadow-2xl flex flex-col justify-between animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Sage Aethelgard <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[10px] text-slate-400">Realm AI Productivity Advisor</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p>{msg.text}</p>
              <span className={`text-[9px] mt-1 block ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/30 space-y-1.5">
        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Consult Sage Quick Prompts:
        </span>
        <div className="flex flex-col gap-1">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sendAIMessage(q);
              }}
              className="text-left text-[11px] text-slate-300 hover:text-amber-300 bg-slate-900/80 hover:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-800 truncate"
            >
              • {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-800 flex gap-2 bg-slate-900/80">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('aiPlaceholder')}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
