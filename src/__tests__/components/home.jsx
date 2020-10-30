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
      screen.getByText(
        'Start uploading your projects so you can show it to the public with a professional manner. Have control on how your project will look like and show the world what your really capable of!'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/look up your colleague's profile/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Search up your friends, associates or colleagues and be able to see their profile, resume and alongside their projects and all the hardwork they have accomplished over the years!'
      )
    ).toBeInTheDocument();
  });
});
