import { Links, Positions, SearchText } from './types';

export interface IHeaderProps {
  storeName: string;
  links: Links;
}
export interface ISearchProps {
  searchedValue: string;
  searchText: SearchText;
  dataSearch: Positions[];
}
export interface ISearchResultProps {
  title: string;
  id: string;
}
