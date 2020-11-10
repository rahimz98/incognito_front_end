import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import SearchPage from '../../components/searchPage';
import { mockResults, mockEmptyResults } from '../../utils/mockData';

describe('Search Page', () => {
  it('renders people and projects tab', () => {
    render(<SearchPage />, {
      initialState: {
        search: {
          results: mockEmptyResults,
        },
      },
    });
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders no results for people and projects by their respective tabs', () => {
    render(<SearchPage />, {
      initialState: {
        search: {
          results: mockEmptyResults,
        },
      },
    });
    const noPeopleResults = screen.getByTestId('peopleNoResults').textContent;
    expect(noPeopleResults).toMatch(
      'No results were found. Try searching something else.'
    );

    fireEvent.click(screen.getByText('Projects'));
    const noProjectResults = screen.getByTestId('projectsNoResults')
      .textContent;
    expect(noProjectResults).toMatch(
      'No results were found. Try searching something else.'
    );
  });

  it('renders search results for people and projects by their respective tabs', () => {
    render(<SearchPage />, {
      initialState: {
        search: {
          results: mockResults,
        },
      },
    });
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('View profile')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Projects'));
    expect(screen.getByText('Project John')).toBeInTheDocument();
    expect(screen.getByText("Johnsmith's project")).toBeInTheDocument();
    expect(screen.getByText('Created on 2020-10-15')).toBeInTheDocument();
    expect(screen.getByText('View project')).toBeInTheDocument();
  });
});
