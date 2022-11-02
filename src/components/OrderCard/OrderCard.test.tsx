import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderCard from './OrderCard';

describe('OrderCard component', () => {
  test('shold render OrderCard component', () => {
    render(<OrderCard key="" />);
    expect(screen.getAllByText(/accepted/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();

    const items = document.querySelectorAll('.OrderCard-item');
    expect(items.length).toEqual(10);
    expect(screen.getByText(/Delivery date:/i)).toBeInTheDocument();
  });
  it('Classes are available', () => {
    render(<OrderCard key="" />);
    expect(screen.getAllByRole('generic')[2]).toHaveClass('OrderCard-item');
  });
  test('OrderCard component do not have data', () => {
    render(<OrderCard key="" />);
    expect(screen.queryByText(/samsung/i)).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
