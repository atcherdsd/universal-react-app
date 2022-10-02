import React from 'react';
import './App.css';
import Header from './Header';

const links = {
  main: '/',
  'about us': '/about',
};

function App() {
  return (
    <div className="App">
      <Header sitename="smartphone universe" links={links} />
    </div>
  );
}

export default App;
