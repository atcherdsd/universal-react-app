import React, { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';
import { fetchData } from 'components/utilities/utils';
import { AppContext } from 'store/context';
import { Types } from 'store/reducers';

function SearchBar(): JSX.Element {
  const { state, dispatch } = useContext(AppContext);
  const { apiData, searchValueApi } = state.apiStateData;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  function searchText(event: { target: { value: string } }): void {
    const value = event.target.value;
    dispatch({ type: Types.SearchNews, payload: value });
  }

  const handleFormSubmit = useCallback(
    (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setError('');

      fetchData(searchValueApi, dispatch, setError, setIsLoading, apiData);
    },
    [apiData, dispatch, searchValueApi]
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
        {apiData.articles.length > 0 &&
          apiData.articles.map((item): ReactNode => {
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
        {!isLoading && !error && !apiData.articles.length && (
          <p className="SearchBar-warning">List of articles is empty</p>
        )}
      </div>
    </>
  );
}

export default SearchBar;
