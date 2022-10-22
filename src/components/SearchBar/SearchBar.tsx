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
      if (response.status.toString() === '400')
        throw new Error('Your request is not valid. Please fill in the request field');
      else if (!response.ok) throw new Error('Server error. Please try again later');

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
