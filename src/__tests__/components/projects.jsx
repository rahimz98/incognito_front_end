import React from 'react';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import Project from '../../components/project/projects';
import { mockProject } from '../../utils/mockData';
import mockAxios from 'axios';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

describe('Project', () => {
  it('renders project', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: mockProject,
    });
    render(<Route exact path='/:id/:projectid' component={Project} />, {
      route: '/0/MIrxBOa3tPEl3NyrqD',
    });
    await screen.findByText('Project John');

    screen.debug(null, 20000);
    expect(screen.getByText('Project John')).toBeInTheDocument();
    expect(screen.getByText('project john description')).toBeInTheDocument();
    expect(screen.getByText('Visit Profile')).toBeInTheDocument();

    expect(screen.getByText('Creation : 2020-10-25')).toBeInTheDocument();
    expect(screen.getByText(/collaborators/i)).toBeInTheDocument();
    const collabs = screen.getByText(/collaborators/i);
    fireEvent.click(collabs);
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();

    expect(screen.getByText('project content')).toBeInTheDocument();

    expect(screen.getByText(/blog/i)).toBeInTheDocument();
    expect(screen.getByText('project john reflections')).toBeInTheDocument();

    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('johnsmith.com')).toBeInTheDocument();

    expect(screen.getByLabelText('facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('linkedin')).toBeInTheDocument();

    expect(screen.getByText(/edit project/i)).toBeInTheDocument();
  });
});
