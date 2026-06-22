import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface PromptOverridePanelProps {
  title: string;
  description: string;
  value: string;
  defaultValue: string;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}

export default function PromptOverridePanel({
  title,
  description,
  value,
  defaultValue,
  isOpen,
  onToggle,
  onChange,
}: PromptOverridePanelProps) {
  return (
    <div className="border border-faction-border bg-black/20 rounded overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-black/20 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-faction-accent" />
          <span className="text-[10px] font-black uppercase tracking-wider font-mono text-faction-text">
            {title}
          </span>
        </span>
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
          value.trim() && value !== defaultValue
            ? "bg-faction-accent/15 text-faction-accent border-faction-accent-border/40"
            : "bg-slate-900/60 text-slate-500 border-faction-border"
        }`}>
          {value.trim() && value !== defaultValue ? "Custom" : "Default"}
        </span>
      </button>

      {isOpen && (
        <div className="p-3 border-t border-faction-border space-y-2">
          <p className="text-[10px] text-faction-text-muted leading-relaxed font-mono">
            {description}
          </p>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={7}
            className="w-full text-[11px] p-2 bg-faction-bg border border-faction-border text-faction-text rounded font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-faction-accent"
            placeholder="Write the exact prompt rules you want Gemini to follow here..."
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-slate-500 font-mono">
              Reset returns this area to the app's stable default prompt.
            </span>
            <button
              type="button"
              onClick={() => onChange(defaultValue)}
              className="px-2 py-1 text-[9px] font-bold font-mono rounded bg-black/30 border border-faction-border text-faction-text-muted hover:text-faction-text cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
