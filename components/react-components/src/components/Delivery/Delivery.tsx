import React, { ReactNode } from 'react';

type Country = {
  name: string;
  code: string;
};

type Countries = {
  countries: Country[];
};

function Delivery(props: Countries): JSX.Element {
  return (
    <div className="Form-content">
      <div className="Form-field">
        <label className="Form-label">Choose your country</label>
        <div className="Form-control__country">
          <select defaultValue="country" className="Form-select">
            <option value="country" disabled>
              Choose a country
            </option>
            {props.countries.map((elem: Country): ReactNode => {
              return (
                <option className="Form-select__item" value={elem.name} key={elem.code}>
                  {elem.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Zip-code</label>
        <div className="Form-control__zip">
          <input className="Form-input" type="text" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Delivery date</label>
        <div className="Form-control__date">
          <input className="Form-input__date" type="date" />
        </div>
      </div>
    </div>
  );
}

export default Delivery;
