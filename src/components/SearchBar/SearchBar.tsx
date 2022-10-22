import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';

export interface IContentItem {
  articles: Data[];
}

export type Data = {
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
};

enum StatusCode {
  BadRequest = '400',
  Unauthorized = '401',
  Forbidden = '403',
  TooManyRequests = '429',
  InternalServerError = '500',
}
enum ErrorMessage {
  BadRequest = 'Your request is not valid. Please fill in the search field and try again',
  Unauthorized = 'Your API key is incorrect. Use a valid key',
  Forbidden = 'You have reached your daily request limit, the next reset is at 00:00 UTC',
  TooManyRequests = 'You have made more requests per second than you are allowed',
  InternalServerError = 'We had a problem with our server. Try again later',
  AnotherError = 'Server error. Try again later',
}

const basicURL = 'https://gnews.io/api/v4/search';
const KEY = 'b1a198162ce907ddfd42b009b63ab35e';
// const KEY = 'd42b009b63ab35e';

function SearchBar(): JSX.Element {
  const [searchValue, setSearchValue] = useState(
    (localStorage.getItem('searchValue') as string) || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [contentItem, setContentItem] = useState({
    articles: [] as Data[],
  } as IContentItem);

  function searchText(event: { target: { value: string } }): void {
    setSearchValue(event.target.value);
  }
  function setLocalStorage(): void {
    localStorage.setItem('searchValue', searchValue);
  }
  useEffect(setLocalStorage, [searchValue]);

  async function handleFormSubmit(event: ChangeEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setContentItem({ articles: [] as Data[] });
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${basicURL}?token=${KEY}&q=${searchValue}`);
      switch (response.status.toString()) {
        case StatusCode.BadRequest:
          throw new Error(ErrorMessage.BadRequest);
        case StatusCode.Unauthorized:
          throw new Error(ErrorMessage.Unauthorized);
        case StatusCode.Forbidden:
          throw new Error(ErrorMessage.Forbidden);
        case StatusCode.TooManyRequests:
          throw new Error(ErrorMessage.TooManyRequests);
        case StatusCode.InternalServerError:
          throw new Error(ErrorMessage.InternalServerError);
      }
      if (!response.ok) throw Error(ErrorMessage.AnotherError);
      const data: IContentItem = await response.json();
      setContentItem(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="SearchBar-section">
        <hr className="SearchBar-line"></hr>
        <h2 className="SearchBar-title">
          Use the search to find out the latest news on a topic of interest:
        </h2>
        <form className="SearchBar-content__container" onSubmit={handleFormSubmit}>
          <div className="SearchBar-field">
            <label className="SearchBar-search__label">
              <input
                className="SearchBar-search"
                type="search"
                placeholder="What are you looking for?"
                autoFocus
                onChange={searchText}
                value={searchValue}
              />
            </label>
          </div>
          <input type="submit" className="SearchBar-submit" value="Search" disabled={isLoading} />
        </form>

        <hr className="SearchBar-line"></hr>
      </section>
      <div className="SearchBar-results">
        {isLoading ? (
          <div className="SearchBar-loader"></div>
        ) : error ? (
          <div className="SearchBar-error">{error}</div>
        ) : contentItem.articles.length ? (
          contentItem.articles.map((item): ReactNode => {
            return (
              <SearchResult
                key={item.url}
                title={item.title}
                description={item.description}
                image={item.image}
                publishedAt={item.publishedAt}
                source={item.source}
                url={item.url}
              />
            );
          })
        ) : (
          <p className="SearchBar-warning">List of articles is empty</p>
        )}
      </div>
    </>
  );
}

export default SearchBar;
