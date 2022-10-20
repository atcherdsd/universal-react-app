import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  beforeEach(() => {
    render(
      <Modal
        data={{
          author: null,
          title: '',
          description: '',
          image: null,
          category: '',
          language: '',
          country: '',
          published_at: '',
          source: '',
          url: '',
        }}
        handleResult={() => void {}}
      />
    );
  });

  test('should render Modal component', () => {
    // expect(screen.getByRole('banner')).toBeInTheDocument();
    // expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
    // expect(screen.getByRole('navigation')).toBeInTheDocument();
    // expect(screen.getAllByRole('list')[0]).toBeInTheDocument();
    // expect(screen.getAllByRole('list').length).toEqual(1);
    // expect(screen.getByAltText('logo')).toBeInTheDocument();
    // const nav = screen.getAllByRole('navigation');
    // expect(nav.length).toEqual(1);
    // const links = document.querySelectorAll('.Header-link');
    // expect(links.length).toBeGreaterThanOrEqual(4);
    // const main = screen.getByText(/main/i);
    // expect(main).toBeInTheDocument();
    // const forms = screen.getByText(/forms/i);
    // expect(forms).toBeInTheDocument();
    // const aboutUs = screen.getByText(/about us/i);
    // expect(aboutUs).toBeInTheDocument();
    // const api = screen.getByText(/api/i);
    // expect(api).toBeInTheDocument();
  });
  it('Classes are available', () => {
    // expect(screen.getByRole('banner')).toHaveClass('Header-container');
    // expect(screen.getAllByRole('heading')[0]).toHaveClass('Headear-title');
    // expect(screen.getAllByRole('list')[0]).toHaveClass('Header-links');
  });
  it('Styles are available', () => {
    // const navContainer = document.querySelector('.Header-right') as Element;
    // const navContainerHeight = window.getComputedStyle(navContainer).height;
    // expect(navContainerHeight).toBeDefined();
  });
  test('Modal component do not have data', () => {
    expect(screen.queryByText(/home/i)).toBeNull();
    expect(screen.queryByRole('paragraph')).toBeNull();
    // const elementList = document.querySelector('.Header-links') as Element;
    // const textColor = window.getComputedStyle(elementList).color;
    // expect(textColor).toBeFalsy();
  });
});
