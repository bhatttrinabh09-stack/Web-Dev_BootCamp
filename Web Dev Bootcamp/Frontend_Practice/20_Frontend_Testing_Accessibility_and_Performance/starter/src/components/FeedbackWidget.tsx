import React, { useState } from 'react';

export function FeedbackWidget() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div role="status">
        <h2>Thank you for your feedback!</h2>
        <p>Your rating: {rating} stars</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave Feedback</h2>
      <div>
        <span>Rate your experience: </span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => setRating(star)}
            style={{ fontWeight: rating === star ? 'bold' : 'normal', margin: '0 4px' }}
          >
            ★ {star}
          </button>
        ))}
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="feedback-comment">Comments (optional): </label>
        <textarea
          id="feedback-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit" disabled={rating === null}>
        Submit Feedback
      </button>
    </form>
  );
}
