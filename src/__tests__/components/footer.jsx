import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../testProps/testUtils';
import Footer from '../../footer';

describe('Footer', () => {
  it('renders footer components', () => {
    render(<Footer />);

    const displayedImage = document.querySelectorAll('img');
    expect(displayedImage[0].src).toContain('unimelb_logo');
    expect(displayedImage[1].src).toContain('githubLogo');

    expect(screen.getByText(/memento.com/i)).toBeInTheDocument();
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
