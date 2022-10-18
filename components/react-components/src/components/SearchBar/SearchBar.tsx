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
const KEY = '0b4c84b5f95151eef1cf75d1eaa4ddc0';
const languages = 'en,-zh,-ar';

function SearchBar(): JSX.Element {
  const [searchValue, setSearchValue] = useState(
    (localStorage.getItem('searchValue') as string) || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setContentItem({ data: [] as Data[] });
    setIsLoading(true);
    const url = 'http://api.mediastack.com/v1/news';
    try {
      const response = await fetch(
        `${url}?access_key=${KEY}&keywords=${searchValue}&languages=${languages}`
      );
      console.log(response);
      if (!response.ok) throw new Error('Server error');

      const data: IContentItem = await response.json();
      console.log('data from api', data);
      setContentItem(data);
      console.log('after api: ', data);
    } catch (err) {
      console.error((err as Error).message);
      throw err;
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
        {(contentItem as IContentItem).data.length ? (
          (contentItem as IContentItem).data.map((item): ReactNode => {
            console.log('contentItem', contentItem);
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
          <p className="SearchBar-warning">Sorry! No matches found</p>
        )}
      </div>
    </>
  );
}

export default SearchBar;
