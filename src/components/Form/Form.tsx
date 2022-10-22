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
  const formRef = useRef() as RefObject<HTMLFormElement>;

  function clearFilledForm(): void {
    Array.from(formRef.current!.elements).forEach((elem, index) => {
      if (index < 2 || (index > 6 && index < 11)) {
        (elem as HTMLInputElement).checked = false;
      } else if ((index >= 2 && index < 7) || index > 11) {
        (elem as HTMLInputElement).value = '';
      } else if (index === 11) {
        (elem as HTMLSelectElement).value = 'country';
      }
    });
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
  let hasError: boolean;

  const handleError = (): void => {
    (formRef.current!.elements[14] as HTMLInputElement).disabled = true;
    hasError = true;
  };

  function validate(): boolean {
    resetErrorMessages();

    hasError = false;
    if (!formData.firstName) {
      setErrorFirstName('Mandatory field, please enter First Name');
      handleError();
    }
    if (formData.firstName && !formData.firstName.match(regexpName)) {
      setErrorFirstName('First Name is invalid');
      handleError();
    }
    if (!formData.lastName) {
      setErrorLastName('Mandatory field, please enter Last Name');
      handleError();
    }
    if (formData.lastName && !formData.lastName.match(regexpName)) {
      setErrorLastName('Last Name is invalid');
      handleError();
    }
    if (!formData.email) {
      setErrorEmail('Mandatory field, please enter E-Mail');
      handleError();
    }
    if (!formData.email.match(regexpEmail)) {
      setErrorEmail('The format of the email address must be: example@mail.ab');
      handleError();
    }
    if (Date.parse(formData.birthday) > Date.parse(stringNow)) {
      setErrorBirthday('Date is not correct');
      handleError();
    }
    if (
      formData.file !== 'No data' &&
      !formData.file.split('.').splice(-1).toString().match(regexpImage)
    ) {
      setErrorImage('The file format can be .png, .svg, .jpeg, .jpg, .gif or .ico');
      handleError();
    }
    if (!formData.promotions) {
      setErrorPromotions('Mandatory field, please choose an option');
      handleError();
    }
    if (formData.country === 'country') {
      setErrorCountry('Mandatory field, please choose a country');
      handleError();
    }
    if (!formData.zipCode || formData.zipCode.length < 2) {
      setErrorZip('Mandatory field, zip code length must be at least 2');
      handleError();
    }
    if (!formData.deliveryDate) {
      setErrorDeliveryDate('Mandatory field, please choose a date');
      handleError();
    }
    if (Date.parse(formData.deliveryDate) < Date.parse(stringNow)) {
      setErrorDeliveryDate('Date is not correct');
      handleError();
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
        (formRef.current!.elements[14] as HTMLInputElement).disabled = true;
      else (formRef.current!.elements[14] as HTMLInputElement).disabled = false;

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
    if ((formRef.current!.elements[0] as HTMLInputElement).checked) {
      formData.gender = (formRef.current!.elements[0] as HTMLInputElement).value;
    } else if ((formRef.current!.elements[1] as HTMLInputElement).checked)
      formData.gender = (formRef.current!.elements[1] as HTMLInputElement).value;
    else formData.gender = '';
    return formData.gender;
  };
  const handlePromoChange = (): string => {
    if ((formRef.current!.elements[7] as HTMLInputElement).checked)
      formData.promotions = (formRef.current!.elements[7] as HTMLInputElement).value;
    else if ((formRef.current!.elements[8] as HTMLInputElement).checked)
      formData.promotions = (formRef.current!.elements[8] as HTMLInputElement).value;
    else formData.promotions = '';
    return formData.promotions;
  };
  const handleFileChange = (): string => {
    if ((formRef.current!.elements[6] as HTMLInputElement).files!.length) {
      formData.file = (formRef.current!.elements[6] as HTMLInputElement).files![0].name;
    } else formData.file = 'No data';
    return formData.file;
  };
  const handlePersonalDataChange = (): string => {
    return (formRef.current!.elements[9] as HTMLInputElement).checked
      ? (formData.personalData = 'Yes')
      : (formData.personalData = '');
  };
  const handleBonusChange = (): string => {
    return (formRef.current!.elements[10] as HTMLInputElement).checked
      ? (formData.bonusProgram = 'Yes')
      : (formData.bonusProgram = '');
  };

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const date = new Date();
    formData.key = date.getTime().toString();
    handleGenderChange();
    formData.firstName = (formRef.current!.elements[2] as HTMLInputElement).value.toUpperCase();
    formData.lastName = (formRef.current!.elements[3] as HTMLInputElement).value.toUpperCase();
    formData.email = (formRef.current!.elements[4] as HTMLInputElement).value;
    formData.birthday = (formRef.current!.elements[5] as HTMLInputElement).value;
    handleFileChange();
    handlePromoChange();
    handlePersonalDataChange();
    handleBonusChange();
    formData.country = (formRef.current!.elements[11] as HTMLInputElement).value;
    formData.zipCode = (formRef.current!.elements[12] as HTMLInputElement).value.toUpperCase();
    formData.deliveryDate = (formRef.current!.elements[13] as HTMLInputElement).value;

    const newCard = { ...formData };

    if (!validate()) {
      props.addData(newCard);
      alert('Your data has been successfully saved');
      clearFormData();
      clearFilledForm();
      (formRef.current!.elements[14] as HTMLInputElement).disabled = true;
    }
  }

  return (
    <>
      <section className="Form-container">
        <hr className="Form-line"></hr>
        <form className="Form-content__container" onSubmit={handleFormSubmit} ref={formRef}>
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
                />
                {errorDeliveryDate && <div className="Form-error">{errorDeliveryDate}</div>}
              </div>
            </div>
          </div>
          <input type="submit" className="Form-submit" value="Submit" disabled />
        </form>
        <hr className="Form-line"></hr>
      </section>
    </>
  );
}

export default Form;
