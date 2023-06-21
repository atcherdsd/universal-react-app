import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import './Api.scss';

const Api: React.FC = (): JSX.Element => {
  return (
    <>
      <hr className="Api-line" />
      <h2 className="Api-title">News aggregator</h2>
      <SearchBar />
    </>
  );
};

export default Api;
