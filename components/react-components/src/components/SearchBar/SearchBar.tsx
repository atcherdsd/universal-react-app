import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './SearchBar.css';
import SearchResult from 'components/SearchResult/SearchResult';

export interface IContentItem {
  pagination?: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Data[];
}
export type Data = {
  author: string | null;
  title: string;
  description: string;
  image: string | null;
  category: string;
  language: string;
  country: string;
  published_at: string;
  source: string;
  url: string;
};

const basicURL = 'http://api.mediastack.com/v1/news';
const KEY = '0b4c84b5f95151eef1cf75d1eaa4ddc0';
const languages = 'en,-zh,-ar';

function SearchBar(): JSX.Element {
  const [searchValue, setSearchValue] = useState(
    (localStorage.getItem('searchValue') as string) || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [contentItem, setContentItem] = useState({
    pagination: {},
    data: [] as Data[],
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
    setContentItem({ data: [] as Data[] });
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${basicURL}?access_key=${KEY}&keywords=${searchValue}&languages=${languages}`
      );
      if (!response.ok) throw new Error('Server error');

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
          <div className="SearchBar-error">{error}. Please try again later</div>
        ) : (contentItem as IContentItem).data.length ? (
          (contentItem as IContentItem).data.map((item): ReactNode => {
            return (
              <SearchResult
                key={item.url}
                author={item.author}
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
                language={item.language}
                country={item.country}
                published_at={item.published_at}
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
