import Form from 'components/Form/Form';
import OrdersList from 'components/OrdersList/OrdersList';
import { FormData } from 'components/types/types';
import React, { useState } from 'react';
import './Forms.css';

const Forms: React.FC = (): JSX.Element => {
  const [initialData, setInitialData] = useState([] as FormData[]);

  const addData = (orderCard: FormData) => {
    initialData.push(orderCard);
    setInitialData((initialData) => [...initialData]);
  };

  return (
    <>
      <hr className="Forms-line" />
      <h2 className="Forms-title">Ordering</h2>
      <Form addData={addData} />
      <OrdersList />
    </>
  );
};

export default Forms;
