import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {!submitted ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Rate Your Experience
              </h1>

              <div className="flex justify-center mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-2"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hover || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Feedback
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <ThumbsUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Thank You for Your Feedback!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your feedback helps us improve our service for everyone.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateUs;