import React from 'react';
import './App.css';
import Header from '../components/Header/Header';

type Links = {
  main: string;
  forms: string;
  'about us': string;
};

const links: Links = {
  main: '/',
  forms: '/forms',
  'about us': '/about',
};

function App(): JSX.Element {
  return (
    <div className="App">
      <Header sitename="smartphone universe" links={links} />
    </div>
  );
}

export default App;
