import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('Header component renders', () => {
    render(<Header sitename={''} links={Object} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('list')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('list').length).toEqual(1);
    expect(screen.getByAltText('logo')).toBeInTheDocument();

    const nav = screen.getAllByRole('navigation');
    expect(nav.length).toEqual(1);
  });
  it('Classes are available', () => {
    render(<Header sitename={''} links={Object} />);
    expect(screen.getByRole('banner')).toHaveClass('Header-container');
    expect(screen.getAllByRole('heading')[0]).toHaveClass('Headear-title');
    expect(screen.getAllByRole('list')[0]).toHaveClass('Header-links');
  });
  it('Styles are available', () => {
    render(<Header sitename={''} links={Object} />);
    const navContainer = document.querySelector('.Header-right') as Element;
    const navContainerHeight = window.getComputedStyle(navContainer).height;
    expect(navContainerHeight).toBeDefined();
  });
  test('Header component do not have data', () => {
    render(<Header sitename={''} links={Object} />);
    expect(screen.queryByText(/home/i)).toBeNull();
    expect(screen.queryByRole('paragraph')).toBeNull();

    const elementList = document.querySelector('.Header-links') as Element;
    const textColor = window.getComputedStyle(elementList).color;
    expect(textColor).toBeFalsy();
  });
});
