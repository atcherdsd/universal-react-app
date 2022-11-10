import React from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { useAppSelector } from 'store/hooks';
import { formDataGroup } from 'store/selectors';

function OrdersList(): JSX.Element {
  const data = useAppSelector(formDataGroup);

  return (
    <>
      <section className="OrdersList-section">
        {data.length ? <OrderCard /> : <p className="OrdersList-message">No orders</p>}
      </section>
    </>
  );
}

export default OrdersList;
