import React from 'react';
import './Form.css';
import countries from '../../data/countries.json';
import Person from 'components/Person/Person';
import Delivery from 'components/Delivery/Delivery';

function Form(): JSX.Element {
  return (
    <>
      <section className="Form-container">
        <hr className="Form-line"></hr>
        <form className="Form-content__container">
          <h2 className="Form-header">About you</h2>
          <Person />
          <h2 className="Form-header">Delivery</h2>
          <Delivery countries={countries} />
          <input type="submit" className="Form-submit" value="Submit" />
        </form>
        <hr className="Form-line"></hr>
      </section>
    </>
  );
}

export default Form;
