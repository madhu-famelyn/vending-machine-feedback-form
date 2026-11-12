import React, { useState } from 'react';
import { ShoppingBag, Plus, X, Sparkles, Filter, Check, TrendingUp } from 'lucide-react';
import { WISHLIST_PRESETS, CATEGORIES } from '../data/mockData';
import { soundManager } from '../utils/sound';

export default function StepWishlist({ formData, updateField, isDark }) {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [customInput, setCustomInput] = useState('');

  const selectedItems = formData.desiredItems || [];
  const customItems = formData.customItems || [];

  const handleToggleItem = (itemName) => {
    soundManager.playTap(580);
    if (selectedItems.includes(itemName)) {
      updateField('desiredItems', selectedItems.filter(item => item !== itemName));
    } else {
      updateField('desiredItems', [...selectedItems, itemName]);
    }
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!customItems.includes(trimmed)) {
      soundManager.playTap(720);
      updateField('customItems', [...customItems, trimmed]);
    }
    setCustomInput('');
  };

  const handleRemoveCustom = (itemToRemove) => {
    soundManager.playTap(400);
    updateField('customItems', customItems.filter(item => item !== itemToRemove));
  };

  const filteredPresets = selectedCategory === 'All Items'
    ? WISHLIST_PRESETS
    : WISHLIST_PRESETS.filter(item => item.category === selectedCategory);

  const totalSelectedCount = selectedItems.length + customItems.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide mb-3 bg-amber-400/10 text-amber-500 border border-amber-400/20">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Section 02 • Restock Curation</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
            Which specific items would you like to see in the vending machine?
          </h2>
        </div>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Select from popular member requests below, or type your favorite specific brands, healthy bites, or beverages.
        </p>
      </div>

      {/* Selected Counter Pill */}
      <div className={`flex items-center justify-between p-3.5 rounded-xl border ${
        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span className={`text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-stone-700'}`}>
            Your curated restock list
          </span>
        </div>
        <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${
          totalSelectedCount > 0 
            ? 'bg-amber-400 text-zinc-950 font-bold' 
            : isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-stone-200 text-stone-600'
        }`}>
          {totalSelectedCount} {totalSelectedCount === 1 ? 'item selected' : 'items selected'}
        </span>
      </div>

      {/* Custom Tag Badges if any */}
      {customItems.length > 0 && (
        <div className="space-y-2">
          <span className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? 'text-zinc-400' : 'text-stone-500'}`}>
            Custom Requests by You:
          </span>
          <div className="flex flex-wrap gap-2">
            {customItems.map((custom) => (
              <span
                key={custom}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all ${
                  isDark
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-zinc-900 text-white'
                }`}
              >
                <span>✨ {custom}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCustom(custom)}
                  className="hover:opacity-75 focus:outline-none"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  soundManager.playTap(600);
                }}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                      : 'bg-zinc-900 text-white font-semibold'
                    : isDark
                      ? 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Preset Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredPresets.map((item) => {
            const isSelected = selectedItems.includes(item.name);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleItem(item.name)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-400/10 border-amber-400 text-amber-200 ring-1 ring-amber-400/40 shadow-sm'
                      : 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                    : isDark
                      ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50/70 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-medium truncate">{item.name}</div>
                    <div className={`text-[10px] mt-0.5 ${
                      isSelected
                        ? isDark ? 'text-amber-300/80' : 'text-zinc-300'
                        : isDark ? 'text-zinc-500' : 'text-stone-400'
                    }`}>
                      {item.votes} members requested
                    </div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ml-2 border transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-400 border-amber-400 text-zinc-950'
                      : 'bg-white border-white text-zinc-900'
                    : isDark
                      ? 'border-zinc-700 group-hover:border-zinc-500'
                      : 'border-stone-300 group-hover:border-stone-400'
                }`}>
                  {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Propose a Specific Item or Brand Input */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${
        isDark ? 'bg-zinc-900/50 border-zinc-800/90' : 'bg-stone-50 border-stone-200'
      }`}>
        <label className={`block text-xs uppercase tracking-wider font-semibold mb-2 ${
          isDark ? 'text-zinc-300' : 'text-stone-700'
        }`}>
          Propose an item not listed above:
        </label>
        <form onSubmit={handleAddCustom} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. Poppi Strawberry Lemon, Quest Salted Caramel bar, Fiji Water..."
            className={`flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none transition-all ${
              isDark
                ? 'bg-zinc-950 border-zinc-700/80 text-zinc-100 placeholder-zinc-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'
            }`}
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </form>
        <p className={`text-[11px] mt-2 ${isDark ? 'text-zinc-500' : 'text-stone-500'}`}>
          Tip: You can add specific dietary preferences like "Sugar-free", "Keto", "High-caffeine", or specific flavors.
        </p>
      </div>

      {/* Additional specific note for items */}
      <div>
        <label className={`block text-xs uppercase tracking-wider font-semibold mb-2 ${
          isDark ? 'text-zinc-400' : 'text-stone-600'
        }`}>
          Dietary restrictions or flavor notes (Optional):
        </label>
        <textarea
          rows={2}
          value={formData.itemNotes || ''}
          onChange={(e) => updateField('itemNotes', e.target.value)}
          placeholder="e.g. Please stock more non-dairy milk options or gluten-free savory snacks..."
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

