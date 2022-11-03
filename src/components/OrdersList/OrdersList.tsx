import React, { useContext } from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { AppContext } from 'store/context';

function OrdersList(): JSX.Element {
  const { state } = useContext(AppContext);

  const data = state.formStateData.formDataGroup;
  return (
    <>
      <section className="OrdersList-section">
        {data.length ? <OrderCard /> : <p className="OrdersList-message">No orders</p>}
      </section>
    </>
  );
}

export default OrdersList;
