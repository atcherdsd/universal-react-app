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

  const availableCountries = {
    Australia: 'au',
    Canada: 'ca',
    France: 'fr',
    Germany: 'de',
    'Hong Kong': 'hk',
    India: 'in',
    Japan: 'jp',
    'United States': 'us',
  };
  const availableLanguages = {
    English: 'en',
    French: 'fr',
    German: 'de',
    Hindi: 'hi',
    Japanese: 'ja',
  };

  function searchText(event: { target: { value: string } }): void {
    const value = event.target.value;
    dispatch({ type: Types.SearchNews, payload: value });
  }

  const handleFormSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setError('');

      await fetchData(searchValueApi, dispatch, setError, setIsLoading, apiData);
    },
    [apiData, dispatch, searchValueApi]
  );
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    const name = event.target.name;
    dispatch({
      type: Types.SetNewsData,
      payload: { ...apiData, [name]: sortValue },
    });
  };

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
          <div className="SearchBar-sort__wrapper">
            <div className="SearchBar-sort">
              <label className="SearchBar-search__label">Choose a country</label>
              <select
                name="filterByCountry"
                className="SearchBar-select"
                onChange={handleChangeSelect}
                value={apiData.filterByCountry}
              >
                {Object.entries(availableCountries).map(([key, value]): ReactNode => {
                  return (
                    <option className="SearchBar__item" value={value} key={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
              <input
                type="submit"
                className="SearchBar-submit__select"
                value="Submit"
                disabled={isLoading}
              />
            </div>
            <div className="SearchBar-sort">
              <label className="SearchBar-search__label">Sort by</label>
              <select
                name="sortBy"
                className="SearchBar-select"
                onChange={handleChangeSelect}
                value={apiData.sortBy}
              >
                <option className="SearchBar__item" value="publishedAt">
                  Date
                </option>
                <option className="SearchBar__item" value="relevance">
                  Relevance
                </option>
              </select>
              <input
                type="submit"
                className="SearchBar-submit__select"
                value="Submit"
                disabled={isLoading}
              />
            </div>
            <div className="SearchBar-sort">
              <label className="SearchBar-search__label">Choose language</label>
              <select
                name="filterByLanguage"
                className="SearchBar-select"
                onChange={handleChangeSelect}
                value={apiData.filterByLanguage}
              >
                {Object.entries(availableLanguages).map(([key, value]): ReactNode => {
                  return (
                    <option className="SearchBar__item" value={value} key={value}>
                      {key}
                    </option>
                  );
                })}
              </select>
              <input
                type="submit"
                className="SearchBar-submit__select"
                value="Submit"
                disabled={isLoading}
              />
            </div>
          </div>
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
