import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
  test('shold render NotFound component', () => {
    render(<NotFound />);
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/page/)).toBeInTheDocument();
  });
  it('Classes are available', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading')).toHaveClass('NotFound-title');
    expect(screen.getByText(/page/)).toHaveClass('NotFound-message');
  });
  it('Styles are available', () => {
    render(<NotFound />);
    const elementParagraph = document.querySelector('.NotFound-message') as Element;
    const fontSizeInParagraph = window.getComputedStyle(elementParagraph).fontSize;
    expect(fontSizeInParagraph).toBeDefined();
  });
  test('NotFound component do not have data', () => {
    render(<NotFound />);
    expect(screen.queryByText('fun')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByRole('separator')).toBeNull();

    const elementParagraph = document.querySelector('.NotFound-message') as Element;
    const textColor = window.getComputedStyle(elementParagraph).color;
    expect(textColor).toBeFalsy();
  });
});
