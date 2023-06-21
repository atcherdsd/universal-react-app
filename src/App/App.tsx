import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import About from 'pages/About/About';
import NotFound from 'pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import Api from 'pages/Api/Api';
import { Links } from 'types/types';
import { IRoutes } from 'types/interfaces';
import News from 'pages/News/News';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';

export const links: Links = {
  main: '/',
  'about us': '/about',
};

const routes: IRoutes[] = [
  {
    path: links.main,
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="App">
        <Header sitename="news universe" links={links} />
      </div>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
