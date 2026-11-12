import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  ShieldCheck, 
  Tag, 
  MapPin,
  Star
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function SuccessReceipt({ formData, location, isDark, onReset }) {
  const [copied, setCopied] = useState(false);
  const voucherCode = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopy = () => {
    soundManager.playTap(800);
    navigator.clipboard?.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allItems = [...(formData.desiredItems || []), ...(formData.customItems || [])];

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn py-6">
      
      {/* Top Hero Confirmation */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-amber-400 text-zinc-950 shadow-xl shadow-amber-400/20 animate-bounce">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
          isDark ? 'text-zinc-50' : 'text-zinc-900'
        }`}>
          Feedback Synced Successfully
        </h2>
        <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Your feedback has been logged to the telemetry stream for <span className="font-semibold text-amber-400">{location.name}</span>.
        </p>
      </div>

      {/* Luxury Digital Ticket / Voucher */}
      <div className={`rounded-3xl border overflow-hidden relative shadow-2xl transition-all ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'
      }`}>
        {/* Ticket Header */}
        <div className={`p-6 border-b ${
          isDark ? 'bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              15% VIP REWARD TOKEN
            </span>
            <span className={isDark ? 'text-zinc-500' : 'text-stone-400'}>
              EXPIRES IN 14 DAYS
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-[11px] text-zinc-400 font-mono">PROMO CODE</div>
              <div className={`text-2xl font-mono font-bold tracking-widest ${
                isDark ? 'text-zinc-100' : 'text-zinc-900'
              }`}>
                {voucherCode}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-zinc-950'
                  : isDark
                    ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <p className="text-[11px] text-zinc-400 mt-2">
            Scan barcode or enter code on the touchscreen keypad before checkout to apply discount.
          </p>
        </div>

        {/* Perforated divider visual */}
        <div className="relative h-6 flex items-center">
          <div className={`absolute -left-3 w-6 h-6 rounded-full ${isDark ? 'bg-[#0c0d12]' : 'bg-[#f4f4f6]'}`} />
          <div className={`w-full border-t border-dashed ${isDark ? 'border-zinc-800' : 'border-stone-300'}`} />
          <div className={`absolute -right-3 w-6 h-6 rounded-full ${isDark ? 'bg-[#0c0d12]' : 'bg-[#f4f4f6]'}`} />
        </div>

        {/* Feedback Snapshot Body */}
        <div className="p-6 space-y-4">
          <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
            Submission Snapshot
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-stone-50 border-stone-200'}`}>
              <span className="text-[10px] text-zinc-400 uppercase block">Machine Node</span>
              <span className={`font-semibold mt-0.5 block ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                {location.code} • {location.name.split('•')[0]}
              </span>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-stone-50 border-stone-200'}`}>
              <span className="text-[10px] text-zinc-400 uppercase block">Overall Rating</span>
              <span className="font-semibold text-amber-400 mt-0.5 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                {formData.rating || 5} / 5 Stars
              </span>
            </div>
          </div>

          {/* Requested Items preview */}
          {allItems.length > 0 && (
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-stone-50 border-stone-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                  Items You Voted To Restock ({allItems.length})
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">Prioritized</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allItems.map((item) => (
                  <span
                    key={item}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                      isDark ? 'bg-zinc-800 text-amber-200' : 'bg-stone-200 text-zinc-800'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Issue status if logged */}
          {formData.facedIssues && (
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
              isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'
            }`}>
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className={`font-semibold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                  Maintenance Ticket Dispatched
                </div>
                <div className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-amber-800'}`}>
                  Our tech team has been notified.
                  {formData.requestRefund && ' Your refund credit will be emailed within 15 minutes.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playTap(520);
            onReset();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isDark
              ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900'
              : 'border-stone-300 text-stone-700 hover:bg-stone-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Submit Another Response</span>
        </button>
      </div>

    </div>
  );
}

