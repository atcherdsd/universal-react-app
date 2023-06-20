import React, { ReactNode, SyntheticEvent } from 'react';
import { setPageNumber } from 'store/apiSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { apiStateDataSelector } from 'store/selectors';
import './NewsNavigation.css';

function NewsNavigation(): JSX.Element {
  const { apiData, newsCount, pageNumber } = useAppSelector(apiStateDataSelector);
  const dispatch = useAppDispatch();

  const getPagesCount = () => {
    switch (newsCount) {
      case '10':
        return '1';
      case '5':
        return apiData.articles.length > 5 ? '2' : '1';
      case '1':
        return apiData.articles.length;
    }
  };

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    dispatch(setPageNumber(event.currentTarget.value));
  };

  const getPageButtons = () => {
    switch (newsCount) {
      case '10':
        return (
          <button className="NewsNavigation-number active" onClick={handleClick} value="1">
            1
          </button>
        );
      case '5':
        const buttonsCount = apiData.articles.length > 5 ? 2 : 1;
        return Array(buttonsCount)
          .fill(1)
          .map(
            (elem: ReactNode, index: number): ReactNode =>
              (elem = (
                <button
                  className={
                    index + 1 === +pageNumber
                      ? 'NewsNavigation-number active'
                      : 'NewsNavigation-number'
                  }
                  key={index}
                  onClick={handleClick}
                  value={index + 1}
                >
                  {index + 1}
                </button>
              ))
          );
      case '1':
        return Array(apiData.articles.length)
          .fill(1)
          .map(
            (elem: ReactNode, index: number): ReactNode =>
              (elem = (
                <button
                  className={
                    index + 1 === +pageNumber
                      ? 'NewsNavigation-number active'
                      : 'NewsNavigation-number'
                  }
                  key={index}
                  onClick={handleClick}
                  value={index + 1}
                >
                  {index + 1}
                </button>
              ))
          );
    }
  };

  return (
    <div className="NewsNavigation-container">
      <div className="NewsNavigation-content__container">
        <div className="NewsNavigation-title">
          Page {pageNumber}/{getPagesCount()}
        </div>
        <div className="NewsNavigation-buttons">{getPageButtons()}</div>
      </div>
    </div>
  );
}

export default NewsNavigation;
