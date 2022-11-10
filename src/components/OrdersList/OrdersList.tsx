import React from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootReducer } from 'store/store';

function OrdersList(): JSX.Element {
  const selector: TypedUseSelectorHook<RootReducer> = useSelector;
  const data = selector((state) => state.formStateData.formDataGroup);

  return (
    <>
      <section className="OrdersList-section">
        {data.length ? <OrderCard /> : <p className="OrdersList-message">No orders</p>}
      </section>
    </>
  );
}

export default OrdersList;
