import React from 'react';
import { render } from '@testing-library/react';

import App from '../app';

describe('App', () => {
  it('renders app component', () => {
    render(<App />);
  });
});
