import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../utils/testUtils';
import NotFound from '../../components/notFound/notFound';

describe('Not Found', () => {
  it('renders 404 page with home button', () => {
    render(<NotFound />);
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('error404Image');

    expect(screen.getByText(/error - page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
