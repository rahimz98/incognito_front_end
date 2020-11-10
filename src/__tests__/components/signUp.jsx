import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../utils/testUtils';
import SignUp from '../../components/signUp';

describe('Register', () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  it('renders register page', () => {
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();

    expect(screen.getByText('Log In instead?')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('empty inputs should provide error messages', () => {
    fireEvent.click(screen.getByText('Sign Up'));

    expect(
      screen.getAllByText('Must be between 2-50 characters').length
    ).toEqual(2);
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must be longer than 8 characters')
    ).toBeInTheDocument();
  });

  it('correct inputs should allow sign up', () => {
    const firstNameInput = screen.getByTestId('firstname');
    const lastNameInput = screen.getByTestId('lastname');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(firstNameInput, { target: { value: 'New' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'new@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Sign Up'));

    expect(screen.queryByText('Must be between 2-50 characters')).toBeNull();
    expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    expect(screen.queryByText('Must be longer than 8 characters')).toBeNull();
  });
});
