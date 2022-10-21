import React from 'react';
import { render, screen } from '@testing-library/react';
import ExitModal from './ExitModal';

describe('ExitModal component', () => {
  beforeEach(() => {
    render(<ExitModal />);
  });

  test('should render ExitModal component', () => {
    const svg = document.getElementsByTagName('svg')[0] as SVGElement;
    expect(svg).toBeInTheDocument();
  });
  it('Styles are available', () => {
    const svg = document.getElementsByTagName('svg')[0] as SVGElement;
    const svgWidth = window.getComputedStyle(svg).width;
    expect(svgWidth).toBeDefined();
  });
  test('ExitModal component do not have data', () => {
    expect(screen.queryByRole('img')).toBeNull();
  });
});
