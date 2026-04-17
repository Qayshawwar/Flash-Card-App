import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RenameCollection from '../components/RenameCollection';

describe('RenameCollection', () => {
  test('calls onSave with valid name', () => {
    const onSave = jest.fn();
    render(
      <RenameCollection
        currentName="Biology Chapter 1"
        onSave={onSave}
        onCancel={jest.fn()}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Biology Chapter 1 New' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledWith('Biology Chapter 1 New');
  });

  test('shows validation error for invalid name', () => {
    render(
      <RenameCollection
        currentName="Biology Chapter 1"
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '!@#$%' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText('Invalid Collection Name.')).toBeInTheDocument();
  });
});
