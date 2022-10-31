import { Data, HandleResult, Links } from './types';

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

export interface IModalProps {
  data: Data;
  date: string;
  handleResult: HandleResult;
}
