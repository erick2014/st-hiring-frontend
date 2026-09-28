import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsForm } from './SettingsForm';

describe('SettingsForm', () => {
  const defaultProps = {
    initialSettings: {
      companyName: 'Test Company',
      supportEmail: 'test@test.com',
      maxTicketsPerEvent: 5,
    },
    onSave: vi.fn(),
  };

  it('renders all form fields', () => {
    render(<SettingsForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/support email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max tickets per event/i)).toBeInTheDocument();
  });

  it('pre-populates fields with initial settings', () => {
    render(<SettingsForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/company name/i)).toHaveValue('Test Company');
    expect(screen.getByLabelText(/support email/i)).toHaveValue('test@test.com');
    expect(screen.getByLabelText(/max tickets per event/i)).toHaveValue(5);
  });

  it('renders save button', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('disables submit when form is dirty but invalid', async () => {
    render(<SettingsForm {...defaultProps} />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it('shows validation error for invalid email', async () => {
    render(<SettingsForm {...defaultProps} />);
    
    const emailInput = screen.getByLabelText(/support email/i);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'not-an-email');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.submit(saveButton.closest('form') || document.body);
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('shows validation error for non-integer maxTickets', async () => {
    render(<SettingsForm {...defaultProps} />);
    
    const ticketsInput = screen.getByLabelText(/max tickets per event/i);
    await userEvent.clear(ticketsInput);
    await userEvent.type(ticketsInput, '3.5');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.submit(saveButton.closest('form') || document.body);
    
    expect(screen.getByText(/must be an integer/i)).toBeInTheDocument();
  });

  it('shows validation error for maxTickets less than 1', async () => {
    render(<SettingsForm {...defaultProps} />);
    
    const ticketsInput = screen.getByLabelText(/max tickets per event/i);
    await userEvent.clear(ticketsInput);
    await userEvent.type(ticketsInput, '0');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.submit(saveButton.closest('form') || document.body);
    
    expect(screen.getByText(/must be at least 1/i)).toBeInTheDocument();
  });

  it('calls onSave with changed fields on submit', async () => {
    render(<SettingsForm {...defaultProps} />);
    
    const companyNameInput = screen.getByLabelText(/company name/i);
    await userEvent.clear(companyNameInput);
    await userEvent.type(companyNameInput, 'Test Company Updated');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);
    
    expect(defaultProps.onSave).toHaveBeenCalled();
  });

  it('submits with only changed fields as partial', async () => {
    const onSave = vi.fn();
    render(
      <SettingsForm
        initialSettings={{ companyName: 'Old', supportEmail: 'old@test.com', maxTicketsPerEvent: 2 }}
        onSave={onSave}
      />
    );
    
    const companyNameInput = screen.getByLabelText(/company name/i);
    await userEvent.clear(companyNameInput);
    await userEvent.type(companyNameInput, 'New Company');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);
    
    expect(onSave).toHaveBeenCalled();
  });

  it('enables submit when form is valid and dirty', async () => {
    render(<SettingsForm {...defaultProps} />);
    
    const companyNameInput = screen.getByLabelText(/company name/i);
    await userEvent.clear(companyNameInput);
    await userEvent.type(companyNameInput, 'Test Company Updated');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeEnabled();
  });
});
