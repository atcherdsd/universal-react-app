import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('Card component renders', () => {
    render(
      <Card
        title={''}
        review={''}
        rating={''}
        price={''}
        stock={''}
        delivery={''}
        logo={''}
        img={''}
        description={{
          info: [],
        }}
      />
    );
    expect(screen.getByText('from 5')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByAltText(/brand/i)).toBeInTheDocument();
  });
  it('Card renders without data', () => {
    render(
      <Card
        title={''}
        review={''}
        rating={''}
        price={''}
        stock={''}
        delivery={''}
        logo={''}
        img={''}
        description={{
          info: [],
        }}
      />
    );
    expect(screen.queryByText('from 6')).toBeNull();
    expect(screen.queryByRole('nav')).toBeNull();
  });
  // it('Card snapshot', () => {
  //   const snapshot = render(
  //     <Card
  //       title={''}
  //       review={''}
  //       rating={''}
  //       price={''}
  //       stock={''}
  //       delivery={''}
  //       logo={''}
  //       img={''}
  //       description={{
  //         info: [],
  //       }}
  //     />
  //   );
  //   expect(snapshot).toMatchSnapshot();
  // });
});
