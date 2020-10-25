import React from 'react';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../testProps/testUtils';
import Project from '../../projects';
import { mockProject } from '../../testProps/mockData';
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
    expect(screen.getByText('link')).toBeInTheDocument();
    expect(screen.getByText(/project owner/i)).toBeInTheDocument();
    expect(screen.getByText('Creation : 2020-10-25')).toBeInTheDocument();
    expect(screen.getByText(/collaborators/i)).toBeInTheDocument();
    const collabs = screen.getByText(/collaborators/i);
    fireEvent.mouseOver(collabs);
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('project content')).toBeInTheDocument();
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
    expect(screen.getByText('project john reflections')).toBeInTheDocument();
    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('johnsmith.com')).toBeInTheDocument();
    // test sharing icons

    expect(screen.getByText(/edit project/i)).toBeInTheDocument();
  });
});
