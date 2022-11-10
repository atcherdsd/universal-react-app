import { Types } from './types';
import { FormData } from 'components/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FormState = {
  formDataGroup: FormData[];
  formData: FormData;
  isDisabledButton: boolean;
};

export type FormActions =
  | { type: Types.AddFormCard; payload: FormData }
  | { type: Types.ChangeForm; payload: FormData }
  | { type: Types.DisableSubmit }
  | { type: Types.EnableSubmit };

const initialState: FormState = {
  formDataGroup: [] as FormData[],
  formData: {
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
  },
  isDisabledButton: true,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormCard(state, action: PayloadAction<FormData>) {
      state.formDataGroup.push(action.payload);
    },
    changeForm(state, action: PayloadAction<FormData>) {
      state.formData = { ...action.payload };
    },
    disableSubmit(state) {
      state.isDisabledButton = true;
    },
    enableSubmit(state) {
      state.isDisabledButton = false;
    },
  },
});

export const { addFormCard, changeForm, disableSubmit, enableSubmit } = formSlice.actions;

export default formSlice.reducer;
