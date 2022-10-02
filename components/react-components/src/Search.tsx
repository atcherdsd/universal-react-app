import React, { ReactNode, useEffect, useState } from 'react';
import './Search.css';
import goodsData from './data/goods.json';
import Card from './Card';

type Positions = {
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

function Search() {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') as string);

  function searchText(event: { target: { value: string } }) {
    setSearchValue(event.target.value);
  }

  const dataSearch = goodsData.goods.filter(
    (item: Positions) =>
      item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()) ||
      item.description.info.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
  );

  function setLocalStorage() {
    localStorage.setItem('searchValue', searchValue);
  }
  useEffect(setLocalStorage);

  return (
    <>
      <section className="Search-section">
        <hr className="Search-line"></hr>
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
