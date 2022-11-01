import { IContentItem } from 'components/types/interfaces';
import { Data } from 'components/types/types';
import React, { createContext, useState, ReactNode } from 'react';

const initialState = { articles: [] };
const ApiContext = createContext<IContentItem>(initialState);

const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contentItem] = useState({
    articles: [] as Data[],
  } as IContentItem);

  return <ApiContext.Provider value={contentItem}>{children}</ApiContext.Provider>;
};

export default ApiContext;
ApiProvider;
