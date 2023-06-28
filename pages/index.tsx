import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../components/Header';
import { GoodsData, Links, Positions } from '../types/types';
import Search from '../components/Search';
import { LinksItems, StorageItems } from '../types/enums';

export interface PropsTypes {
  storeName: string;
  links: Links;
  goodsData: GoodsData;
}

const Main: NextPage<{ storeName: string; links: Links; goodsData: GoodsData }> = ({
  storeName,
  links,
  goodsData,
}: PropsTypes): React.JSX.Element => {
  let value: string | undefined;

  if (typeof window !== 'undefined') {
    value = localStorage.getItem(StorageItems.SearchedValue) as string;
  }
  const [searchedValue, setSearchedValue] = useState(value || '');

  function searchText(event: { target: { value: string } }): void {
    setSearchedValue(event.target.value);
  }

  const dataSearch: Positions[] = goodsData.goods.filter(
    (item: Positions): boolean =>
      item.title.toString().toLowerCase().includes(searchedValue.toString().toLowerCase()) ||
      item.description.info
        .toString()
        .toLowerCase()
        .includes(searchedValue.toString().toLowerCase())
  );

  function setLocalStorage(): void {
    if (typeof window !== undefined)
      localStorage.setItem(StorageItems.SearchedValue, searchedValue);
  }
  useEffect(setLocalStorage, [searchedValue]);

  return (
    <>
      <Header storeName={storeName} links={links} />
      <Search searchedValue={searchedValue} searchText={searchText} dataSearch={dataSearch} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const storeName = 'smartphone universe';
  const links: Links = {
    main: LinksItems.Goods,
    about: LinksItems.About,
  };
  const goodsData: GoodsData = JSON.parse(
    JSON.stringify(await import('../data/goods.json', { assert: { type: 'json' } }))
  );

  return {
    props: {
      storeName,
      links,
      goodsData,
    },
  };
};

export default Main;
