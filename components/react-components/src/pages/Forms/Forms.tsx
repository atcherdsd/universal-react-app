import Form from 'components/Form/Form';
import OrdersList from 'components/OrdersList/OrdersList';
import React, { useState } from 'react';
import './Forms.css';

// interface IAboutProps {
//   p1: string;
//   p2: string;
// }

export type InitialData = Record<string, string>;

// const initialData: InitialData[] = [{ title: 'Your order:' }];

const Forms: React.FC = (): JSX.Element => {
  const [initialData, setInitialData] = useState([] as InitialData[]);

  const addData = (orderCard: Record<string, string>) => {
    initialData.push(orderCard);
    setInitialData(() => [] as InitialData[]);
  };
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
