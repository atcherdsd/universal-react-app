import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { Provider } from 'react-redux';
import store from 'store/store';

describe('SearchBar component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });

  test('should render SearchBar component', () => {
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
    const button = screen.getAllByRole('button')[0];
    expect(button).toBeInTheDocument();
    expect(button).toHaveValue('Search');

    expect(screen.getByText(/Use the search/i)).toBeInTheDocument();
    expect(screen.getByText('List of articles is empty')).toBeInTheDocument();
  });
  it('onChange works', async () => {
    const form = document.querySelector('.SearchBar-content__container') as HTMLElement;
    const searchInput = screen.getByRole('searchbox');
    const button = screen.getAllByRole('button')[0];
    form.onchange = jest.fn();
    const onChangeForm = form.onchange;
    searchInput.onchange = jest.fn();
    const onChangeSearch = searchInput.onchange;

    expect(searchInput).toContainHTML('');
    expect(button).not.toHaveAttribute('disabled');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Samsung' } });

      expect(onChangeSearch).toHaveBeenCalledTimes(1);

      fireEvent.click(button);
      expect(onChangeForm).toHaveBeenCalled();
      const loader = document.querySelector('.SearchBar-loader');
      expect(loader).not.toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: '' } });
    });
  });
  it('should call fetch', async () => {
    const searchInput = screen.getByRole('searchbox');
    const button = screen.getAllByRole('button')[0];
    const fakeData = {
      title: 'Samsung: Strong Buy On Fundamentals',
      description: 'Samsung Unveils Expandable Screen',
      image: 'https://data.com/samsung/image.jpg',
      publishedAt: '2022-07-09',
      source: {
        name: 'CNN',
      },
      url: 'https://data.com/samsung',
    };
    await act(async () => {
      const mockJsonPromise = Promise.resolve(fakeData);
      const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      fireEvent.change(searchInput, { target: { value: 'Samsung' } });
      fireEvent.click(button);
      expect(global.fetch).toBeDefined();
    });
  });
  it('Сlasses are available', () => {
    expect(screen.getAllByRole('separator')[0]).toHaveClass('SearchBar-line');
    expect(screen.getByRole('heading')).toHaveClass('SearchBar-title');
    expect(screen.getAllByRole('searchbox')[0]).toHaveClass('SearchBar-search');
    expect(screen.getAllByRole('button')[0]).toHaveClass('SearchBar-submit');
  });
  it('Styles are available', () => {
    const resultDiv = document.querySelector('.SearchBar-results') as Element;
    const resultDivAlignItems = window.getComputedStyle(resultDiv).alignItems;
    expect(resultDivAlignItems).toBeDefined();
  });
  test('SearchBar renders without data', () => {
    expect(screen.queryAllByRole('combobox')[0]).toBeInTheDocument();

    const searchInput = screen.getByRole('searchbox');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Apple' } });
    });
    expect(screen.queryByDisplayValue(/watch/i)).toBeNull();
  });
});
