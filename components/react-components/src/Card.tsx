import React, { ReactNode } from 'react';
import './Card.css';

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

function Card(props: Positions) {
  return (
    <div className="Card-container">
      <div className="Card-header">
        <div className="Card-title">{props.title}</div>
        <div className="Card-logo__container">
          <img className="Card-logo" src={props.logo} alt="Brand" />
        </div>
      </div>
      <div className="Card-content__container">
        <div className="Card-image-container">
          <img className="Card-image" src={props.img} alt="Smartphone" />
        </div>
        <div className="Card-main-content">
          <div className="Card-review__container">
            <div className="Card-review">
              <div className="Card-review-text">Expert review</div>
              <div className="Card-review-base">{props.review}</div>
            </div>
            <div className="Card-rating__container">
              <div className="Card-rating">{props.rating}</div>
              <div className="Card-rating-text">from 5</div>
            </div>
          </div>
          <div className="Card-description__container">
            <div className="Card-description">
              {props.description.info.map((elem): ReactNode => {
                return (
                  <li className="Card-description__item" key={elem}>
                    {elem}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div className="Card-price__container">
          <div className="Card-price">{props.price}</div>
          <div className="Card-stock">{props.stock}</div>
          <div className="Card-dispatch">{props.delivery}</div>
        </div>
      </div>
      <hr className="Card-line"></hr>
    </div>
  );
}

export default Card;
