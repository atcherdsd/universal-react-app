import React, { ChangeEvent, ReactNode, useCallback, useEffect } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';
import NewsNavigation from 'components/NewsNavigation/NewsNavigation';
import { NewsCount, PageNumber } from 'types/enums';
import { Data } from 'types/types';
import { searchNews, setNewsCount, setNewsData, setPageNumber } from 'store/apiSlice';
import { fetchApiThunkCreator } from 'components/utilities/utils';
import { apiStateDataSelector } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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
const availableNewsCountPerPage = {
  10: '10',
  5: '5',
  1: '1',
};

const renderOptions = (availableItems: Record<string, string>): ReactNode[] => {
  return Object.entries(availableItems).map(([key, value]): ReactNode => {
    return (
      <option className="SearchBar__item" value={value} key={key}>
        {key}
      </option>
    );
  });
};

function SearchBar(): JSX.Element {
  const { searchValueApi, apiData, newsCount, pageNumber, isLoading, error } =
    useAppSelector(apiStateDataSelector);
  const dispatch = useAppDispatch();

  function searchText(event: { target: { value: string } }): void {
    const value = event.target.value;
    dispatch(searchNews(value));
  }

  const handleFormSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(fetchApiThunkCreator(searchValueApi, apiData));
    },
    [apiData, dispatch, searchValueApi]
  );

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    const name = event.target.name;
    dispatch(setNewsData({ ...apiData, [name]: sortValue }));
  };
  const handleNewsCount = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setNewsCount(value));
    dispatch(setPageNumber(PageNumber.One));
  };

  let workedArticlesList = apiData.articles;
  const setOutputData = (): Data[] => {
    if (newsCount === NewsCount.One) {
      workedArticlesList = Array.of(apiData.articles[+pageNumber - 1]);
    } else if (newsCount === NewsCount.Ten || apiData.articles.length <= +NewsCount.Five) {
      workedArticlesList = apiData.articles;
    } else if (apiData.articles.length > +NewsCount.Five) {
      if (newsCount === NewsCount.Five && pageNumber === PageNumber.One) {
        workedArticlesList = apiData.articles.slice(0, +NewsCount.Five);
      } else if (newsCount === NewsCount.Five && pageNumber === PageNumber.Two) {
        workedArticlesList = apiData.articles.slice(+NewsCount.Five, apiData.articles.length);
      }
    }
    return workedArticlesList;
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
                name="searchNews"
                placeholder="What are you looking for?"
                autoFocus
                onChange={searchText}
                value={searchValueApi}
              />
            </label>
          </div>
          <input
            type="submit"
            name="searchSubmit"
            className="SearchBar-submit"
            value="Search"
            disabled={isLoading}
          />
          <div className="SearchBar-sort__wrapper">
            <div className="SearchBar-sort__content">
              <div className="SearchBar-sort">
                <label htmlFor="filterByCountry" className="SearchBar-search__label">
                  Choose a country
                </label>
                <select
                  id="filterByCountry"
                  name="filterByCountry"
                  className="SearchBar-select"
                  onChange={handleChangeSelect}
                  value={apiData.filterByCountry}
                >
                  {renderOptions(availableCountries)}
                </select>
              </div>
              <div className="SearchBar-sort">
                <label htmlFor="sortBy" className="SearchBar-search__label">
                  Sort by
                </label>
                <select
                  id="sortBy"
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
              </div>
              <div className="SearchBar-sort">
                <label htmlFor="filterByLanguage" className="SearchBar-search__label">
                  Choose language
                </label>
                <select
                  id="filterByLanguage"
                  name="filterByLanguage"
                  className="SearchBar-select"
                  onChange={handleChangeSelect}
                  value={apiData.filterByLanguage}
                >
                  {renderOptions(availableLanguages)}
                </select>
              </div>
              <div className="SearchBar-sort">
                <label htmlFor="newsCount" className="SearchBar-search__label">
                  Max
                </label>
                <select
                  id="newsCount"
                  name="newsCount"
                  className="SearchBar-select"
                  onChange={handleNewsCount}
                  value={newsCount}
                >
                  {renderOptions(availableNewsCountPerPage)}
                </select>
              </div>
            </div>

            <hr className="SearchBar-form__line" />
            <input
              type="submit"
              name="submitForm"
              className="SearchBar-submit__select"
              value="Submit"
              disabled={isLoading}
            />
          </div>
        </form>

        <hr className="SearchBar-line"></hr>
      </section>
      <div className="SearchBar-results">
        {isLoading && <div className="SearchBar-loader"></div>}
        {error && <div className="SearchBar-error">{error}</div>}
        {apiData.articles.length > 0 && <NewsNavigation />}
        {apiData.articles.length > 0 &&
          setOutputData().map((item): ReactNode => {
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
