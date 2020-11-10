import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import CreateProject from '../../components/createProject';

describe('Create Project', () => {
  it('renders title and subtitles for create steps', () => {
    render(<CreateProject />);
    expect(screen.getByText(/let's create a project/i)).toBeInTheDocument();
    expect(screen.getByText(/project name/i)).toBeInTheDocument();
    expect(screen.getByText(/project visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/project description/i)).toBeInTheDocument();
  });
});
