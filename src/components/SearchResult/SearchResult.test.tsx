import React from 'react';
import { render } from '@testing-library/react';
import SearchResult from './SearchResult';
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
  });
});
