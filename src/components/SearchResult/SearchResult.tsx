import { Data } from 'components/types/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResult.css';

function SearchResult(props: Data): JSX.Element {
  const navigate = useNavigate();
  const date = props.publishedAt.slice(0, 10);

  function handleResult(): void {
    navigate(`/api/${props.title}`);
  }

  return (
    <div className="SearchResult-container" onClick={handleResult}>
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
