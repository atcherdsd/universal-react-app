import React from 'react';
import './OrderCard.css';

function OrderCard(props: Record<string, string>): JSX.Element {
  return (
    <div className="OrderCard-container">
      <div>{props.text}</div>
      <div className="OrderCard-item">
        <div>Order accepted from </div>
        <div>Mr. Tom Din</div>
      </div>
      <div className="OrderCard-item">
        <div>For communication provided email </div>
        <div>wer@we.io</div>
      </div>
      <div className="OrderCard-item">
        <div>Client&apos;s date of birth </div>
        <div>01.01.2000</div>
      </div>
      <div className="OrderCard-item">
        <div>Provided image </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Receiving notifications: </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Permission to use personal data: </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Participation in promotions: </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Delivery country: </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Zip-code: </div>
        <div>...</div>
      </div>
      <div className="OrderCard-item">
        <div>Delivery date: </div>
        <div>...</div>
      </div>
    </div>
  );
}

export default OrderCard;
