import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchResult.css';
import { ISearchResultProps } from '../types/interfaces';
import { StorageItems } from '../types/enums';

const SearchResult = (props: ISearchResultProps): React.JSX.Element => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(
    (localStorage.getItem(StorageItems.SelectedUnit) as string) || ''
  );

  function handleResult(): void {
    setSelectedUnit(props.key);
    navigate(`/goods/${props.title}`);
  }

  function setLocalStorage(): void {
    localStorage.setItem(StorageItems.SelectedUnit, selectedUnit);
  }
  useEffect(setLocalStorage, [selectedUnit]);

  return (
    <div className="SearchResult-container" onClick={handleResult}>
      <div className="SearchResult-content__container">
        <div className="SearchResult-main-content">
          <div className="SearchResult-title">{props.title}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
