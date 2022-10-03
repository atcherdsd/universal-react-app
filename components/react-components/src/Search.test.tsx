import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';

const onchange = jest.fn();

describe('Search component', () => {
  test('Search component renders', () => {
    render(<Search />);
    expect(screen.getAllByRole('separator')[0]).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What are you looking for?')).toBeInTheDocument();
  });
  it('onChange works', () => {
    render(<Search />);
    userEvent.type(screen.getByRole('searchbox'), 'samsung');
    expect(onchange);
  });
  it('Сlasses are available', () => {
    render(<Search />);
    expect(screen.getByRole('heading')).toHaveClass('Search-title');
    expect(screen.getByRole('searchbox')).toHaveClass('Search-input');
  });
  it('Styles are available', () => {
    render(<Search />);
    const elementInput = document.querySelector('.Search-input') as Element;
    const inputColorValue = window.getComputedStyle(elementInput).color;
    expect(inputColorValue).toBeDefined();
  });
  test('Search renders without data', () => {
    render(<Search />);
    expect(screen.queryByText('sorry')).toBeNull();
  });
});
