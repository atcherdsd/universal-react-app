import React from 'react';
import { render } from '@testing-library/react';
import OrderCard from './OrderCard';

describe('OrderCard component', () => {
  test('should render OrderCard component', () => {
    const snapshot = render(<OrderCard />);
    expect(snapshot).toMatchSnapshot();
  });
});
