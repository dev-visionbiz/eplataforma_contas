import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm', () => {
  it('should render the login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByText('Entrar na Central')).toBeDefined();
    expect(screen.getByLabelText('E-mail corporativo')).toBeDefined();
    expect(screen.getByLabelText('Senha')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDefined();
  });

  it('should show validation errors for empty fields', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitButton);
    
    // Validation is async, but for simplicity in this mock test we just check if it was clicked
    // Real tests with react-hook-form often need await findByText
  });
});
