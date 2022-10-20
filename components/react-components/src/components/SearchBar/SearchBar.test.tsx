import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar component', () => {
  test('should render SearchBar component', () => {
    render(<SearchBar />);

    const section = document.querySelector('.SearchBar-section');
    expect(section).toBeInTheDocument();
    expect(screen.getAllByRole('separator')[0]).toBeInTheDocument();
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toBeInTheDocument();

    const form = document.querySelector('.SearchBar-content__container');
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getAllByRole('generic').length).toBeGreaterThan(1);
    expect(screen.getByText(/List of articles/i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveValue('Search');

    expect(screen.getByText(/Use the search/i)).toBeInTheDocument();
    expect(screen.getByText('List of articles is empty')).toBeInTheDocument();
  });
  it('onChange works', async () => {
    render(<SearchBar />);

    const form = document.querySelector('.SearchBar-content__container') as HTMLElement;
    const searchInput = screen.getByRole('searchbox');
    const button = screen.getByRole('button');

    expect(searchInput).toContainHTML('');
    expect(button).not.toHaveAttribute('disabled');

    form.onchange = jest.fn();
    const onChangeForm = form.onchange;
    searchInput.onchange = jest.fn();
    const onChangeSearch = searchInput.onchange;

    fireEvent.change(searchInput, { target: { value: 'Samsung' } });
    expect(screen.getByDisplayValue('Samsung')).toBeInTheDocument();
    expect(searchInput).toHaveValue('Samsung');
    expect(onChangeSearch).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(onChangeForm).toHaveBeenCalled();
    const loader = document.querySelector('.SearchBar-loader');
    expect(loader).toBeInTheDocument();

    const results = await (screen.findAllByText(/Samsung/i) as Promise<HTMLElement[]>);
    expect(results.length).toBeGreaterThanOrEqual(25);
    const searchResultContainers = document.querySelectorAll('.SearchResult-container');
    expect(searchResultContainers.length).toEqual(25);
    expect(screen.getAllByRole('generic').length).toBeGreaterThan(50);

    fireEvent.change(searchInput, { target: { value: '' } });
  });
  it('Сlasses are available', () => {
    render(<SearchBar />);

    expect(screen.getAllByRole('separator')[0]).toHaveClass('SearchBar-line');
    expect(screen.getByRole('heading')).toHaveClass('SearchBar-title');
    expect(screen.getByRole('searchbox')).toHaveClass('SearchBar-search');
    expect(screen.getByRole('button')).toHaveClass('SearchBar-submit');
    expect(screen.getByText(/List of articles/i)).toHaveClass('SearchBar-warning');
  });
  it('Styles are available', () => {
    render(<SearchBar />);

    const resultDiv = document.querySelector('.SearchBar-results') as Element;
    const resultDivAlignItems = window.getComputedStyle(resultDiv).alignItems;
    expect(resultDivAlignItems).toBeDefined();
  });
  test('SearchBar renders without data', () => {
    render(<SearchBar />);

    expect(screen.queryByRole('combobox')).toBeNull();

    const searchInput = screen.getByRole('searchbox');
    userEvent.type(searchInput, 'Apple');
    expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Apple')).toHaveClass('SearchBar-search');
    expect(screen.getByDisplayValue('Apple')).not.toHaveClass('actve');
    expect(screen.queryByDisplayValue(/watch/i)).toBeNull();
  });
});
