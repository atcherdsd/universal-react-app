import React, { RefObject, useRef } from 'react';

type ListHandlers = {
  listHandlers: {
    genderHandler: React.ChangeEventHandler<HTMLInputElement>;
    firstNameHandler: React.ChangeEventHandler<HTMLInputElement>;
    lastNameHandler: React.ChangeEventHandler<HTMLInputElement>;
    emailHandler: React.ChangeEventHandler<HTMLInputElement>;
    birthdayNameHandler: React.ChangeEventHandler<HTMLInputElement>;
    fileHandler: React.ChangeEventHandler<HTMLInputElement>;
    promoHandler: React.ChangeEventHandler<HTMLInputElement>;
    personalHandler: React.ChangeEventHandler<HTMLInputElement>;
    bonusHandler: React.ChangeEventHandler<HTMLInputElement>;
  };
};

export let gender: React.LegacyRef<HTMLInputElement>;

function Person(props: ListHandlers): JSX.Element {
  gender = useRef() as RefObject<HTMLInputElement>;
  return (
    <div className="Form-content">
      <div className="Form-field">
        <div className="Form-radio-text">Salutation</div>
        <div className="Form-control__radio">
          <label className="Form-radio__label">
            <input
              className="Form-radio__point"
              type="radio"
              name="gender"
              value="Mr"
              onChange={props.listHandlers.genderHandler}
              ref={gender}
            />
            <span className="Form-radio__value">Mr</span>
          </label>
          <label className="Form-radio__label">
            <input
              className="Form-radio__point"
              type="radio"
              name="gender"
              value="Mrs"
              onChange={props.listHandlers.genderHandler}
            />
            <span className="Form-radio__value">Mrs</span>
          </label>
        </div>
      </div>
      <div className="Form-name">
        <div className="Form-field__name">
          <label className="Form-label">First Name *</label>
          <div className="Form-control">
            <input
              className="Form-input"
              type="text"
              onChange={props.listHandlers.firstNameHandler}
            />
          </div>
        </div>
        <div className="Form-field__name">
          <label className="Form-label">Last Name *</label>
          <div className="Form-control">
            <input
              className="Form-input"
              type="text"
              onChange={props.listHandlers.lastNameHandler}
            />
          </div>
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">E-Mail *</label>
        <div className="Form-control">
          <input className="Form-input" type="email" onChange={props.listHandlers.emailHandler} />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Birthday</label>
        <div className="Form-control__date">
          <input
            className="Form-input__date"
            type="date"
            onChange={props.listHandlers.birthdayNameHandler}
          />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Choose image to upload</label>
        <div className="Form-control__file">
          <input
            className="Form-input__file"
            type="file"
            accept="image/*"
            onChange={props.listHandlers.fileHandler}
          />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">
          <input
            className="Form-radio"
            type="radio"
            name="promotions"
            value="Want receive"
            onChange={props.listHandlers.promoHandler}
          />
          I want to receive notifications about promo and sales by e-mail
        </label>
        <label className="Form-label">
          <input
            className="Form-radio"
            type="radio"
            name="promotions"
            value="Don't want receive"
            onChange={props.listHandlers.promoHandler}
          />
          I don’t want to receive notifications about promo and sales by e-mail
        </label>
      </div>
      <div className="Form-field">
        <label className="Form-label">
          <input
            className="Form-checkbox"
            type="checkbox"
            name="personal-data"
            value="Want receive"
            onChange={props.listHandlers.personalHandler}
          />
          I agree to the use of my personal data for advertising purposes
        </label>
        <label className="Form-label">
          <input
            className="Form-checkbox"
            type="checkbox"
            name="bonus"
            value="Don't want receive"
            onChange={props.listHandlers.bonusHandler}
          />
          I would like to take part in the free bonus points program
        </label>
      </div>
    </div>
  );
}

export default Person;
