import Form from 'components/Form/Form';
import OrdersList from 'components/OrdersList/OrdersList';
import React from 'react';
import './Forms.css';

const Forms: React.FC = (): JSX.Element => {
  return (
    <>
      <hr className="Forms-line" />
      <h2 className="Forms-title">Ordering</h2>
      <Form />
      <OrdersList />
    </>
  );
};

export default Forms;
