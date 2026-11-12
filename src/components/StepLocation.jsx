import React from 'react';
import { MapPin, Clock, Check, Sparkles } from 'lucide-react';
import { LOCATIONS, FREQUENCIES } from '../data/mockData';
import { soundManager } from '../utils/sound';

export default function StepLocation({ formData, updateField, isDark }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Question Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide mb-3 bg-amber-400/10 text-amber-500 border border-amber-400/20">
          <MapPin className="w-3.5 h-3.5" />
          <span>Section 01 • Machine Context</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
          Which vending machine did you use today?
        </h2>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Pinpointing your location allows our restocking crew to tailor products and address hardware telemetry instantly.
        </p>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {LOCATIONS.map((loc) => {
          const isSelected = formData.locationId === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                updateField('locationId', loc.id);
                soundManager.playTap(520);
              }}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 relative group cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-zinc-900/90 border-amber-400/80 shadow-lg shadow-amber-400/5 ring-1 ring-amber-400/40'
                    : 'bg-amber-50/60 border-zinc-900 shadow-md ring-1 ring-zinc-900'
                  : isDark
                    ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/80 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded font-semibold ${
                      isSelected
                        ? isDark ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-900 text-white'
                        : isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {loc.code}
                    </span>
                    <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {loc.status}
                    </span>
                  </div>
                  <h3 className={`mt-2 font-semibold text-sm tracking-tight ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}>
                    {loc.name}
                  </h3>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected
                    ? isDark ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-900 bg-zinc-900 text-white'
                    : isDark ? 'border-zinc-700 bg-zinc-800/50' : 'border-stone-300 bg-stone-50'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Frequency of Usage */}
      <div className="pt-4 border-t border-zinc-800/60">
        <label className={`block text-xs uppercase tracking-wider font-semibold mb-3 ${
          isDark ? 'text-zinc-400' : 'text-stone-600'
        }`}>
          How often do you usually stop by our machines?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FREQUENCIES.map((freq) => {
            const isSelected = formData.frequency === freq.id;
            return (
              <button
                key={freq.id}
                type="button"
                onClick={() => {
                  updateField('frequency', freq.id);
                  soundManager.playTap(560);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300 ring-1 ring-amber-400/30'
                      : 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                    : isDark
                      ? 'bg-zinc-900/30 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-semibold">{freq.label}</div>
                <div className={`text-[11px] mt-0.5 truncate ${
                  isSelected
                    ? isDark ? 'text-amber-200/70' : 'text-zinc-300'
                    : isDark ? 'text-zinc-500' : 'text-stone-400'
                }`}>
                  {freq.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

