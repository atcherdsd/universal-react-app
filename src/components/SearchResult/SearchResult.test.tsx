import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import SearchResult from './SearchResult';
import Modal from 'components/Modal/Modal';

describe('SearchResult component', () => {
  test('SearchResult component snapshot', () => {
    const snapshot = render(
      <SearchResult
        source={{
          id: '',
          name: '',
        }}
        title=""
        description=""
        url=""
        publishedAt=""
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
  it('onClick works', async () => {
    render(
      <SearchResult
        source={{
          id: '',
          name: '',
        }}
        title=""
        description=""
        url=""
        publishedAt=""
      />
    );

    await act(async () => {
      const searchResultItem = document.querySelector('.SearchResult-container') as HTMLElement;
      searchResultItem.onclick = jest.fn();
      const onClickItem = searchResultItem.onclick;
      fireEvent.click(searchResultItem);
      expect(
        render(
          <Modal
            data={{
              source: {
                id: '',
                name: '',
              },
              author: undefined,
              title: '',
              description: '',
              url: '',
              urlToImage: undefined,
              publishedAt: '',
            }}
            handleResult={() => void {}}
          />
        )
      );
      expect(onClickItem).toHaveBeenCalledTimes(1);
    });
  });
});
