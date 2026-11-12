import React, { useState } from 'react';
import { Star, Check, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

const POPULAR_SUGGESTIONS = [
  'Cold Brew Coffee',
  'Protein Bars',
  'Coconut Water',
  'Dark Chocolate',
  'Kombucha',
  'Gluten-Free Snacks',
  'Energy Drinks',
  'Fresh Fruit / Nuts',
];

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export default function App() {
  const [formData, setFormData] = useState({
    location: '',
    itemsWanted: '',
    rating: 0,
    hasIssues: null, // 'no' | 'yes' | null
    issueDetails: '',
    email: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuggestionClick = (item) => {
    const current = formData.itemsWanted.trim();
    if (!current) {
      setFormData(prev => ({ ...prev, itemsWanted: item }));
    } else if (!current.toLowerCase().includes(item.toLowerCase())) {
      setFormData(prev => ({ ...prev, itemsWanted: `${current}, ${item}` }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.itemsWanted.trim()) {
      errs.itemsWanted = 'Please mention at least one item or snack you would like to see.';
    }
    if (!formData.rating) {
      errs.rating = 'Please select a rating.';
    }
    if (formData.hasIssues === null) {
      errs.hasIssues = 'Please indicate if you faced any issues.';
    } else if (formData.hasIssues === 'yes' && !formData.issueDetails.trim()) {
      errs.issueDetails = 'Please briefly describe what happened.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      _subject: `New Vending Machine Feedback (${formData.location || 'General'})`,
      _template: 'table',
      _captcha: 'false',
      'Machine Location': formData.location || 'Not specified',
      'Items Wanted in Vending Machine': formData.itemsWanted,
      'Overall Experience Rating': `${formData.rating} / 5 Stars (${RATING_LABELS[formData.rating]})`,
      'Did You Face Any Issues?': formData.hasIssues === 'yes' 
        ? `Yes: ${formData.issueDetails}` 
        : 'No, everything was smooth',
      'User Email (Optional)': formData.email || 'Anonymous (No email provided)',
      'Submitted At': new Date().toLocaleString(),
    };

    try {
      await fetch('https://formsubmit.co/ajax/69b8b301d16b98ef16c83b1c27e063a5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Submission notification error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setFormData({
      location: '',
      itemsWanted: '',
      rating: 0,
      hasIssues: null,
      issueDetails: '',
      email: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3.5 sm:px-6 flex flex-col justify-center items-center w-full overflow-x-hidden">
      
      {/* Container */}
      <div className="w-full max-w-xl mx-auto">
        
        {/* Separate Header above the card */}
        {!isSubmitted && (
          <div className="mb-4 sm:mb-6 text-center sm:text-left px-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Vending Machine Feedback Form
            </h1>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Please share your feedback so we can stock your favorite items and improve our service.
            </p>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 w-full">
          
          {isSubmitted ? (
            /* Success confirmation */
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Thank you for your feedback!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed px-2">
                Your response has been recorded. Our team will review your requests for the next restock cycle.
              </p>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors touch-manipulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit another response</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

              {/* Optional Location */}
              <div>
                <label 
                  htmlFor="location" 
                  className="block text-xs sm:text-sm font-medium text-slate-800 mb-1.5"
                >
                  Machine location <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. 2nd Floor Breakroom, Main Lobby, Gym"
                  className="w-full text-base sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                />
              </div>

              {/* Question 1: Specific Items */}
              <div>
                <label 
                  htmlFor="itemsWanted" 
                  className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1 leading-snug"
                >
                  Which specific items would you like to see in the vending machine?
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <p className="text-[11px] sm:text-xs text-slate-500 mb-2">
                  Name any drinks, healthy snacks, brands, or fresh items you wish we had.
                </p>

                <textarea
                  id="itemsWanted"
                  rows={3}
                  value={formData.itemsWanted}
                  onChange={(e) => {
                    setFormData({ ...formData, itemsWanted: e.target.value });
                    if (errors.itemsWanted) setErrors({ ...errors, itemsWanted: null });
                  }}
                  placeholder="e.g. Celsius energy drinks, Kind protein bars, unsweetened iced tea..."
                  className={`w-full text-base sm:text-sm p-3 rounded-lg border text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.itemsWanted
                      ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:ring-slate-900/10 focus:border-slate-800'
                  }`}
                />
                
                {errors.itemsWanted && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.itemsWanted}</span>
                  </p>
                )}

                {/* Clean suggestion pills */}
                <div className="mt-2.5">
                  <span className="text-[11px] text-slate-400 block mb-1.5">
                    Quick suggestions (tap to add):
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {POPULAR_SUGGESTIONS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        className="text-[11px] sm:text-xs px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200 transition-colors touch-manipulation"
                      >
                        + {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question 2: Overall Rating */}
              <div className="pt-1">
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1 leading-snug">
                  How would you rate your overall experience?
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <p className="text-[11px] sm:text-xs text-slate-500 mb-2.5">
                  Rate the speed, item freshness, and payment process.
                </p>

                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isFilled = val <= (hoverRating || formData.rating);
                    return (
                      <button
                        key={val}
                        type="button"
                        onMouseEnter={() => setHoverRating(val)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setFormData({ ...formData, rating: val });
                          if (errors.rating) setErrors({ ...errors, rating: null });
                        }}
                        className="p-2 sm:p-1.5 focus:outline-none transition-transform active:scale-90 touch-manipulation"
                        title={`${val} out of 5 stars`}
                      >
                        <Star
                          className={`w-8 h-8 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-transparent text-slate-300 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}

                  {(hoverRating || formData.rating) > 0 && (
                    <span className="ml-2 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {RATING_LABELS[hoverRating || formData.rating]}
                    </span>
                  )}
                </div>

                {errors.rating && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.rating}</span>
                  </p>
                )}
              </div>

              {/* Question 3: Issues */}
              <div className="pt-1">
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1 leading-snug">
                  Did you face any issues while using the vending machine?
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <p className="text-[11px] sm:text-xs text-slate-500 mb-2.5">
                  Let us know if anything got stuck, failed to scan, or malfunctioned.
                </p>

                {/* Stack on mobile, side-by-side on sm screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <label className={`flex items-center gap-3 p-3.5 sm:p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all touch-manipulation ${
                    formData.hasIssues === 'no'
                      ? 'border-slate-900 bg-slate-900/5 text-slate-900 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="hasIssues"
                      value="no"
                      checked={formData.hasIssues === 'no'}
                      onChange={() => {
                        setFormData({ ...formData, hasIssues: 'no', issueDetails: '' });
                        if (errors.hasIssues) setErrors({ ...errors, hasIssues: null, issueDetails: null });
                      }}
                      className="accent-slate-900 w-4 h-4 cursor-pointer"
                    />
                    <span>No, it was smooth</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3.5 sm:p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all touch-manipulation ${
                    formData.hasIssues === 'yes'
                      ? 'border-slate-900 bg-slate-900/5 text-slate-900 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="hasIssues"
                      value="yes"
                      checked={formData.hasIssues === 'yes'}
                      onChange={() => {
                        setFormData({ ...formData, hasIssues: 'yes' });
                        if (errors.hasIssues) setErrors({ ...errors, hasIssues: null });
                      }}
                      className="accent-slate-900 w-4 h-4 cursor-pointer"
                    />
                    <span>Yes, I had an issue</span>
                  </label>
                </div>

                {errors.hasIssues && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.hasIssues}</span>
                  </p>
                )}

                {/* Conditional details input if 'yes' */}
                {formData.hasIssues === 'yes' && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <label 
                      htmlFor="issueDetails" 
                      className="block text-xs font-medium text-slate-800 mb-1"
                    >
                      Please describe what happened:
                      <span className="text-rose-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="issueDetails"
                      rows={2}
                      value={formData.issueDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, issueDetails: e.target.value });
                        if (errors.issueDetails) setErrors({ ...errors, issueDetails: null });
                      }}
                      placeholder="e.g. Item stuck on coil C3, card reader declined twice, beverage wasn't cold..."
                      className={`w-full text-base sm:text-sm p-3 rounded-lg border text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.issueDetails
                          ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-slate-900/10 focus:border-slate-800'
                      }`}
                    />
                    {errors.issueDetails && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.issueDetails}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Optional Contact for follow-up */}
              <div className="pt-1">
                <label 
                  htmlFor="email" 
                  className="block text-xs sm:text-sm font-medium text-slate-800 mb-1 leading-snug"
                >
                  Email address <span className="text-slate-400 font-normal">(optional, if you'd like a response or refund)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-base sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl text-base sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm touch-manipulation cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Subtle Footer */}
        <p className="mt-4 sm:mt-6 text-center text-xs text-slate-400 px-2">
          Your feedback goes directly to our local restocking & maintenance team.
        </p>

      </div>

    </div>
  );
}
