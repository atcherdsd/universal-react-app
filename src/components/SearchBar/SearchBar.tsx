import React, { ChangeEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';
import { Data } from 'components/utilities/types';
import { IContentItem } from 'components/utilities/interfaces';
import { ErrorMessage, StatusCode } from 'components/utilities/enums';
import { BASIC_URL, KEY } from 'components/utilities/utils';

function SearchBar(): JSX.Element {
  const [searchValueApi, setSearchValueApi] = useState(
    (localStorage.getItem('searchValueApi') as string) || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [contentItem, setContentItem] = useState({
    articles: [] as Data[],
  } as IContentItem);
  const [error, setError] = useState<string>('');

  function searchText(event: { target: { value: string } }): void {
    setSearchValueApi(event.target.value);
  }
  function setLocalStorage(): void {
    localStorage.setItem('searchValueApi', searchValueApi);
  }
  useEffect(setLocalStorage, [searchValueApi]);

  const handleFormSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      setContentItem({ articles: [] as Data[] });
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`${BASIC_URL}?token=${KEY}&q=${searchValueApi}`);
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
    },
    [searchValueApi]
  );

  useEffect(() => {
    return function clean() {};
  }, []);

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
                value={searchValueApi}
              />
            </label>
          </div>
          <input type="submit" className="SearchBar-submit" value="Search" disabled={isLoading} />
        </form>

        <hr className="SearchBar-line"></hr>
      </section>
      <div className="SearchBar-results">
        {isLoading && <div className="SearchBar-loader"></div>}
        {error && <div className="SearchBar-error">{error}</div>}
        {contentItem.articles.length > 0 &&
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
          })}
        {!isLoading && !error && !contentItem.articles.length && (
          <p className="SearchBar-warning">List of articles is empty</p>
        )}
      </div>
    </>
  );
}

export default SearchBar;
