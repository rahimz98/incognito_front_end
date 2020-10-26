import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../testProps/testUtils';
import Home from '../../home';

describe('Home', () => {
  it('renders home page', () => {
    render(<Home />);

    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('logo');

    expect(screen.getByText(/upload your projects/i)).toBeInTheDocument();
    expect(
      screen.getByText(/look up your colleague's projects/i)
    ).toBeInTheDocument();
  });
});
