import React, { ReactNode } from 'react';
import '../styles/Search.css';
import { ISearchProps } from '../types/interfaces';
import SearchResult from './SearchResult';

const Search = ({ searchedValue, searchText, dataSearch }: ISearchProps): JSX.Element => {
  return (
    <div className="Search-wrapper">
      <section className="Search-section">
        <hr className="Search-line"></hr>
        <h1 className="Search-title">Search:</h1>
        <div className="Search-container">
          <input
            className="Search-input"
            type="search"
            placeholder="What are you looking for?"
            autoFocus
            onChange={searchText}
            value={searchedValue}
          />
        </div>
        <hr className="Search-line"></hr>
      </section>
      <>
        {dataSearch.length ? (
          dataSearch.map((item): ReactNode => {
            return <SearchResult key={item.id} title={item.title} />;
          })
        ) : (
          <p className="Search-warning">Sorry! No matches found</p>
        )}
      </>
    </div>
  );
};

export default Search;
