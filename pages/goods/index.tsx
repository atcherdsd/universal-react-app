import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../../components/Header';
import { GoodsData, Links, Positions } from '../../types/types';
import Search from '../../components/Search';
import { StorageItems } from '../../types/enums';
import '../../styles/global.css';

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
  const [searchedValue, setSearchedValue] = useState(
    (localStorage.getItem(StorageItems.SearchedValue) as string) || ''
  );

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
    main: '/',
    about: '/about',
  };
  const goodsData: GoodsData = await import('../../data/goods.json', { assert: { type: 'json' } });

  return {
    props: {
      storeName,
      links,
      goodsData,
    },
  };
};

export default Main;
