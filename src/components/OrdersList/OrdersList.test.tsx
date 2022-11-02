import React from 'react';
import { render, screen } from '@testing-library/react';
import OrdersList from './OrdersList';

describe('OrdersList component', () => {
  test('shold render OrdersList component', () => {
    render(<OrdersList />);
    expect(screen.getByText(/no orders/i)).toBeInTheDocument();
    const elementSection = document.querySelector('.OrdersList-section') as Element;
    expect(elementSection).toBeInTheDocument();
    const elementParagraph = document.querySelector('.OrdersList-message') as Element;
    expect(elementParagraph).toBeInTheDocument();
  });
  it('Styles are available', () => {
    render(<OrdersList />);
    const elementSection = document.querySelector('.OrdersList-section') as Element;
    const flexDirectionInSection = window.getComputedStyle(elementSection).flexDirection;
    expect(flexDirectionInSection).toBeDefined();
  });
  test('OrdersList component do not have data', () => {
    render(<OrdersList />);
    expect(screen.queryByText(/samsung/i)).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();

    const elementParagraph = document.querySelector('.OrdersList-message') as Element;
    const padding = window.getComputedStyle(elementParagraph).padding;
    expect(padding).toBeFalsy();
  });
});
