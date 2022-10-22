import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';
import { Data } from 'components/utilities/types';
import { IContentItem } from 'components/utilities/interfaces';
import { ErrorMessage, StatusCode } from 'components/utilities/enums';
import { BASIC_URL, KEY } from 'components/utilities/utils';

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
      const response = await fetch(`${BASIC_URL}?token=${KEY}&q=${searchValue}`);
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
