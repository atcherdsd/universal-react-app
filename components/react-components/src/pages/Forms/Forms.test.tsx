import React from 'react';
import { render, screen } from '@testing-library/react';
import Forms from './Forms';

describe('Forms component', () => {
  test('shold render Forms component', () => {
    render(<Forms />);
    expect(screen.getByText(/ordering/i)).toBeInTheDocument();
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });
  it('Classes are available', () => {
    render(<Forms />);
    expect(screen.getAllByRole('heading')[0]).toHaveClass('Forms-title');
    expect(screen.getAllByRole('separator')[0]).toHaveClass('Forms-line');
  });
  it('Styles are available', () => {
    render(<Forms />);
    const elementHeading = document.querySelector('.Forms-title') as Element;
    const textTransformInHeading = window.getComputedStyle(elementHeading).textTransform;
    expect(textTransformInHeading).toBeDefined();
  });
  test('NotFound component do not have data', () => {
    render(<Forms />);
    expect(screen.queryByText('smartphone')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();

    const elementHeading = document.querySelector('.Forms-title') as Element;
    const textColor = window.getComputedStyle(elementHeading).color;
    expect(textColor).toBeFalsy();
  });
});
