import React from 'react';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import Profile from '../../components/profile';
import {
  mockUserProfile,
  mockEmptyUserProfile,
} from '../../utils/mockData';

describe('Profile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'mockToken'),
      },
      writable: true,
    });
  });

  it('renders profile page with filled sections', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockUserProfile,
          image: 'mockImage.jpg',
          resume: 'https://www.resume.com/',
        },
      },
      route: '/0',
    });
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+61 123 123 123')).toBeInTheDocument();
    expect(screen.getByText('View resume/CV')).toBeInTheDocument();

    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('johnsmiths bio')).toBeInTheDocument();

    expect(screen.getByText('Experience')).toBeInTheDocument();
    const exp = screen.getAllByTestId('expCard').map((e) => e.textContent);

    const mockExp = mockUserProfile.experience.map(
      (e) => e.title + e.start_date + ' to ' + e.end_date + e.description
    );
    expect(exp).toEqual(mockExp);
    expect(screen.getByText('Education')).toBeInTheDocument();
    const edu = screen.getAllByTestId('eduCard').map((e) => e.textContent);

    const mockEdu = mockUserProfile.education.map(
      (e) => e.title + e.start_date + ' to ' + e.end_date + e.description
    );
    expect(edu).toEqual(mockEdu);
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    const achv = screen.getAllByTestId('achvCard').map((e) => e.textContent);

    const mockAchv = mockUserProfile.achievements.map(
      (e) => e.title + e.description
    );
    expect(achv).toEqual(mockAchv);
  });

  it('render empty sections with new user', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockEmptyUserProfile,
          image: 'mockImage.jpg',
          resume: '',
        },
      },
      route: '/0',
    });
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('johnsmith@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Add phone number')).toBeInTheDocument();
    expect(screen.getByText('Add resume/CV')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    const empty = screen.getAllByText('This section is empty.');
    expect(empty).toHaveLength(4);
  });

  it('view resume opens a tab', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockUserProfile,
          image: 'mockImage.jpg',
          resume: 'https://www.resume.com/',
        },
      },
      route: '/0',
    });
    expect(screen.getByText('View resume/CV').closest('a')).toHaveAttribute(
      'href',
      'https://www.resume.com/'
    );
  });

  it('render forms and buttons', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockEmptyUserProfile,
          image: 'mockImage.jpg',
          resume: '',
        },
      },
      route: '/0',
    });
    fireEvent.click(screen.getByTestId('basicEditBtn'));
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone number')).toBeInTheDocument();
    expect(screen.getByText('Add resume/CV')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('bioEditBtn'));

    fireEvent.click(screen.getByTestId('expEditBtn'));
    expect(screen.getByText('Add experience')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('eduEditBtn'));
    expect(screen.getByText('Add education')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('achvEditBtn'));
    expect(screen.getByText('Add achievement')).toBeInTheDocument();

    const cancel = screen.getAllByText('Cancel');
    expect(cancel).toHaveLength(5);
    const save = screen.getAllByText('Save');
    expect(save).toHaveLength(5);
  });

  it('saving changes to basic form editing', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockEmptyUserProfile,
          image: 'mockImage.jpg',
          resume: '',
        },
      },
      route: '/0',
    });
    fireEvent.click(screen.getByTestId('basicEditBtn'));
    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: 'Smith John' } });
    fireEvent.click(screen.getByLabelText('saveBasic'));
    expect(
      screen.queryByText('There was a problem saving changes.')
    ).toBeNull();
  });

  it('add buttons will render new forms for experience, education and achievement sections', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockEmptyUserProfile,
          image: 'mockImage.jpg',
          resume: '',
        },
      },
      route: '/0',
    });
    fireEvent.click(screen.getByTestId('expEditBtn'));
    fireEvent.click(screen.getByText('Add experience'));

    fireEvent.click(screen.getByTestId('eduEditBtn'));
    fireEvent.click(screen.getByText('Add education'));

    fireEvent.click(screen.getByTestId('achvEditBtn'));
    fireEvent.click(screen.getByText('Add achievement'));

    const title = screen.getAllByText('Title');
    expect(title).toHaveLength(3);
    const timePeriod = screen.getAllByText('Time period');
    expect(timePeriod).toHaveLength(2);
    const description = screen.getAllByText('Description');
    expect(description).toHaveLength(3);
  });

  it('saving changes to empty forms show error for experience, education and achievement sections', () => {
    render(<Route exact path='/:id' component={Profile} />, {
      initialState: {
        user: {
          isAuth: true,
          id: 0,
          profile: mockEmptyUserProfile,
          image: 'mockImage.jpg',
          resume: '',
        },
      },
      route: '/0',
    });
    fireEvent.click(screen.getByTestId('expEditBtn'));
    fireEvent.click(screen.getByText('Add experience'));
    fireEvent.click(screen.getByLabelText('saveExp'));
    expect(
      screen.queryByText('There was a problem saving changes.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('eduEditBtn'));
    fireEvent.click(screen.getByText('Add education'));
    fireEvent.click(screen.getByLabelText('saveEdu'));
    expect(
      screen.queryByText('There was a problem saving changes.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('achvEditBtn'));
    fireEvent.click(screen.getByText('Add achievement'));
    fireEvent.click(screen.getByLabelText('saveAchv'));
    expect(
      screen.queryByText('There was a problem saving changes.')
    ).toBeInTheDocument();
  });
});
