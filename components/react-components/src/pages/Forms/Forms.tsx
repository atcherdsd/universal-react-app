import Form from 'components/Form/Form';
import OrdersList from 'components/OrdersList/OrdersList';
import React, { useState } from 'react';
import './Forms.css';

// interface IAboutProps {
//   p1: string;
//   p2: string;
// }

export type InitialData = {
  key: string;
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  file: string;
  promotions: string;
  personalData: string;
  bonusProgram: string;
  country: string;
  zipCode: string;
  deliveryDate: string;
};

// const initialData: InitialData[] = [{ title: 'Your order:' }];

const Forms: React.FC = (): JSX.Element => {
  const [initialData, setInitialData] = useState([] as InitialData[]);

  const addData = (orderCard: InitialData) => {
    initialData.push(orderCard);
    setInitialData((initialData) => [...initialData]);
  };
  console.log('initialData from Forms:', initialData);

  return (
    <>
      <hr className="Forms-line" />
      <h2 className="Forms-title">Ordering</h2>
      <Form addData={addData} />
      <OrdersList data={initialData} />
    </>
  );
};

export default Forms;
