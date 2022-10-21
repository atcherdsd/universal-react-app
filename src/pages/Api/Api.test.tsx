import React from 'react';
import { render, screen } from '@testing-library/react';
import Api from './Api';

describe('Api component', () => {
  beforeEach(() => {
    render(<Api />);
  });

  test('should render Api component', () => {
    expect(screen.getAllByRole('separator')[0]).toBeInTheDocument();
    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('News aggregator');
  });
  it('Classes are available', () => {
    expect(screen.getAllByRole('separator')[0]).toHaveClass('Api-line');
    expect(screen.getAllByRole('heading')[0]).toHaveClass('Api-title');
  });
  it('Styles are available', () => {
    const heading = document.querySelector('.Api-title') as HTMLHeadingElement;
    const textTransform = window.getComputedStyle(heading).textTransform;
    expect(textTransform).toBeDefined();
  });
  test('Api component do not have data', () => {
    expect(screen.queryByText('extension')).toBeNull();
    expect(screen.queryByRole('spinbutton')).toBeNull();

    const title = document.querySelector('.Api-title') as HTMLHeadingElement;
    const marginInTitle = window.getComputedStyle(title).margin;
    expect(marginInTitle).toBeFalsy();
  });
});
