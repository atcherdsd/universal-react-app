import React, { FormEvent, ReactNode, RefObject, useRef } from 'react';
import './Form.css';
import countries from '../../data/countries.json';
import { InitialData } from 'pages/Forms/Forms';

type FormData = {
  key: string;
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  file: string;
  promotions: string;
  personalData: string;
  bonusProgram: string;
  country: string;
  zipCode: string;
  deliveryDate: string;
};

type Country = {
  name: string;
  code: string;
};

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

  // const handleGenderChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   formData.gender = (event.target as HTMLInputElement).value;
  //   return formData.gender;
  // };
  // const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.firstName = (event.target as HTMLInputElement).value);
  // };
  // const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.lastName = (event.target as HTMLInputElement).value);
  // };
  // const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.email = (event.target as HTMLInputElement).value);
  // };
  // const handleBirthdayChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.birthday = (event.target as HTMLInputElement).value);
  // };
  // const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.file = (event.target as HTMLInputElement).value);
  // };
  // const handlePromoChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.promotions = (event.target as HTMLInputElement).value);
  // };
  // const handlePersonalDataChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.personalData = (event.target as HTMLInputElement).value);
  // };
  // const handleBonusChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.bonusProgram = (event.target as HTMLInputElement).value);
  // };
  // const handleCountryChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.country = (event.target as HTMLInputElement).value);
  // };
  // const handleZipChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.zipCode = (event.target as HTMLInputElement).value);
  // };
  // const handleDeliveryDateChange: React.ChangeEventHandler<HTMLInputElement> = (event): string => {
  //   return (formData.deliveryDate = (event.target as HTMLInputElement).value);
  // };

  // const listPersonalHandlers = {
  //   genderHandler: handleGenderChange,
  //   firstNameHandler: handleFirstNameChange,
  //   lastNameHandler: handleLastNameChange,
  //   emailHandler: handleEmailChange,
  //   birthdayNameHandler: handleBirthdayChange,
  //   fileHandler: handleFileChange,
  //   promoHandler: handlePromoChange,
  //   personalHandler: handlePersonalDataChange,
  //   bonusHandler: handleBonusChange,
  // };
  // const listDeliveryHandlers = {
  //   countryHandler: handleCountryChange,
  //   zipHandler: handleZipChange,
  //   deliveryDateHandler: handleDeliveryDateChange,
  // };

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
    countrySelect.current!.value = '';
    zipInput.current!.value = '';
    deliveryDateInput.current!.value = '';
  }

  function generateChangeHandler<T extends keyof FormData>(propertyName: T) {
    return (event: { target: HTMLInputElement | HTMLSelectElement }) => {
      formData[propertyName] = (event.target as HTMLInputElement).value;
    };
  }

  const handleFileChange = (): string => {
    return (formData.file = fileInput.current!.files![0].name);
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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const date = new Date();
    formData.key = date.getTime().toString();
    const newCard = { ...formData };
    console.log(newCard);
    console.log(formData.key);
    props.addData(newCard);
    clearFormData();
    clearFilledForm();
    console.log('form works');
  };

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
                </div>
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">E-Mail *</label>
              <div className="Form-control">
                <input
                  className="Form-input"
                  type="email"
                  onChange={generateChangeHandler('email')}
                  ref={emailInput}
                />
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
              </div>
            </div>
            <div className="Form-field">
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
              <label className="Form-label">Choose your country</label>
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
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Zip-code</label>
              <div className="Form-control__zip">
                <input
                  className="Form-input"
                  type="text"
                  onChange={generateChangeHandler('zipCode')}
                  ref={zipInput}
                />
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Delivery date</label>
              <div className="Form-control__date">
                <input
                  className="Form-input__date"
                  type="date"
                  onChange={generateChangeHandler('deliveryDate')}
                  ref={deliveryDateInput}
                />
              </div>
            </div>
          </div>
          <input type="submit" className="Form-submit" value="Submit" />
        </form>
        <hr className="Form-line"></hr>
      </section>
    </>
  );
}

export default Form;
