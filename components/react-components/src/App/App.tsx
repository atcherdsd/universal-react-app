import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import About from 'pages/About/About';
import Forms from 'pages/Forms/Forms';
import Main from 'pages/Main/Main';
import NotFound from 'pages/NotFound/NotFound';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import about from '../data/about.json';
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

const [aboutData1, aboutData2] = about.aboutData;
function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header sitename="smartphone universe" links={links} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/forms" element={<Forms />} />
          <Route
            path="/about"
            element={<About p1={aboutData1.description} p2={aboutData2.description} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
