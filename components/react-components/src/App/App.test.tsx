import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  test('App renders', () => {
    render(<App />);
    const linkElement = screen.getByText(/about us/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Search filter works', () => {
    render(<App />);
    expect(screen.queryByDisplayValue(/apple/)).toBeNull();

    userEvent.type(screen.getByRole('searchbox'), 'app');
    expect(screen.queryByDisplayValue('app')).toBeInTheDocument();
    expect(screen.queryAllByText(/Apple/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Xiaomi/i)).toBeNull();
    expect(screen.queryByText(/Samsung/i)).toBeNull();
  });
});
