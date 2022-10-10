import React from 'react';

function Person(): JSX.Element {
  return (
    <div className="Form-content">
      <div className="Form-field">
        <div className="Form-radio-text">Salutation</div>
        <div className="Form-control">
          <label className="Form-label">
            <input className="Form-radio" type="radio" name="gender" value="Mr" />
            Mr
          </label>
          <label className="Form-label">
            <input className="Form-radio" type="radio" name="gender" value="Mrs" />
            Mrs
          </label>
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">First Name *</label>
        <div className="Form-control">
          <input className="Form-input" type="text" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Last Name *</label>
        <div className="Form-control">
          <input className="Form-input" type="text" />
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
        <div className="Form-control">
          <input className="Form-input" type="date" />
        </div>
      </div>
      <div className="Form-field">
        <label className="Form-label">Upload image</label>
        <div className="Form-control">
          <input className="Form-input" type="file" accept="image/*" />
        </div>
      </div>
      <div className="Form-field">
        <div className="Form-control">
          <label className="Form-label">
            <input className="Form-radio" type="radio" name="promotions" value="Want receive" />I
            want to receive notifications about promo and sales by e-mail
          </label>
          <label className="Form-label">
            <input
              className="Form-radio"
              type="radio"
              name="promotions"
              value="Don't want receive"
            />
            I don’t want to receive notifications about promo and sales by e-mail
          </label>
        </div>
      </div>
      <div className="Form-field">
        <div className="Form-control">
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
    </div>
  );
}

export default Person;
