import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import OrderCard from 'components/OrderCard/OrderCard';

describe('Form component', () => {
  test('should render Form component', () => {
    render(<Form />);

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
    render(<Form />);

    const firstNameInput = screen.getAllByRole('textbox')[0];
    const lastNameInput = screen.getAllByRole('textbox')[1];
    const button = screen.getByRole('button');

    expect(firstNameInput).toContainHTML('');
    expect(lastNameInput).toContainHTML('');
    expect(button).toHaveAttribute('disabled');

    firstNameInput.onchange = jest.fn();
    const onChangeFirstName = firstNameInput.onchange;

    fireEvent.change(firstNameInput, { target: { value: 'Michael' } });
    expect(screen.getByDisplayValue('Michael')).toBeInTheDocument();
    expect(firstNameInput).toHaveValue('Michael');
    expect(lastNameInput).toContainHTML('');
    expect(onChangeFirstName).toHaveBeenCalledTimes(1);
    expect(button).toHaveValue('Submit');

    userEvent.click(button);
    const error = document.querySelectorAll('.Form-error')[0];
    expect(error).toBeInTheDocument();
  });
  it('should render radio inputs', () => {
    render(<Form />);
    const radioInputs = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radioInputs.length).toEqual(4);
    expect(radioInputs[0].value).toBe('Mr');
    expect(radioInputs[1].value).toBe('Mrs');
    expect(radioInputs[2].value).toBe('Want receive');
    expect(radioInputs[3].value).toBe("Don't want receive");
  });
  it('should render date inputs', () => {
    render(<Form />);
    const dateInputs = document.querySelectorAll(
      '.Form-input__date'
    ) as NodeListOf<HTMLInputElement>;
    expect(dateInputs.length).toEqual(2);
    userEvent.type(dateInputs[0], '1990-10-10');
    expect(dateInputs[0].value).toBe('1990-10-10');
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
  it('function onChangeCheckbox should work', () => {
    render(<Form />);

    const checkboxInput1 = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    const checkboxInput2 = screen.getAllByRole('checkbox')[1] as HTMLInputElement;
    checkboxInput1.onchange = jest.fn();
    const onChangeCheckboxInput1 = checkboxInput1.onchange;
    checkboxInput2.onchange = jest.fn();
    const onChangeCheckboxInput2 = checkboxInput2.onchange;

    expect(checkboxInput1).not.toBeChecked();
    expect(checkboxInput2).not.toBeChecked();

    userEvent.click(checkboxInput1);
    expect(onChangeCheckboxInput1).toHaveBeenCalledTimes(1);
    expect(onChangeCheckboxInput2).not.toHaveBeenCalled();
    expect(checkboxInput1).toBeChecked();
    expect(checkboxInput2).not.toBeChecked();

    const button = screen.getByRole('button');
    userEvent.click(button);
    act(() => {
      expect(render(<OrderCard key="" />));
    });

    userEvent.click(checkboxInput2);
    expect(checkboxInput1).toBeChecked();
    expect(checkboxInput2).toBeChecked();

    userEvent.click(checkboxInput2);
    expect(checkboxInput1).toBeChecked();
    expect(checkboxInput2).not.toBeChecked();

    userEvent.click(checkboxInput1);
    expect(checkboxInput1).not.toBeChecked();
    expect(checkboxInput2).not.toBeChecked();
  });
  it('Сlasses are available', () => {
    render(<Form />);

    expect(screen.getByRole('combobox')).toHaveClass('Form-select');
    expect(screen.getByRole('button')).toHaveClass('Form-submit');
  });
  it('Styles are available', () => {
    render(<Form />);

    const inputWrapper = document.querySelector('.Form-control__date') as Element;
    const inputWrapperBorder = window.getComputedStyle(inputWrapper).border;
    expect(inputWrapperBorder).toBeDefined();
  });
  test('Form renders without data', () => {
    render(<Form />);
    expect(screen.queryByRole('searchbox')).toBeNull();
    expect(screen.queryByText(/sorry/i)).toBeNull();

    const inputField = document.querySelectorAll('.Form-input')[0];

    fireEvent.change(inputField, { target: { value: 'Tom' } });

    expect(screen.getByDisplayValue('Tom')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tom')).not.toHaveClass('Form-radio__point');
    expect(screen.queryByDisplayValue(/name/i)).toBeNull();

    expect(screen.queryByText(/address/i)).toBeNull();
  });
});
