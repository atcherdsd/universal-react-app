import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store/store';

describe('App component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          render(
          <App />
          );
        </BrowserRouter>
      </Provider>
    );
  });
  test('App renders', () => {
    const linkElement = screen.getByText(/about us/i);
    expect(linkElement).toBeInTheDocument();
  });
});
