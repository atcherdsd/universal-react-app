import React, { ReactNode } from 'react';
import { ISearchProps } from '../types/interfaces';
import SearchResult from './SearchResult';

const Search = ({ searchedValue, searchText, dataSearch }: ISearchProps): JSX.Element => {
  return (
    <div className="Search-wrapper">
      <section className="Search-section">
        <hr className="Search-line"></hr>
        <h1 className="Search-title">Search:</h1>
        <form className="Search-container">
          <input
            name="searchGoods"
            id="searchGoods"
            className="Search-input"
            type="search"
            placeholder="What are you looking for?"
            autoFocus
            onChange={searchText}
            value={searchedValue}
          />
        </form>
        <hr className="Search-line"></hr>
      </section>
      <>
        {dataSearch.length ? (
          dataSearch.map((item): ReactNode => {
            return <SearchResult key={item.id} title={item.title} id={item.id} />;
          })
        ) : (
          <p className="Search-warning">Sorry! No matches found</p>
        )}
      </>
    </div>
  );
};

export default Search;
