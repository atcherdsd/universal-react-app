import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import { ApiProvider } from 'store/context';
import './Api.css';

const Api: React.FC = (): JSX.Element => {
  return (
    <>
      <hr className="Api-line" />
      <h2 className="Api-title">News aggregator</h2>
      <ApiProvider>
        <SearchBar />
      </ApiProvider>
    </>
  );
};

export default Api;
