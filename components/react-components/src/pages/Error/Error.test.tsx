import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error component', () => {
  test('Error component renders', () => {
    render(<Error />);
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/page/)).toBeInTheDocument();
  });
  it('Classes are available', () => {
    render(<Error />);
    expect(screen.getByRole('heading')).toHaveClass('Error-title');
    expect(screen.getByText(/page/)).toHaveClass('Error-message');
  });
  it('Styles are available', () => {
    render(<Error />);
    const elementParagraph = document.querySelector('.Error-message') as Element;
    const fontSizeInParagraph = window.getComputedStyle(elementParagraph).fontSize;
    expect(fontSizeInParagraph).toBeDefined();
  });
  test('Error component do not have data', () => {
    render(<Error />);
    expect(screen.queryByText('fun')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByRole('separator')).toBeNull();

    const elementParagraph = document.querySelector('.Error-message') as Element;
    const textColor = window.getComputedStyle(elementParagraph).color;
    expect(textColor).toBeFalsy();
  });
});
