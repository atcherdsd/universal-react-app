import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        render(
        <App />
        );
      </BrowserRouter>
    );
  });
  test('App renders', () => {
    const linkElement = screen.getByText(/about us/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Search filter works', () => {
    expect(screen.queryByDisplayValue(/apple/)).toBeNull();

    userEvent.type(screen.getByRole('searchbox'), 'app');
    expect(screen.queryByDisplayValue('app')).toBeInTheDocument();
    expect(screen.queryAllByText(/Apple/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Xiaomi/i)).toBeNull();
    expect(screen.queryByText(/Samsung/i)).toBeNull();
  });
  it('Links work', () => {
    const formsLink = screen.getByText(/forms/i) as Element;
    const aboutLink = screen.getByText(/about us/i) as Element;
    userEvent.click(formsLink);
    expect(screen.getByText('Ordering')).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
});
