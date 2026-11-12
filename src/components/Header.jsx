import React from 'react';
import { Volume2, VolumeX, Sparkles, LayoutList, Layers, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function Header({ 
  theme, 
  setTheme, 
  viewMode, 
  setViewMode, 
  soundEnabled, 
  setSoundEnabled,
  currentLocation,
  isSubmitted
}) {
  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const isDark = theme === 'dark';

  return (
    <header className={`w-full border-b transition-colors duration-300 ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/70' : 'border-stone-200 bg-white/80'
    } backdrop-blur-xl sticky top-0 z-50`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-tighter shadow-md ${
            isDark 
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 shadow-amber-500/10' 
              : 'bg-zinc-900 text-white'
          }`}>
            AV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                AURA VEND
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                isDark ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20' : 'bg-stone-100 text-stone-700 border border-stone-200'
              }`}>
                Precision Retail
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{currentLocation.code} • {currentLocation.name.split('•')[0]}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* View mode toggle */}
          {!isSubmitted && (
            <div className={`hidden sm:flex items-center p-0.5 rounded-lg border ${
              isDark ? 'border-zinc-800 bg-zinc-900/80' : 'border-stone-200 bg-stone-100'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setViewMode('step');
                  soundManager.playTap(520);
                }}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                  viewMode === 'step'
                    ? isDark 
                      ? 'bg-zinc-800 text-amber-300 shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm'
                    : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-stone-500 hover:text-zinc-900'
                }`}
                title="Guided Step-by-Step Experience"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Guided</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('full');
                  soundManager.playTap(520);
                }}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                  viewMode === 'full'
                    ? isDark 
                      ? 'bg-zinc-800 text-amber-300 shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm'
                    : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-stone-500 hover:text-zinc-900'
                }`}
                title="View All Questions on One Sheet"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
            </div>
          )}

          {/* Sound FX Button */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center justify-center ${
              isDark
                ? soundEnabled
                  ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                : soundEnabled
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-zinc-900'
            }`}
            title={soundEnabled ? 'Mute micro-interactions' : 'Enable tactile audio chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = isDark ? 'light' : 'dark';
              setTheme(next);
              soundManager.playTap(640);
            }}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:text-zinc-950'
            }`}
            title={`Switch to ${isDark ? 'Studio Light' : 'Obsidian Dark'} mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
}

