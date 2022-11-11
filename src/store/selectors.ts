import { RootState } from './store';

export const formDataSelector = (state: RootState) => state.formStateData.formData;

export const isDisabledButtonSelector = (state: RootState) => state.formStateData.isDisabledButton;

export const formDataGroup = (state: RootState) => state.formStateData.formDataGroup;

export const apiStateData = (state: RootState) => state.apiStateData;
