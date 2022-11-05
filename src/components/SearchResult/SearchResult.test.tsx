import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import SearchResult from './SearchResult';
import Modal from 'components/Modal/Modal';
import { BrowserRouter } from 'react-router-dom';

describe('SearchResult component', () => {
  test('SearchResult component snapshot', () => {
    const snapshot = render(
      <BrowserRouter>
        render(
        <SearchResult
          source={{
            name: '',
          }}
          title=""
          description=""
          url=""
          image=""
          publishedAt=""
        />
        )
      </BrowserRouter>
    );

    expect(snapshot).toMatchSnapshot();
  });
  it('onClick works', async () => {
    render(
      <BrowserRouter>
        render(
        <SearchResult
          source={{
            name: '',
          }}
          title=""
          description=""
          url=""
          image=""
          publishedAt=""
        />
        );
      </BrowserRouter>
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
                name: '',
              },
              title: '',
              description: '',
              url: '',
              image: '',
              publishedAt: '',
            }}
            date=""
            handleResult={() => void {}}
          />
        )
      );
      expect(onClickItem).toHaveBeenCalledTimes(1);
    });
  });
});
