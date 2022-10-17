// import Form from 'components/Form/Form';
// import OrdersList from 'components/OrdersList/OrdersList';
import React from 'react';
import './Api.css';

// export type InitialData = {
//   key: string;
//   gender: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthday: string;
//   file: string;
//   promotions: string;
//   personalData: string;
//   bonusProgram: string;
//   country: string;
//   zipCode: string;
//   deliveryDate: string;
// };

const Api: React.FC = (): JSX.Element => {
  //   const [initialData, setInitialData] = useState([] as InitialData[]);

  //   const addData = (orderCard: InitialData) => {
  //     initialData.push(orderCard);
  //     setInitialData((initialData) => [...initialData]);
  // };

  return (
    <>
      <hr className="Api-line" />
      <h2 className="Api-title">Api</h2>
      {/* <Form addData={addData} />
      <OrdersList data={initialData} /> */}
    </>
  );
};

export default Api;
