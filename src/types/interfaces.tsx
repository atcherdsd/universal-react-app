import { Data, Links } from './types';

export interface IRoutes {
  path: string;
  element: React.ComponentType;
}

export interface IHeaderProps {
  sitename: string;
  links: Links;
}

export interface IAboutData {
  description: string;
}

export interface IContentItem {
  articles: Data[];
}
