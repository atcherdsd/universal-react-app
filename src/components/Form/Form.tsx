import React, { ReactNode, RefObject, useEffect, useRef } from 'react';
import './Form.css';
import countries from '../../data/countries.json';
import { FormData, Country } from 'types/types';
import { useForm } from 'react-hook-form';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootReducer } from 'store/store';
import { addFormCard, changeForm, disableSubmit, enableSubmit } from 'store/formSlice';

const initialFormValues: FormData = {
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
  country: 'country',
  zipCode: '',
  deliveryDate: '',
};

function Form(): JSX.Element {
  const selector: TypedUseSelectorHook<RootReducer> = useSelector;
  const initialFieldsValues = selector((state) => state.formStateData.formData);
  const isDisabledButton = selector((state) => state.formStateData.isDisabledButton);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      key: initialFieldsValues.key,
      gender: initialFieldsValues.gender,
      firstName: initialFieldsValues.firstName,
      lastName: initialFieldsValues.lastName,
      email: initialFieldsValues.email,
      birthday: initialFieldsValues.birthday,
      file: initialFieldsValues.file,
      promotions: initialFieldsValues.promotions,
      personalData: initialFieldsValues.personalData,
      bonusProgram: initialFieldsValues.bonusProgram,
      country: initialFieldsValues.country,
      zipCode: initialFieldsValues.zipCode,
      deliveryDate: initialFieldsValues.deliveryDate,
    },
  });

  useEffect(() => {
    return () => {
      const { ...values } = getValues();
      dispatch(changeForm(values));
    };
  }, [dispatch, getValues]);

  let formData = {} as FormData;

  function clearFormData() {
    formData = initialFieldsValues;
    reset(initialFormValues);
    dispatch(changeForm(initialFormValues));
  }
  const formRef = useRef() as RefObject<HTMLFormElement>;

  function clearFilledForm(): void {
    Array.from(formRef.current!.elements).forEach((elem) => {
      if (
        (elem as HTMLInputElement).type === 'radio' ||
        (elem as HTMLInputElement).type === 'checkbox'
      ) {
        (elem as HTMLInputElement).checked = false;
      } else if (
        (elem as HTMLInputElement).type === 'text' ||
        (elem as HTMLInputElement).type === 'file' ||
        (elem as HTMLInputElement).type === 'date'
      ) {
        (elem as HTMLInputElement).value = '';
      } else if ((elem as HTMLSelectElement).name === 'country') {
        (elem as HTMLSelectElement).value = 'country';
      }
    });
  }

  const regexpName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const stringNow: string = new Date().toString();
  const regexpImage = /\.(png|svg|jpe?g|jpg|gif|ico)$/i;

  const disableSubmitButton = () => {
    if (
      isDisabledButton ||
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.promotions ||
      errors.country ||
      errors.zipCode ||
      errors.deliveryDate
    ) {
      return true;
    } else {
      return false;
    }
  };

  function generateChangeHandler<T extends keyof FormData>(propertyName: T) {
    return (event: { target: { value: FormData[T] } }) => {
      formData[propertyName] = event.target.value;
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

    return formData.promotions;
  };
  const handleFileChange = (): string => {
    if ((formRef.current!.elements[6] as HTMLInputElement).files!.length) {
      formData.file = (formRef.current!.elements[6] as HTMLInputElement).files![0].name;
      dispatch(enableSubmit());
    } else {
      dispatch(disableSubmit());
      formData.file = 'No data';
    }
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

  function handleFormSubmit() {
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
    dispatch(addFormCard(newCard));

    alert('Your data has been successfully saved');
    clearFormData();
    clearFilledForm();
    dispatch(disableSubmit());
  }

  return (
    <>
      <section className="Form-container">
        <hr className="Form-line"></hr>
        <form
          className="Form-content__container"
          onChange={() => dispatch(enableSubmit())}
          onSubmit={handleSubmit(handleFormSubmit)}
          ref={formRef}
        >
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
                    {...register('firstName', {
                      required: 'Mandatory field, please enter First Name',
                      pattern: {
                        value: regexpName,
                        message: 'First Name is invalid. Use the latin alphabet',
                      },
                      onChange: generateChangeHandler('firstName'),
                    })}
                  />
                  {errors.firstName && (
                    <div className="Form-error">{errors.firstName.message as string}</div>
                  )}
                </div>
              </div>
              <div className="Form-field__name">
                <label className="Form-label">Last Name *</label>
                <div className="Form-control">
                  <input
                    className="Form-input"
                    type="text"
                    {...register('lastName', {
                      required: 'Mandatory field, please enter Last Name',
                      pattern: {
                        value: regexpName,
                        message: 'Last Name is invalid. Use the latin alphabet',
                      },
                      onChange: generateChangeHandler('lastName'),
                    })}
                  />
                  {errors.lastName && (
                    <div className="Form-error">{errors.lastName.message as string}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">E-Mail *</label>
              <div className="Form-control">
                <input
                  className="Form-input"
                  type="text"
                  {...register('email', {
                    required: 'Mandatory field, please enter E-Mail',
                    pattern: {
                      value: regexpEmail,
                      message: 'The format of the email address must be: example@mail.ab',
                    },
                    onChange: generateChangeHandler('email'),
                  })}
                />
                {errors.email && <div className="Form-error">{errors.email.message as string}</div>}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Birthday</label>
              <div className="Form-control__date">
                <input
                  className="Form-input__date"
                  type="date"
                  {...register('birthday', {
                    max: {
                      value: stringNow,
                      message: 'Date is not correct',
                    },
                    onChange: generateChangeHandler('birthday'),
                  })}
                />
                {errors.birthday && (
                  <div className="Form-error">{errors.birthday.message as string}</div>
                )}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Choose image to upload</label>
              <div className="Form-control__file">
                <input
                  className="Form-input__file"
                  type="file"
                  accept="image/*"
                  {...register('file', {
                    pattern: {
                      value: regexpImage,
                      message: 'The file format can be .png, .svg, .jpeg, .jpg, .gif or .ico',
                    },
                    onChange: handleFileChange,
                  })}
                />
                {errors.file && <div className="Form-error">{errors.file.message as string}</div>}
              </div>
            </div>
            <div className="Form-field">
              <div>Receiving notifications *</div>
              <label className="Form-label">
                <input
                  className="Form-radio"
                  type="radio"
                  value="Want receive"
                  {...register('promotions', {
                    required: 'Mandatory field, please choose an option',
                    onChange: generateChangeHandler('promotions'),
                  })}
                />
                I want to receive notifications about promo and sales by e-mail
              </label>
              <label className="Form-label">
                <input
                  className="Form-radio"
                  type="radio"
                  value="Don't want receive"
                  {...register('promotions', {
                    required: 'Mandatory field, please choose an option',
                    onChange: generateChangeHandler('promotions'),
                  })}
                />
                I don’t want to receive notifications about promo and sales by e-mail
              </label>
              {!errors.promotions && <div className="Form-error">&nbsp;</div>}
              {errors.promotions && (
                <div className="Form-error">{errors.promotions.message as string}</div>
              )}
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
                  {...register('country', {
                    required: 'Mandatory field, please choose a country',
                    pattern: {
                      value: /^((?!country).)*$/i,
                      message: 'Mandatory field, please choose a country',
                    },
                    onChange: generateChangeHandler('country'),
                  })}
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
                {errors.country && (
                  <div className="Form-error">{errors.country.message as string}</div>
                )}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Zip-code *</label>
              <div className="Form-control__zip">
                <input
                  className="Form-input"
                  type="text"
                  {...register('zipCode', {
                    required: 'Mandatory field, zip code length must be at least 2',
                    min: {
                      value: 2,
                      message: 'Mandatory field, zip code length must be at least 2',
                    },
                    onChange: generateChangeHandler('zipCode'),
                  })}
                />
                {errors.zipCode && (
                  <div className="Form-error">{errors.zipCode.message as string}</div>
                )}
              </div>
            </div>
            <div className="Form-field">
              <label className="Form-label">Delivery date *</label>
              <div className="Form-control__date">
                <input
                  className="Form-input__date"
                  type="date"
                  {...register('deliveryDate', {
                    required: 'Mandatory field, please choose a date',
                    min: {
                      value: stringNow,
                      message: 'Date is not correct',
                    },
                    onChange: generateChangeHandler('deliveryDate'),
                  })}
                />
                {errors.deliveryDate && (
                  <div className="Form-error">{errors.deliveryDate.message as string}</div>
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="Form-submit"
            value="Submit"
            disabled={disableSubmitButton()}
          />
        </form>
        <hr className="Form-line"></hr>
      </section>
    </>
  );
}

export default Form;
