import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../testProps/testUtils';
import CreateProject from '../../createProject';

describe('Create Project', () => {
  it('renders title and subtitles for create steps', () => {
    render(<CreateProject />);
    expect(screen.getByText(/let's create a project/i)).toBeInTheDocument();
    expect(screen.getByText(/project name/i)).toBeInTheDocument();
    expect(screen.getByText(/project visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/project description/i)).toBeInTheDocument();
  });

  // it('renders input for each step with correct buttons', () => {
  //   const projectName = screen.getByText(/name of project/i);
  //   expect(projectName).toBeInTheDocument();
  //   fireEvent.change(projectName, { target: { value: 'Project John' } });

  //   expect(screen.getByText(/next/i)).toBeInTheDocument();
  //   fireEvent.click(screen.getByText(/next/i));
  // });

  // it('renders select for project visibility section with back and next buttons', async () => {
  //   fireEvent.click(screen.getByText('Next'));

  //   screen.debug(null, 20000);
  //   fireEvent.click(screen.getByText(/next/i));
  //   screen.debug(null, 20000);
  // });

  // it('renders input for project description section with back and submit buttons', () => {
  //   fireEvent.click(screen.getByText(/next/i));
  //   fireEvent.click(screen.getByText(/next/i));
  //   screen.debug(null, 20000);
  // });
});
