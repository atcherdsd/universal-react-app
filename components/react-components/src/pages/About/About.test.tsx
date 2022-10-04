import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About component', () => {
  test('About component renders', () => {
    render(<About p1={''} p2={''} />);
    expect(screen.getByText(/us/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
  it('Classes are available', () => {
    render(<About p1={''} p2={''} />);
    expect(screen.getByRole('separator')).toHaveClass('About-line');
  });
  it('Styles are available', () => {
    render(<About p1={''} p2={''} />);
    const elementParagraph = document.querySelector('.About-text') as Element;
    const marginInParagraph = window.getComputedStyle(elementParagraph).margin;
    expect(marginInParagraph).toBeDefined();
  });
  test('About component do not have data', () => {
    render(<About p1={''} p2={''} />);
    expect(screen.queryByText('fun')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
