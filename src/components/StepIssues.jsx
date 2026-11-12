import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Package, 
  CreditCard, 
  Thermometer, 
  Smartphone, 
  Receipt,
  HelpCircle,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { ISSUE_CATEGORIES } from '../data/mockData';
import { soundManager } from '../utils/sound';

export default function StepIssues({ formData, updateField, isDark }) {
  const hasIssue = formData.facedIssues; // boolean or null
  const selectedIssueTypes = formData.issueTypes || [];

  const handleToggleFacedIssues = (val) => {
    soundManager.playTap(val ? 380 : 700);
    updateField('facedIssues', val);
    if (!val) {
      updateField('issueTypes', []);
    }
  };

  const handleToggleIssueType = (issueId) => {
    soundManager.playTap(480);
    if (selectedIssueTypes.includes(issueId)) {
      updateField('issueTypes', selectedIssueTypes.filter(id => id !== issueId));
    } else {
      updateField('issueTypes', [...selectedIssueTypes, issueId]);
    }
  };

  const getIssueIcon = (iconName) => {
    switch (iconName) {
      case 'Box': return <Package className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      case 'Thermometer': return <Thermometer className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Receipt': return <Receipt className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide mb-3 bg-amber-400/10 text-amber-500 border border-amber-400/20">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Section 04 • Hardware & Reliability</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
          4. Did you face any issues while using the vending machine?
        </h2>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Our hardware health monitoring system cross-checks user reports with sensor logs to dispatch field engineers automatically.
        </p>
      </div>

      {/* Primary Binary Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* NO ISSUES CARD */}
        <button
          type="button"
          onClick={() => handleToggleFacedIssues(false)}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            hasIssue === false
              ? isDark
                ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-900/10'
                : 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600 shadow-md'
              : isDark
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/70 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                hasIssue === false
                  ? 'bg-emerald-500 text-zinc-950'
                  : isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  No, completely smooth
                </h3>
                <p className={`text-xs mt-0.5 ${
                  hasIssue === false 
                    ? isDark ? 'text-emerald-300/80' : 'text-emerald-700'
                    : isDark ? 'text-zinc-400' : 'text-stone-500'
                }`}>
                  Dispensed seamlessly & effortlessly
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              hasIssue === false
                ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                : isDark ? 'border-zinc-700' : 'border-stone-300'
            }`}>
              {hasIssue === false && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
            </div>
          </div>
        </button>

        {/* YES ISSUES CARD */}
        <button
          type="button"
          onClick={() => handleToggleFacedIssues(true)}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            hasIssue === true
              ? isDark
                ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/50 shadow-lg shadow-amber-900/10'
                : 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 shadow-md'
              : isDark
                ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/70 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                hasIssue === true
                  ? 'bg-amber-500 text-zinc-950'
                  : isDark ? 'bg-zinc-800 text-amber-400' : 'bg-amber-100 text-amber-700'
              }`}>
                <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  Yes, I encountered an issue
                </h3>
                <p className={`text-xs mt-0.5 ${
                  hasIssue === true 
                    ? isDark ? 'text-amber-300/80' : 'text-amber-700'
                    : isDark ? 'text-zinc-400' : 'text-stone-500'
                }`}>
                  Item jam, billing, or hardware hiccup
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              hasIssue === true
                ? 'border-amber-500 bg-amber-500 text-zinc-950'
                : isDark ? 'border-zinc-700' : 'border-stone-300'
            }`}>
              {hasIssue === true && <div className="w-2 h-2 rounded-full bg-zinc-950" />}
            </div>
          </div>
        </button>
      </div>

      {/* Conditionally Expanded Diagnostic Panel */}
      {hasIssue === true && (
        <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 animate-slideDown ${
          isDark ? 'bg-zinc-900/70 border-zinc-800' : 'bg-stone-50/90 border-stone-200'
        }`}>
          <div>
            <label className={`block text-xs uppercase tracking-wider font-semibold mb-3 ${
              isDark ? 'text-zinc-300' : 'text-stone-700'
            }`}>
              What specifically went wrong? (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ISSUE_CATEGORIES.map((cat) => {
                const isSelected = selectedIssueTypes.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleToggleIssueType(cat.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-amber-400/15 border-amber-400 text-amber-200 font-medium'
                          : 'bg-zinc-900 border-zinc-900 text-white font-medium'
                        : isDark
                          ? 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className={isSelected ? (isDark ? 'text-amber-400' : 'text-amber-400') : 'text-zinc-400'}>
                      {getIssueIcon(cat.icon)}
                    </span>
                    <span className="flex-1 leading-snug">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slot code and details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={`block text-[11px] uppercase tracking-wider font-semibold mb-1.5 ${
                isDark ? 'text-zinc-400' : 'text-stone-600'
              }`}>
                Tray / Slot (e.g. C3, D5)
              </label>
              <input
                type="text"
                value={formData.issueSlot || ''}
                onChange={(e) => updateField('issueSlot', e.target.value)}
                placeholder="Optional slot #"
                className={`w-full text-xs p-2.5 rounded-xl border focus:outline-none font-mono ${
                  isDark
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-amber-400'
                    : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-zinc-900'
                }`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={`block text-[11px] uppercase tracking-wider font-semibold mb-1.5 ${
                isDark ? 'text-zinc-400' : 'text-stone-600'
              }`}>
                Brief Incident Description
              </label>
              <input
                type="text"
                value={formData.issueDetails || ''}
                onChange={(e) => updateField('issueDetails', e.target.value)}
                placeholder="e.g. Coil spun twice but snack stayed caught on ledge"
                className={`w-full text-xs p-2.5 rounded-xl border focus:outline-none ${
                  isDark
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-amber-400'
                    : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-zinc-900'
                }`}
              />
            </div>
          </div>

          {/* Refund Resolution Opt-In */}
          <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
            isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-stone-200'
          }`}>
            <input
              type="checkbox"
              id="refundCheck"
              checked={formData.requestRefund || false}
              onChange={(e) => updateField('requestRefund', e.target.checked)}
              className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
            <label htmlFor="refundCheck" className="text-xs cursor-pointer select-none">
              <span className={`font-semibold block ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                Issue an automated vending credit or refund
              </span>
              <span className={`block mt-0.5 ${isDark ? 'text-zinc-400' : 'text-stone-500'}`}>
                Our support bot will automatically email you a 100% refund code or free vend token.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Optional Contact / Reward Section */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-zinc-900/30 border-zinc-800/80' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-amber-400" />
          <label className={`text-xs uppercase tracking-wider font-semibold ${
            isDark ? 'text-zinc-300' : 'text-stone-700'
          }`}>
            Optional Contact for 15% Reward Token / Resolution
          </label>
        </div>
        <p className={`text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-stone-500'}`}>
          Leave your work email or phone to receive your restock notification and a 15% off coupon for your next vend.
        </p>
        <input
          type="email"
          value={formData.userContact || ''}
          onChange={(e) => updateField('userContact', e.target.value)}
          placeholder="your.name@company.com (optional)"
          className={`w-full text-xs sm:text-sm p-3 rounded-xl border focus:outline-none transition-all ${
            isDark
              ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-amber-400'
              : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-zinc-900'
          }`}
        />
      </div>
    </div>
  );
}

