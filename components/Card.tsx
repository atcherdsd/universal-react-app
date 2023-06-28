import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Positions } from '../types/types';

const Card = (props: Positions): JSX.Element => {
  return (
    <div className="Card-wrapper">
      <hr className="Card-line__up"></hr>
      <div className="Card-container">
        <div className="Card-header">
          <div className="Card-title">{props.title}</div>
          <div className="Card-logo__container">
            <Image className="Card-logo" src={props.logo} width={24} height={24} alt="Brand" />
          </div>
        </div>
        <div className="Card-content__container">
          <div className="Card-image-container">
            <Image
              className="Card-image"
              src={props.img}
              width={160}
              height={160}
              alt="Smartphone"
            />
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
                <ul>
                  {props.description.info.map((elem: string): ReactNode => {
                    return (
                      <li className="Card-description__item" key={elem}>
                        {elem}
                      </li>
                    );
                  })}
                </ul>
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
    </div>
  );
};

export default Card;
