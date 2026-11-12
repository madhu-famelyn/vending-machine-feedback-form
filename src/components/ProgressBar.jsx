import React from 'react';
import { Check } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function ProgressBar({ currentStep, totalSteps, setStep, isDark, stepsMeta }) {
  const progressPercent = Math.round(((currentStep) / totalSteps) * 100);

  return (
    <div className="w-full mb-8 select-none">
      {/* Top micro metadata */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
            isDark ? 'bg-amber-400/15 text-amber-300' : 'bg-amber-100 text-amber-900'
          }`}>
            STEP {currentStep} OF {totalSteps}
          </span>
          <span className={`font-medium ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
            {stepsMeta[currentStep - 1]?.title}
          </span>
        </div>
        <span className={`font-mono text-[11px] ${isDark ? 'text-zinc-500' : 'text-stone-400'}`}>
          {progressPercent}% completed
        </span>
      </div>

      {/* Progress track */}
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${
        isDark ? 'bg-zinc-800' : 'bg-stone-200'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Step Nodes */}
      <div className="flex items-center justify-between mt-3 px-1">
        {stepsMeta.map((s, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setStep(stepNum);
                soundManager.playTap(440 + stepNum * 40);
              }}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                isCurrent
                  ? isDark
                    ? 'ring-2 ring-amber-400 bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                    : 'ring-2 ring-zinc-900 bg-zinc-900 text-white shadow-md'
                  : isDone
                    ? isDark
                      ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
                      : 'bg-stone-200 text-zinc-800 border border-stone-300'
                    : isDark
                      ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 hover:border-zinc-700'
                      : 'bg-stone-100 text-stone-400 border border-stone-200 hover:border-stone-300'
              }`}>
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
              </div>
              <span className={`text-[10px] tracking-tight mt-1.5 hidden md:block transition-colors ${
                isCurrent 
                  ? isDark ? 'text-amber-300 font-medium' : 'text-zinc-900 font-semibold' 
                  : isDark ? 'text-zinc-500' : 'text-stone-400'
              }`}>
                {s.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

