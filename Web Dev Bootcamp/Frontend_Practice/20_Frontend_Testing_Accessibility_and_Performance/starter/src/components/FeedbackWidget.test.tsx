import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FeedbackWidget } from './FeedbackWidget';

describe('FeedbackWidget', () => {
  it('disables submit button initially when no rating is selected', () => {
    render(<FeedbackWidget />);
    const submitBtn = screen.getByRole('button', { name: /submit feedback/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button after selecting a star rating', async () => {
    const user = userEvent.setup();
    render(<FeedbackWidget />);

    // TODO: Click on the '4 stars' button using user.click
    // Verify that the submit button becomes enabled
  });

  it('displays thank you confirmation on submission', async () => {
    const user = userEvent.setup();
    render(<FeedbackWidget />);

    // TODO: Select rating, type comment, click submit
    // Verify that 'Thank you for your feedback!' appears in the document
  });
});
