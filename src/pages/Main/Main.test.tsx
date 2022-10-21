import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main component', () => {
  test('Main component renders', () => {
    render(<Main />);
    expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/4,7/)[2]).toBeInTheDocument();
    expect(screen.getAllByText(/Xiaomi/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('separator')[1]).toBeInTheDocument();
    expect(screen.getAllByAltText('Smartphone').length).toEqual(20);
  });
  it('Classes are available', () => {
    render(<Main />);
    expect(screen.getAllByRole('generic')[1]).toHaveClass('Main-container');
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('Card-description__item');
  });
  it('Styles are available', () => {
    render(<Main />);
    const element = document.querySelector('.Main-container') as Element;
    const justifyContent = window.getComputedStyle(element).justifyContent;
    expect(justifyContent).toBeDefined();
  });
  test('Main component do not have data', () => {
    render(<Main />);
    expect(screen.queryByText('extension')).toBeNull();

    const element = document.querySelector('.Main-container') as Element;
    const textColor = window.getComputedStyle(element).color;
    expect(textColor).toBeFalsy();
  });
});
