import { Data } from 'types/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResult.scss';

function SearchResult(props: Data): JSX.Element {
  const navigate = useNavigate();
  const date = props.publishedAt.slice(0, 10);
  const encodedTitle = encodeURIComponent(props.title);

  function handleResult(): void {
    navigate(`/api/${encodedTitle}`);
  }

  return (
    <div className="SearchResult-container" onClick={handleResult}>
      <div className="SearchResult-content__container">
        <div className="SearchResult-main-content">
          <div className="SearchResult-title">{props.title}</div>
          <div className="SearchResult-date">
            Publication date: <span className="SearchResult-parse">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
