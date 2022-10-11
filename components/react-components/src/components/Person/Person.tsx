import React from 'react';

function Person(): JSX.Element {
  return (
    <div className="Form-content">
      <div className="Form-field">
        <div className="Form-radio-text">Salutation</div>
        <div className="Form-control__radio">
          <label className="Form-radio__label">
            <input className="Form-radio__point" type="radio" name="gender" value="Mr" />
            <span className="Form-radio__value">Mr</span>
          </label>
          <label className="Form-radio__label">
            <input className="Form-radio__point" type="radio" name="gender" value="Mrs" />
            <span className="Form-radio__value">Mrs</span>
          </label>
        </div>
      </div>
      <div className="Form-name">
        <div className="Form-field__name">
          <label className="Form-label">First Name *</label>
          <div className="Form-control">
            <input className="Form-input" type="text" />
          </div>
        </div>
        <div className="Form-field__name">
          <label className="Form-label">Last Name *</label>
          <div className="Form-control">
            <input className="Form-input" type="text" />
          </div>
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">E-Mail *</label>
        <div className="Form-control">
          <input className="Form-input" type="email" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Birthday</label>
        <div className="Form-control__date">
          <input className="Form-input" type="date" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Choose image to upload</label>
        <div className="Form-control__file">
          <input className="Form-input__file" type="file" accept="image/*" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">
          <input className="Form-radio" type="radio" name="promotions" value="Want receive" />I want
          to receive notifications about promo and sales by e-mail
        </label>
        <label className="Form-label">
          <input className="Form-radio" type="radio" name="promotions" value="Don't want receive" />
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
          />
          I agree to the use of my personal data for advertising purposes
        </label>
        <label className="Form-label">
          <input
            className="Form-checkbox"
            type="checkbox"
            name="bonus"
            value="Don't want receive"
          />
          I would like to take part in the free bonus points program
        </label>
      </div>
    </div>
  );
}

export default Person;
