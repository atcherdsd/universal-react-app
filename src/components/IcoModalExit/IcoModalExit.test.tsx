import React from 'react';
import { render, screen } from '@testing-library/react';
import IcoModalExit from './IcoModalExit';

describe('IcoModalExit component', () => {
  beforeEach(() => {
    render(<IcoModalExit />);
  });

  test('should render IcoModalExit component', () => {
    const svg = document.getElementsByTagName('svg')[0] as SVGElement;
    expect(svg).toBeInTheDocument();
  });
  it('Styles are available', () => {
    const svg = document.getElementsByTagName('svg')[0] as SVGElement;
    const svgWidth = window.getComputedStyle(svg).width;
    expect(svgWidth).toBeDefined();
  });
  test('IcoModalExit component do not have data', () => {
    expect(screen.queryByRole('img')).toBeNull();
  });
});
