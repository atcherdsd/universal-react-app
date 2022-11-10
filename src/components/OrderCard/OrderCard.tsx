// import { FormData } from 'components/types/types';
import React, { useContext } from 'react';
import { AppContext } from 'store/context';
import './OrderCard.css';

function OrderCard(): JSX.Element {
  const { state } = useContext(AppContext);

  const data = state.formStateData.formDataGroup;

  return (
    <>
      {data.map((props) => {
          return (
            <div className="OrderCard-container" key={props.key}>
              <h2 className="OrderCard-title">Accepted order</h2>
              <div className="OrderCard-item">
                <div>Order accepted from </div>
                <div>
                  {props.gender} {props.firstName} {props.lastName}
                </div>
              </div>
              <div className="OrderCard-item">
                <div>For communication provided email </div>
                <div>{props.email}</div>
              </div>
              <div className="OrderCard-item">
                <div>Client&apos;s date of birth </div>
                {props.birthday ? <div>{props.birthday}</div> : 'No data'}
              </div>
              <div className="OrderCard-item">
                <div>Provided image </div>
                <div>{props.file}</div>
              </div>
              <div className="OrderCard-item">
                <div>Receiving notifications: </div>
                <div>{props.promotions}</div>
              </div>
              <div className="OrderCard-item">
                <div>Permission to use personal data: </div>
                <div>{props.personalData ? 'Yes' : 'No'}</div>
              </div>
              <div className="OrderCard-item">
                <div>Participation in bonus programs: </div>
                <div>{props.bonusProgram ? 'Yes' : 'No'}</div>
              </div>
              <div className="OrderCard-item">
                <div>Delivery country: </div>
                <div>{props.country}</div>
              </div>
              <div className="OrderCard-item">
                <div>Zip-code: </div>
                <div>{props.zipCode}</div>
              </div>
              <div className="OrderCard-item">
                <div>Delivery date: </div>
                <div>{props.deliveryDate}</div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default OrderCard;
