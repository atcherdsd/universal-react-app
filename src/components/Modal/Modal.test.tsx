import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  test('should render Modal component', () => {
    const snapshot = render(
      <Modal
        data={{
          title: '',
          description: '',
          image: '',
          publishedAt: '',
          source: {
            name: '',
          },
          url: '',
        }}
        handleResult={() => void {}}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
  it('onClick works', () => {
    const { unmount } = render(
      <Modal
        data={{
          title: '',
          description: '',
          image: '',
          publishedAt: '',
          source: {
            name: '',
          },
          url: '',
        }}
        handleResult={() => void {}}
      />
    );
    const exit = document.querySelector('.Modal-exit-ico') as HTMLDivElement;
    exit.onclick = jest.fn();
    const onClick = exit.onclick;

    expect(screen.queryByText('See in source')).toBeInTheDocument();
    fireEvent.click(exit);
    expect(onClick).toHaveBeenCalledTimes(1);
    unmount();
    expect(screen.queryByText('See in source')).not.toBeInTheDocument();
  });
  test('Modal component do not have data', () => {
    expect(screen.queryByText(/home/i)).toBeNull();
    expect(screen.queryByRole('paragraph')).toBeNull();
  });
});
