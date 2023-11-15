import React from 'react';
import { render, screen } from '@testing-library/react';
import Book from './Book';

test('renders book with revision', () => {
  const book = {
    title: 'Test',
    description: 'Description',
    olVersion: 3,
  };
  render(<Book book={book} onAdd={() => {}} isDisabled={false} />);
  const revisionElement = screen.getByText(/OL revision: 3/i);
  expect(revisionElement).toBeInTheDocument();

  const priceElement = screen.queryByText(/Price/i);
  expect(priceElement).not.toBeInTheDocument();
});

test('renders book with price', () => {
  const book = {
    title: 'Test',
    description: 'Description',
    price: 33,
    olVersion: 1,
  };
  render(<Book book={book} onAdd={() => {}} isDisabled={false} />);
  const revisionElement = screen.queryByText(/OL revision: 3/i);
  expect(revisionElement).not.toBeInTheDocument();

  const priceElement = screen.getByText(/Price/i);
  expect(priceElement).toBeInTheDocument();
});
