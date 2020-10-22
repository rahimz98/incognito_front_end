import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Snackbar from '../../snackbar';
import { render, screen, act } from '../../testUtils';

jest.useFakeTimers();

describe('Snackbar', () => {
  it('renders success snackbar correctly', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'success',
          text: 'Success snackbar',
        },
      },
    });
    expect(screen.getAllByText('Success snackbar')[0]).toBeInTheDocument();
  });

  it('renders info snackbar correctly', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'info',
          text: 'Info snackbar',
        },
      },
    });
    expect(screen.getAllByText('Info snackbar')[0]).toBeInTheDocument();
  });

  it('renders warning snackbar correctly', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'warning',
          text: 'Warning snackbar',
        },
      },
    });
    expect(screen.getAllByText('Warning snackbar')[0]).toBeInTheDocument();
  });

  it('renders error snackbar correctly', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'error',
          text: 'Error snackbar',
        },
      },
    });
    expect(screen.getAllByText('Error snackbar')[0]).toBeInTheDocument();
  });

  it('snackbar disappears after a certain time', () => {
    render(<Snackbar />, {
      initialState: {
        snackbar: {
          open: true,
          type: 'error',
          text: 'Error snackbar',
        },
      },
    });
    expect(screen.getAllByText('Error snackbar')[0]).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(5000));
    expect(screen.queryByText('Error snackbar')).toBeNull();
  });
});
