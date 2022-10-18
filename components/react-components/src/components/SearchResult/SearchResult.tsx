import { Data } from 'components/SearchBar/SearchBar';
import React from 'react';
import './SearchResult.css';

function SearchResult(props: Data): JSX.Element {
  const date = props.published_at.slice(0, 10);
  return (
    <div className="SearchResult-container">
      <div className="SearchResult-content__container">
        <div className="SearchResult-main-content">
          <div className="SearchResult-title">{props.title}</div>
          <div className="SearchResult-date">Publication date: {date}</div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
