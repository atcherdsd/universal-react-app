import React, { ReactNode } from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { InitialData } from 'pages/Forms/Forms';

function OrdersList(props: { data: InitialData[] }): JSX.Element {
  const data = props.data;
  console.log('data from OrdersList:', data);
  return (
    <>
      <section className="OrdersList-section">
        {data.length ? (
          data.map((item: InitialData): ReactNode => {
            return (
              <OrderCard
                key={item.key}
                gender={item.gender}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                birthday={item.birthday}
                file={item.file}
                promotions={item.promotions}
                personalData={item.personalData}
                bonusProgram={item.bonusProgram}
                country={item.country}
                zipCode={item.zipCode}
                deliveryDate={item.deliveryDate}
              />
            );
          })
        ) : (
          <p className="OrdersList-message">No orders</p>
        )}
      </section>
    </>
  );
}

export default OrdersList;
