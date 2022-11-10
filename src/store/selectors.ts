import { CombinedState } from '@reduxjs/toolkit';
import { ApiState } from './apiSlice';
import { FormState } from './formSlice';
import { FormData } from 'types/types';

export const formDataSelector = (state: { formStateData: { formData: FormData } }) =>
  state.formStateData.formData;

export const isDisabledButtonSelector = (state: { formStateData: { isDisabledButton: boolean } }) =>
  state.formStateData.isDisabledButton;

export const formDataGroup = (state: { formStateData: { formDataGroup: FormData[] } }) =>
  state.formStateData.formDataGroup;

export const apiStateData = (
  state: CombinedState<{
    apiStateData: ApiState;
    formStateData: FormState;
  }>
) => state.apiStateData;
