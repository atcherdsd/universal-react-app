import Form from 'components/Form/Form';
import React from 'react';
import './Forms.css';

// interface IAboutProps {
//   p1: string;
//   p2: string;
// }

const Forms: React.FC = (): JSX.Element => {
  return (
    <>
      <hr className="Forms-line" />
      <h2 className="Forms-title">Ordering</h2>
      <Form />
      {/* <OrdersList /> */}
    </>
  );
};

export default Forms;
