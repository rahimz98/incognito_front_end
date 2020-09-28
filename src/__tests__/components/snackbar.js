import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Snackbar from '../../snackbar';
import { render, screen } from '../../testUtils';

describe('Snackbar', () => {
  it('renders success snackbar', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'success',
          text: 'Success snackbar',
        },
      },
    });
    expect(screen.getByText('Success snackbar')).toBeInTheDocument();
  });
  it('renders info snackbar', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'info',
          text: 'Info snackbar',
        },
      },
    });
    expect(screen.getByText('Info snackbar')).toBeInTheDocument();
  });
  it('renders warning snackbar', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'warning',
          text: 'Warning snackbar',
        },
      },
    });
    expect(screen.getByText('Warning snackbar')).toBeInTheDocument();
  });
  it('renders error snackbar', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'error',
          text: 'Error snackbar',
        },
      },
    });
    expect(screen.getByText('Error snackbar')).toBeInTheDocument();
  });
});
