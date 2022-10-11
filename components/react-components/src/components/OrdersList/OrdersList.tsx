import React, { ReactNode } from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { InitialData } from 'pages/Forms/Forms';

// export type Positions = {
//   title: string;
//   review: string;
//   rating: string;
//   price: string;
//   stock: string;
//   delivery: string;
//   logo: string;
//   img: string;
//   description: {
//     info: string[];
//   };
// };

function OrdersList(props: { data: InitialData[] }): JSX.Element {
  const data = props.data;
  return (
    <>
      <section className="OrdersList-section">
        {data.length ? (
          data.map((item): ReactNode => {
            return <OrderCard key={item.title} text={item.title} />;
          })
        ) : (
          <p className="OrdersList-message">No orders</p>
        )}
      </section>
    </>
  );
}

export default OrdersList;
