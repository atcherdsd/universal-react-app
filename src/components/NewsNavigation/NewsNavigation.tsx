import { NewsCount, PageNumber } from 'components/types/enums';
import React, { ReactNode, SyntheticEvent, useContext } from 'react';
import { AppContext } from 'store/context';
import { Types } from 'store/reducers';
import './NewsNavigation.css';

function NewsNavigation(): JSX.Element {
  const { state, dispatch } = useContext(AppContext);
  const { newsCount, pageNumber } = state.apiStateData;

  const getPageCount = () => {
    switch (newsCount) {
      case NewsCount.Ten:
        return PageNumber.One;
      case NewsCount.Five:
        return PageNumber.Two;
    }
  };

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    dispatch({ type: Types.SetPageNumber, payload: event.currentTarget.value });
  };

  const getPageButtons = () => {
    switch (newsCount) {
      case NewsCount.Ten:
        return (
          <button className="NewsNavigation-number active" onClick={handleClick} value="1">
            {PageNumber.One}
          </button>
        );
      case NewsCount.Five:
        return Array(+PageNumber.Two)
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
        <div className="NewsNavigation-main-content">
          <div className="NewsNavigation-title">
            Page {pageNumber}/{getPageCount()}
          </div>
        </div>
        {getPageButtons()}
      </div>
    </div>
  );
}

export default NewsNavigation;
