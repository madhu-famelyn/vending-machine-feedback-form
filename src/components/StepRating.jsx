import React, { useState } from 'react';
import { Star, Sparkles, Award, Zap, Shield, Heart } from 'lucide-react';
import { RATING_LEVELS } from '../data/mockData';
import { soundManager } from '../utils/sound';

export default function StepRating({ formData, updateField, isDark }) {
  const [hoverRating, setHoverRating] = useState(0);

  const activeRating = formData.rating || 0;
  const displayRating = hoverRating || activeRating;
  const currentRatingMeta = RATING_LEVELS.find(r => r.value === displayRating) || RATING_LEVELS[4];

  const handleSelectRating = (val) => {
    soundManager.playTap(400 + val * 80);
    updateField('rating', val);
  };

  const microMetrics = [
    {
      key: 'speed',
      label: 'Dispense Speed',
      options: ['Ultra Fast (<5s)', 'Normal (8-10s)', 'Sluggish (>15s)']
    },
    {
      key: 'temp',
      label: 'Item Temperature & Freshness',
      options: ['Crisp & Chilled', 'Standard', 'Not cold enough']
    },
    {
      key: 'payment',
      label: 'Tap-to-Pay / Payment Flow',
      options: ['Instant & Frictionless', 'Took a few tries', 'Clunky']
    },
    {
      key: 'cleanliness',
      label: 'Machine & Screen Cleanliness',
      options: ['Spotless & Modern', 'Decent', 'Needs sanitizing']
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide mb-3 bg-amber-400/10 text-amber-500 border border-amber-400/20">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Section 03 • Experience Metric</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
          3. How would you rate your overall experience?
        </h2>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Every vend is calibrated against high expectations. Let us know how smooth the touchpoint felt.
        </p>
      </div>

      {/* Main Luxury 5-Star Hero Rating */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-zinc-900/90 to-zinc-900/40 border-zinc-800/80 shadow-2xl' 
          : 'bg-gradient-to-b from-white to-stone-50 border-stone-200/90 shadow-xl shadow-stone-200/40'
      }`}>
        {/* Active Tier Emotion Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 transition-all duration-300 scale-105"
          style={{
            backgroundColor: displayRating >= 4 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(161, 161, 170, 0.15)',
            color: displayRating >= 4 ? (isDark ? '#fde68a' : '#b45309') : (isDark ? '#d4d4d8' : '#3f3f46'),
            border: displayRating >= 4 ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(161, 161, 170, 0.2)'
          }}
        >
          <span className="text-base">{currentRatingMeta?.emoji}</span>
          <span>{currentRatingMeta?.label}</span>
        </div>

        {/* Tactile Star Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-2">
          {[1, 2, 3, 4, 5].map((starVal) => {
            const isFilled = starVal <= displayRating;
            return (
              <button
                key={starVal}
                type="button"
                onMouseEnter={() => setHoverRating(starVal)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleSelectRating(starVal)}
                className="group relative p-2 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer"
                title={`Rate ${starVal} of 5`}
              >
                <Star
                  className={`w-9 h-9 sm:w-12 sm:h-12 transition-all duration-200 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                      : isDark
                        ? 'text-zinc-700 hover:text-zinc-500 fill-zinc-900/50'
                        : 'text-stone-300 hover:text-stone-400 fill-stone-100'
                  }`}
                />
                <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDark ? 'text-zinc-400' : 'text-stone-500'
                }`}>
                  {starVal}
                </span>
              </button>
            );
          })}
        </div>

        <p className={`text-xs mt-6 transition-all duration-300 ${isDark ? 'text-zinc-400' : 'text-stone-500'}`}>
          {currentRatingMeta?.hint}
        </p>
      </div>

      {/* Micro Dimensions Breakdown */}
      <div className="space-y-4 pt-4 border-t border-zinc-800/60">
        <div className="flex items-center justify-between">
          <label className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
            Fine-tune specific touchpoints (Optional):
          </label>
          <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-stone-400'}`}>
            High-precision feedback
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {microMetrics.map((metric) => {
            const currentSelected = formData.microRatings?.[metric.key];
            return (
              <div 
                key={metric.key} 
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <div className={`text-xs font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  {metric.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {metric.options.map((opt) => {
                    const isOptActive = currentSelected === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          soundManager.playTap(520);
                          updateField('microRatings', {
                            ...(formData.microRatings || {}),
                            [metric.key]: opt
                          });
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isOptActive
                            ? isDark
                              ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                              : 'bg-zinc-900 border-zinc-900 text-white font-semibold'
                            : isDark
                              ? 'bg-zinc-800/40 border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
                              : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impression Notes */}
      <div>
        <label className={`block text-xs uppercase tracking-wider font-semibold mb-2 ${
          isDark ? 'text-zinc-400' : 'text-stone-600'
        }`}>
          Any specific highlights or impressions?
        </label>
        <textarea
          rows={2}
          value={formData.ratingNotes || ''}
          onChange={(e) => updateField('ratingNotes', e.target.value)}
          placeholder="e.g. Loved the instant Apple Pay flow, iced cold matcha was fresh..."
          className={`w-full text-xs sm:text-sm p-3 rounded-xl border focus:outline-none transition-all resize-none ${
            isDark
              ? 'bg-zinc-900/40 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-amber-400'
              : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-zinc-900'
          }`}
        />
      </div>
    </div>
  );
}

