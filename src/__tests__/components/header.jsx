import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import Header from '../../components/header';
import { mockDrawerProjects } from '../../utils/mockData';
import mockAxios from 'axios';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

describe('Header', () => {
  it('renders all expected components correctly for logged out users', () => {
    render(<Header />, {
      initialState: {
        user: {
          isAuth: false,
        },
      },
    });
    // Drawer
    expect(
      screen.getByText('Log in to view your projects ^_^')
    ).toBeInTheDocument();

    // Logo
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('logoName');

    // Search
    expect(screen.getByPlaceholderText('Search Memento')).toBeInTheDocument();

    // Buttons
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();

    // Dark mode
    expect(screen.getByTestId('darkModeSwitch')).toBeInTheDocument();

    // Options dropdown
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Dark theme')).toBeInTheDocument();
  });

  it('renders all expected components correctly for logged in users', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: mockDrawerProjects,
    });
    render(<Header />, {
      initialState: {
        user: {
          isAuth: true,
        },
      },
    });
    fireEvent.click(screen.getByTestId('drawer'));
    await screen.findByText('Project John');

    // Drawer
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Project John')).toBeInTheDocument();
    expect(screen.getByText('Project John Second')).toBeInTheDocument();
    expect(screen.getByText('Create Project')).toBeInTheDocument();

    // Logo
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('logoName');

    // Search
    expect(screen.getByPlaceholderText('Search Memento')).toBeInTheDocument();

    // Buttons
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Dark mode
    expect(screen.getByTestId('darkModeSwitch')).toBeInTheDocument();

    // Options dropdown
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Dark theme')).toBeInTheDocument();
  });
});
