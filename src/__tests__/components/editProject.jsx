import React from 'react';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../testProps/testUtils';
import EditProject from '../../editProject';
import { mockEditProject } from '../../testProps/mockData';
import mockAxios from 'axios';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
// To avoid testing errors from react-quill
document.getSelection = () => {
  return {
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => {},
  };
};

describe('Edit Project', () => {
  beforeEach(async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: mockEditProject,
    });
    render(
      <Route exact path='/:id/:projectid/edit' component={EditProject} />,
      {
        route: '/0/MIrxBOa3tPEl3NyrqD/edit',
      }
    );
    await screen.findByText('Edit Project');
  });

  it('renders edit project', async () => {
    expect(screen.getByText(/project details/i)).toBeInTheDocument();
    expect(screen.getByText(/project name/i)).toBeInTheDocument();
    expect(screen.getByText(/project description/i)).toBeInTheDocument();
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
    expect(screen.getByText('project john reflections')).toBeInTheDocument();
    expect(screen.getAllByText(/visibility/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/collaborators/i)).toBeInTheDocument();
    expect(screen.getByText(/links/i)).toBeInTheDocument();
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText('project content')).toBeInTheDocument();

    // Add and remove buttons for collaborators and links
    const addButtons = screen.getAllByText('+');
    expect(addButtons).toHaveLength(2);
    const removeButtons = screen.getAllByText('-');
    expect(removeButtons).toHaveLength(2);

    // Buttons
    expect(screen.getByText(/delete project/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('delete project requires confirmation', () => {
    fireEvent.click(screen.getByText(/delete project/i));
    expect(screen.getByText('Delete This Project')).toBeInTheDocument();
    expect(screen.getByText('Disagree')).toBeInTheDocument();
    expect(screen.getByText('Agree')).toBeInTheDocument();
  });
});
