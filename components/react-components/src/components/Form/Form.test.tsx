import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';

describe('Form component', () => {
  test('should render Form component', () => {
    render(<Form addData={function addData(): void {}} />);

    const section = document.querySelector('.Form-container');
    expect(section).toBeInTheDocument();
    expect(screen.getAllByRole('separator')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('heading').length).toEqual(2);
    const form = document.querySelector('.Form-content__container');
    expect(form).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toEqual(4);
    expect(screen.getAllByRole('textbox').length).toEqual(4);

    const dateInput = document.querySelectorAll('.Form-input__date');
    expect(dateInput.length).toEqual(2);
    const fileInput = document.querySelector('.Form-input__file');
    expect(fileInput).toBeInTheDocument();

    expect(screen.getAllByRole('checkbox').length).toEqual(2);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Choose a country')).toBeInTheDocument();
    expect(screen.getByText('Angola')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveValue('Submit');
    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText(/Delivery date/i)).toBeInTheDocument();
  });
  it('onChange works', () => {
    render(<Form addData={function addData(): void {}} />);

    const form = document.querySelector('.Form-content__container') as HTMLElement;
    const firstNameInput = screen.getAllByRole('textbox')[0];
    const lastNameInput = screen.getAllByRole('textbox')[1];
    const button = screen.getByRole('button');

    expect(firstNameInput).toContainHTML('');
    expect(lastNameInput).toContainHTML('');
    expect(button).toHaveAttribute('disabled');

    form.onchange = jest.fn();
    const onChangeForm = form.onchange;
    firstNameInput.onchange = jest.fn();
    const onChangeFirstName = firstNameInput.onchange;

    fireEvent.change(firstNameInput, { target: { value: 'Michael' } });
    expect(screen.getByDisplayValue('Michael')).toBeInTheDocument();
    expect(lastNameInput).toContainHTML('');
    expect(onChangeFirstName).toHaveBeenCalledTimes(1);
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(form);
    expect(onChangeForm).toHaveBeenCalled();
  });
  it('Checkbox should work', () => {
    const onChangeCheckbox = jest.fn();
    const { container } = render(
      <input
        className="Form-checkbox"
        type="checkbox"
        name="personal-data"
        onChange={onChangeCheckbox}
      />
    );
    const checkbox = container.firstChild as HTMLElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(onChangeCheckbox).toHaveBeenCalledTimes(1);
  });
  it('Сlasses are available', () => {
    render(<Form addData={function addData(): void {}} />);

    expect(screen.getByRole('combobox')).toHaveClass('Form-select');
    expect(screen.getByRole('button')).toHaveClass('Form-submit');
  });
  it('Styles are available', () => {
    render(<Form addData={function addData(): void {}} />);

    const inputWrapper = document.querySelector('.Form-control__date') as Element;
    const inputWrapperBorder = window.getComputedStyle(inputWrapper).border;
    expect(inputWrapperBorder).toBeDefined();
  });
  test('Form renders without data', () => {
    render(<Form addData={function addData(): void {}} />);

    expect(screen.queryByRole('searchbox')).toBeNull();
    expect(screen.queryByText(/sorry/i)).toBeNull();

    const inputField = screen.getAllByRole('textbox')[0];
    userEvent.type(inputField, 'Tom');
    expect(screen.getByDisplayValue('Tom')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tom')).toHaveClass('Form-input');
    expect(screen.getByDisplayValue('Tom')).not.toHaveClass('Form-radio__point');
    expect(screen.queryByDisplayValue(/name/i)).toBeNull();

    expect(screen.queryByText(/address/i)).toBeNull();
  });
});
