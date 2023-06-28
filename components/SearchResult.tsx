import React, { useState, useEffect } from 'react';
import { ISearchResultProps } from '../types/interfaces';
import { StorageItems } from '../types/enums';
import { useRouter } from 'next/router';

const SearchResult = (props: ISearchResultProps): React.JSX.Element => {
  let unit: string | undefined;

  if (typeof window !== 'undefined') {
    unit = localStorage.getItem(StorageItems.SelectedUnit) as string;
  }
  const router = useRouter();
  const [selectedUnit, setSelectedUnit] = useState(unit || '');

  function handleResult(): void {
    setSelectedUnit(props.id);
    router.push(`/${props.id}`);
  }

  function setLocalStorage(): void {
    if (typeof window !== undefined) localStorage.setItem(StorageItems.SelectedUnit, selectedUnit);
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
