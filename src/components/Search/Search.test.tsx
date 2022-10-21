import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';

interface IStore {
  [key: string]: string | number;
}

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key: string) {
      return (store as IStore)[key];
    },
    setItem(key: string, value: string | number) {
      (store as IStore)[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete (store as IStore)[key];
    },
    getAll() {
      return store;
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id: string, data: object) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Search component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('data is added into local storage', () => {
    const mockId = 'search';
    const mockJson = { data: 'json data' };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });
  test('data in local storage which is overwritten', () => {
    const mockId = 'searchValue';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });
  test('only one ID is in localStorage', () => {
    const mockId = 'value';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });

  test('Search component renders', () => {
    render(<Search />);
    expect(screen.getAllByRole('separator')[0]).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What are you looking for?')).toBeInTheDocument();
  });
  it('onChange works', () => {
    render(<Search />);
    expect(screen.queryByDisplayValue(/samsung/)).toBeNull();

    screen.getByRole('searchbox').onchange = jest.fn();
    const onChangeInCode = screen.getByRole('searchbox').onchange;
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'samsung' } });
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'app' } });
    expect(onChangeInCode).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText(/Apple/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Apple/).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/samsung/)).toBeNull();
    expect(screen.queryByDisplayValue(/samsung/i)).toBeNull();
  });
  it('Сlasses are available', () => {
    render(<Search />);
    expect(screen.getByRole('heading')).toHaveClass('Search-title');
    expect(screen.getByRole('searchbox')).toHaveClass('Search-input');
  });
  it('Styles are available', () => {
    render(<Search />);
    const inputElement = document.querySelector('.Search-input') as Element;
    const inputColorValue = window.getComputedStyle(inputElement).color;
    expect(inputColorValue).toBeDefined();
  });
  test('Search renders without data', () => {
    render(<Search />);
    expect(screen.queryByText(/sorry/i)).toBeNull();

    userEvent.type(screen.getByRole('searchbox'), 'appppp');
    expect(screen.queryByText(/Xiaomi/i)).toBeNull();
    expect(screen.queryByText(/Samsung/i)).toBeNull();
    expect(screen.getByText('Sorry! No matches found')).toBeInTheDocument();
    expect(screen.getByText(/sorry/i)).toHaveClass('Search-warning');
  });
});
