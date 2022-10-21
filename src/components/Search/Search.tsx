import React, { ReactNode, useEffect, useState } from 'react';
import './Search.css';
import goodsData from '../../data/goods.json';
import Card from '../../components/Card/Card';

export type Positions = {
  title: string;
  review: string;
  rating: string;
  price: string;
  stock: string;
  delivery: string;
  logo: string;
  img: string;
  description: {
    info: string[];
  };
};

function Search(): JSX.Element {
  const [searchValue, setSearchValue] = useState(
    (localStorage.getItem('searchValue') as string) || ''
  );

  function searchText(event: { target: { value: string } }): void {
    setSearchValue(event.target.value);
  }

  const dataSearch: Positions[] = goodsData.goods.filter(
    (item: Positions): boolean =>
      item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()) ||
      item.description.info.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
  );

  function setLocalStorage(): void {
    localStorage.setItem('searchValue', searchValue);
  }
  useEffect(setLocalStorage, [searchValue]);

  return (
    <>
      <section className="Search-section">
        <hr className="Search-line"></hr>
        <h1 className="Search-title">Search:</h1>
        <div className="Search-container">
          <input
            className="Search-input"
            type="search"
            placeholder="What are you looking for?"
            autoFocus
            onChange={searchText}
            value={searchValue}
          />
        </div>
        <hr className="Search-line"></hr>
      </section>
      <>
        {dataSearch.length ? (
          dataSearch.map((item): ReactNode => {
            return (
              <Card
                key={item.title}
                title={item.title}
                review={item.review}
                rating={item.rating}
                price={item.price}
                stock={item.stock}
                delivery={item.delivery}
                logo={item.logo}
                img={item.img}
                description={item.description}
              />
            );
          })
        ) : (
          <p className="Search-warning">Sorry! No matches found</p>
        )}
      </>
    </>
  );
}

export default Search;
