import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import About from 'pages/About/About';
import Forms from 'pages/Forms/Forms';
import Main from 'pages/Main/Main';
import NotFound from 'pages/NotFound/NotFound';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Api from 'pages/Api/Api';

type Links = {
  main: string;
  forms: string;
  api: string;
  'about us': string;
};

const links: Links = {
  main: '/',
  forms: '/forms',
  api: '/api',
  'about us': '/about',
};

interface IRoutes {
  path: string;
  element: React.ComponentType;
}

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
    path: links.api,
    element: Api,
  },
  {
    path: links['about us'],
    element: About,
  },
  {
    path: '*',
    element: NotFound,
  },
];

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header sitename="smartphone universe" links={links} />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
