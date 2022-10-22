import Modal from 'components/Modal/Modal';
import { Data } from 'components/utilities/types';
import React, { useState } from 'react';
import './SearchResult.css';

function SearchResult(props: Data): JSX.Element {
  const date = props.publishedAt.slice(0, 10);
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  function handleResult(): void {
    setIsOpenedModal(!isOpenedModal);
  }

  return (
    <div className="SearchResult-container" onClick={handleResult}>
      <div className="SearchResult-content__container">
        <div className="SearchResult-main-content">
          <div className="SearchResult-title">{props.title}</div>
          <div className="SearchResult-date">Publication date: {date}</div>
        </div>
      </div>
      {isOpenedModal && (
        <div className="SearchResult-modal" onClick={handleResult}>
          <Modal data={props} handleResult={handleResult} />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
