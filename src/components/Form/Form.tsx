import React, { FormEvent, ReactNode, RefObject, useRef, useState } from 'react';
import './Form.css';
import countries from '../../data/countries.json';
import { InitialData, FormData, Country } from 'components/utilities/types';

function Form(props: { addData: (orderCard: InitialData) => void }): JSX.Element {
  let formData = {} as FormData;

  function clearFormData() {
    formData = {
      key: '',
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      file: '',
      promotions: '',
      personalData: '',
      bonusProgram: '',
      country: '',
      zipCode: '',
      deliveryDate: '',
    };
  }

  const genderMrInput = useRef() as RefObject<HTMLInputElement>;
  const genderMrsInput = useRef() as RefObject<HTMLInputElement>;
  const firstInput = useRef() as RefObject<HTMLInputElement>;
  const lastInput = useRef() as RefObject<HTMLInputElement>;
  const emailInput = useRef() as RefObject<HTMLInputElement>;
  const birthdayInput = useRef() as RefObject<HTMLInputElement>;
  const fileInput = useRef() as RefObject<HTMLInputElement>;
  const promoWantInput = useRef() as RefObject<HTMLInputElement>;
  const promoDontInput = useRef() as RefObject<HTMLInputElement>;
  const personalDataInput = useRef() as RefObject<HTMLInputElement>;
  const bonusInput = useRef() as RefObject<HTMLInputElement>;
  const countrySelect = useRef() as RefObject<HTMLSelectElement>;
  const zipInput = useRef() as RefObject<HTMLInputElement>;
  const deliveryDateInput = useRef() as RefObject<HTMLInputElement>;
  const submitButton = useRef() as RefObject<HTMLInputElement>;

  function clearFilledForm(): void {
    genderMrInput.current!.checked = false;
    genderMrsInput.current!.checked = false;
    firstInput.current!.value = '';
    lastInput.current!.value = '';
    emailInput.current!.value = '';
    birthdayInput.current!.value = '';
    fileInput.current!.value = '';
    promoWantInput.current!.checked = false;
    promoDontInput.current!.checked = false;
    personalDataInput.current!.checked = false;
    bonusInput.current!.checked = false;
    countrySelect.current!.value = 'country';
    zipInput.current!.value = '';
    deliveryDateInput.current!.value = '';
  }

  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [errorPromotions, setErrorPromotions] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [errorZip, setErrorZip] = useState('');
  const [errorDeliveryDate, setErrorDeliveryDate] = useState('');

  function resetErrorMessages(): void {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorEmail('');
    setErrorBirthday('');
    setErrorImage('');
    setErrorPromotions('');
    setErrorCountry('');
    setErrorZip('');
    setErrorDeliveryDate('');
  }

  const regexpName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const stringNow: string = new Date().toString();
  const regexpImage = /\png|svg|jpeg|jpg|gif|ico$/i;

  function validate(): boolean {
    resetErrorMessages();

    let hasError = false;
    if (!formData.firstName) {
      setErrorFirstName('Mandatory field, please enter First Name');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (formData.firstName && !formData.firstName.match(regexpName)) {
      setErrorFirstName('First Name is invalid');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.lastName) {
      setErrorLastName('Mandatory field, please enter Last Name');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (formData.lastName && !formData.lastName.match(regexpName)) {
      setErrorLastName('Last Name is invalid');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.email) {
      setErrorEmail('Mandatory field, please enter E-Mail');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.email.match(regexpEmail)) {
      setErrorEmail('The format of the email address must be: example@mail.ab');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (Date.parse(formData.birthday) > Date.parse(stringNow)) {
      setErrorBirthday('Date is not correct');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (
      formData.file !== 'No data' &&
      !formData.file.split('.').splice(-1).toString().match(regexpImage)
    ) {
      setErrorImage('The file format can be .png, .svg, .jpeg, .jpg, .gif or .ico');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.promotions) {
      setErrorPromotions('Mandatory field, please choose an option');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (formData.country === 'country') {
      setErrorCountry('Mandatory field, please choose a country');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.zipCode || formData.zipCode.length < 2) {
      setErrorZip('Mandatory field, zip code length must be at least 2');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (!formData.deliveryDate) {
      setErrorDeliveryDate('Mandatory field, please choose a date');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    if (Date.parse(formData.deliveryDate) < Date.parse(stringNow)) {
      setErrorDeliveryDate('Date is not correct');
      submitButton.current!.disabled = true;
      hasError = true;
    }
    return hasError;
  }

  function generateChangeHandler<T extends keyof FormData>(propertyName: T) {
    return (event: { target: { value: FormData[T] } }) => {
      formData[propertyName] = event.target.value;

      if (
        errorFirstName ||
        errorLastName ||
        errorEmail ||
        errorBirthday ||
        errorImage ||
        errorPromotions ||
        errorCountry ||
        errorZip ||
        errorDeliveryDate
      )
        submitButton.current!.disabled = true;
      else submitButton.current!.disabled = false;

      if (formData.firstName) {
        setErrorFirstName('');
      }
      if (formData.lastName) {
        setErrorLastName('');
      }
      if (formData.email && formData.email.match(regexpEmail)) {
        setErrorEmail('');
      }
      if (Date.parse(formData.birthday) <= Date.parse(stringNow)) {
        setErrorBirthday('');
      }
      if (formData.file && formData.file.split('.').splice(-1).toString().match(regexpImage)) {
        setErrorImage('');
      }
      if (formData.promotions) {
        setErrorPromotions('');
      }
      if (formData.country && formData.country !== 'country') {
        setErrorCountry('');
      }
      if (formData.zipCode && formData.zipCode.length >= 2) {
        setErrorZip('');
      }
      if (Date.parse(formData.deliveryDate) >= Date.parse(stringNow)) {
        setErrorDeliveryDate('');
      }
    };
  }

  const handleGenderChange = (): string => {
    if (genderMrInput.current!.checked) formData.gender = genderMrInput.current!.value;
    else if (genderMrsInput.current!.checked) formData.gender = genderMrsInput.current!.value;
    else formData.gender = '';
    return formData.gender;
  };
  const handlePromoChange = (): string => {
    if (promoWantInput.current!.checked) formData.promotions = promoWantInput.current!.value;
    else if (promoDontInput.current!.checked) formData.promotions = promoDontInput.current!.value;
    else formData.promotions = '';
    return formData.promotions;
  };
  const handleFileChange = (): string => {
    if (fileInput.current!.files!.length) {
      formData.file = fileInput.current!.files![0].name;
    } else formData.file = 'No data';
    return formData.file;
  };
  const handlePersonalDataChange = (): string => {
    return personalDataInput.current!.checked
      ? (formData.personalData = 'Yes')
      : (formData.personalData = '');
  };
  const handleBonusChange = (): string => {
    return bonusInput.current!.checked
      ? (formData.bonusProgram = 'Yes')
      : (formData.bonusProgram = '');
  };

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const date = new Date();
    formData.key = date.getTime().toString();
    handleGenderChange();
    formData.firstName = firstInput.current!.value.toUpperCase();
    formData.lastName = lastInput.current!.value.toUpperCase();
    formData.email = emailInput.current!.value;
    formData.birthday = birthdayInput.current!.value;
    handleFileChange();
    handlePromoChange();
    handlePersonalDataChange();
    handleBonusChange();
    formData.country = countrySelect.current!.value;
    formData.zipCode = zipInput.current!.value.toUpperCase();
    formData.deliveryDate = deliveryDateInput.current!.value;

    const newCard = { ...formData };

    if (!validate()) {
      props.addData(newCard);
      alert('Your data has been successfully saved');
      clearFormData();
      clearFilledForm();
      submitButton.current!.disabled = true;
    }
  }

  return (
    <>
      <section className="Form-container">
        <hr className="Form-line"></hr>
        <form className="Form-content__container" onSubmit={handleFormSubmit}>
          <h2 className="Form-header">About you</h2>
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
                    onChange={generateChangeHandler('gender')}
                    ref={genderMrInput}
                  />
                  <span className="Form-radio__value">Mr</span>
                </label>
                <label className="Form-radio__label">
                  <input
                    className="Form-radio__point"
                    type="radio"
                    name="gender"
                    value="Mrs"
                    onChange={generateChangeHandler('gender')}
                    ref={genderMrsInput}
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
                    onChange={generateChangeHandler('firstName')}
                    ref={firstInput}
                  />
                  {errorFirstName && <div className="Form-error">{errorFirstName}</div>}
                </div>
              </div>
              <div className="Form-field__name">
                <label className="Form-label">Last Name *</label>
                <div className="Form-control">
                  <input
                    className="Form-input"
                    type="text"
                    onChange={generateChangeHandler('lastName')}
                    ref={lastInput}
                  />
                  {errorLastName && <div className="Form-error">{errorLastName}</div>}
                </div>
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">E-Mail *</label>
              <div className="Form-control">
                <input
                  className="Form-input"
                  type="text"
                  onChange={generateChangeHandler('email')}
                  ref={emailInput}
                />
                {errorEmail && <div className="Form-error">{errorEmail}</div>}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Birthday</label>
              <div className="Form-control__date">
                <input
                  className="Form-input__date"
                  type="date"
                  onChange={generateChangeHandler('birthday')}
                  ref={birthdayInput}
                />
                {errorBirthday && <div className="Form-error">{errorBirthday}</div>}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Choose image to upload</label>
              <div className="Form-control__file">
                <input
                  className="Form-input__file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInput}
                />
                {errorImage && <div className="Form-error__file">{errorImage}</div>}
              </div>
            </div>
            <div className="Form-field">
              <div>Receiving notifications *</div>
              <label className="Form-label">
                <input
                  className="Form-radio"
                  type="radio"
                  name="promotions"
                  value="Want receive"
                  onChange={generateChangeHandler('promotions')}
                  ref={promoWantInput}
                />
                I want to receive notifications about promo and sales by e-mail
              </label>
              <label className="Form-label">
                <input
                  className="Form-radio"
                  type="radio"
                  name="promotions"
                  value="Don't want receive"
                  onChange={generateChangeHandler('promotions')}
                  ref={promoDontInput}
                />
                I don’t want to receive notifications about promo and sales by e-mail
              </label>
              {!errorPromotions && <div className="Form-error">&nbsp;</div>}
              {errorPromotions && <div className="Form-error">{errorPromotions}</div>}
            </div>
            <div className="Form-field">
              <label className="Form-label">
                <input
                  className="Form-checkbox"
                  type="checkbox"
                  name="personal-data"
                  value="Yes"
                  onChange={handlePersonalDataChange}
                  ref={personalDataInput}
                />
                I agree to the use of my personal data for advertising purposes
              </label>
              <label className="Form-label">
                <input
                  className="Form-checkbox"
                  type="checkbox"
                  name="bonus"
                  value="Yes"
                  onChange={handleBonusChange}
                  ref={bonusInput}
                />
                I would like to take part in the free bonus points program
              </label>
            </div>
          </div>
          <h2 className="Form-header">Delivery</h2>
          <div className="Form-content">
            <div className="Form-field">
              <label className="Form-label">Choose your country *</label>
              <div className="Form-control__country">
                <select
                  defaultValue="country"
                  className="Form-select"
                  onChange={generateChangeHandler('country')}
                  ref={countrySelect}
                >
                  <option value="country" disabled>
                    Choose a country
                  </option>
                  {countries.map((elem: Country): ReactNode => {
                    return (
                      <option className="Form-select__item" value={elem.name} key={elem.code}>
                        {elem.name}
                      </option>
                    );
                  })}
                </select>
                {errorCountry && <div className="Form-error">{errorCountry}</div>}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Zip-code *</label>
              <div className="Form-control__zip">
                <input
                  className="Form-input"
                  type="text"
                  onChange={generateChangeHandler('zipCode')}
                  ref={zipInput}
                />
                {errorZip && <div className="Form-error">{errorZip}</div>}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Delivery date *</label>
              <div className="Form-control__date">
                <input
                  className="Form-input__date"
                  type="date"
                  onChange={generateChangeHandler('deliveryDate')}
                  ref={deliveryDateInput}
                />
                {errorDeliveryDate && <div className="Form-error">{errorDeliveryDate}</div>}
              </div>
            </div>
          </div>
          <input type="submit" className="Form-submit" value="Submit" ref={submitButton} disabled />
        </form>
        <hr className="Form-line"></hr>
      </section>
    </>
  );
}

export default Form;
