import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import About from 'pages/About/About';
import Forms from 'pages/Forms/Forms';
import Main from 'pages/Main/Main';
import NotFound from 'pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import Api from 'pages/Api/Api';
import { Links } from 'types/types';
import { IRoutes } from 'types/interfaces';
// import { AppProvider } from 'store/context';
import News from 'pages/News/News';

export const links: Links = {
  main: '/',
  forms: '/forms',
  API: '/api',
  'about us': '/about',
};

const routes: IRoutes[] = [
  {
    path: links.main,
    element: Main,
  },
  {
    path: links.forms,
    element: Forms,
  },
  {
    path: links.API,
    element: Api,
  },
  {
    path: links['about us'],
    element: About,
  },
  {
    path: '/api/:title',
    element: News,
  },
  {
    path: '*',
    element: NotFound,
  },
];

function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <Header sitename="smartphone universe" links={links} />
      </div>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
