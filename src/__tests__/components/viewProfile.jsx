import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../testProps/testUtils';
import ViewProfile from '../../viewProfile';
import { mockViewUser } from '../../testProps/mockData';
import mockAxios from 'axios';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

describe('View Profile', () => {
  beforeEach(async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: mockViewUser,
    });
    render(<ViewProfile />);
    await screen.findByText('John Smith');
  });

  it('renders basic information of user', () => {
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+61 123 123 123')).toBeInTheDocument();
    expect(screen.getByText('View resume/CV')).toBeInTheDocument();
  });

  it('renders profile page with about and projects tab', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders about information of user', () => {
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('johnsmiths bio')).toBeInTheDocument();

    expect(screen.getByText('Experience')).toBeInTheDocument();
    const exp = screen.getAllByTestId('expCard').map((e) => e.textContent);
    const mockExp = mockViewUser.experience.map(
      (e) => e.title + e.start_date + ' to ' + e.end_date + e.description
    );
    expect(exp).toEqual(mockExp);

    expect(screen.getByText('Education')).toBeInTheDocument();
    const edu = screen.getAllByTestId('eduCard').map((e) => e.textContent);
    const mockEdu = mockViewUser.education.map(
      (e) => e.title + e.start_date + ' to ' + e.end_date + e.description
    );
    expect(edu).toEqual(mockEdu);

    expect(screen.getByText('Achievements')).toBeInTheDocument();
    const achv = screen.getAllByTestId('achvCard').map((e) => e.textContent);
    const mockAchv = mockViewUser.achievements.map(
      (e) => e.title + e.description
    );
    expect(achv).toEqual(mockAchv);
  });

  it('renders projects of user when projects tab is clicked', () => {
    fireEvent.click(screen.getByText('Projects'));

    expect(screen.getByText('Project John')).toBeInTheDocument();
    expect(screen.getByText('Project John Second')).toBeInTheDocument();
    const view = screen.getAllByText('View project');
    expect(view).toHaveLength(2);
  });
});
