import React, { ReactNode } from 'react';
import goodsData from './data/goods.json';
import Card from './Card';
import './Main.css';

// type Props = {
//   title: string;
//   key: string;
// };

function Main() {
  return (
    <div className="Main-container">
      {goodsData.goods.map((item): ReactNode => {
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
      })}
    </div>
  );
}

export default Main;
