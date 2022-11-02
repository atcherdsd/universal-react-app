import React, { ReactNode, useContext } from 'react';
import './OrdersList.css';
import OrderCard from 'components/OrderCard/OrderCard';
import { FormData } from 'components/types/types';
import { AppContext } from 'store/context';

function OrdersList(): JSX.Element {
  const { state } = useContext(AppContext);

  const data = state.formStateData.formDataGroup;
  return (
    <>
      <section className="OrdersList-section">
        {data.length ? (
          data.map((item: FormData): ReactNode => {
            return (
              <OrderCard
                key={item.key}
                // gender={item.gender}
                // firstName={item.firstName}
                // lastName={item.lastName}
                // email={item.email}
                // birthday={item.birthday}
                // file={item.file}
                // promotions={item.promotions}
                // personalData={item.personalData}
                // bonusProgram={item.bonusProgram}
                // country={item.country}
                // zipCode={item.zipCode}
                // deliveryDate={item.deliveryDate}
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
