import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About component', () => {
  test('About component renders', () => {
    render(<About />);
    expect(screen.getAllByText(/us/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getAllByRole('separator').length).toEqual(2);
  });
  it('Classes are available', () => {
    render(<About />);
    expect(screen.getAllByRole('separator')[0]).toHaveClass('About-line__common');
  });
  it('Styles are available', () => {
    render(<About />);
    const elementParagraph = document.querySelector('.About-text') as Element;
    const marginInParagraph = window.getComputedStyle(elementParagraph).margin;
    expect(marginInParagraph).toBeDefined();
  });
  test('About component do not have data', () => {
    render(<About />);
    expect(screen.queryByText('fun')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
