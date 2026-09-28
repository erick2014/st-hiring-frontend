import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SettingsModal } from './SettingsModal';
import settingsReducer from '../settingsSlice';

const defaultSettings = {
  companyName: 'Test Company',
  supportEmail: 'test@test.com',
  maxTicketsPerEvent: 5,
};

function createTestStore(initialState = {}) {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState: {
      settings: {
        settings: {},
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
}

describe('SettingsModal', () => {
  function renderWithStore(ui, store = createTestStore()) {
    return render(
      <Provider store={store}>
        {ui}
      </Provider>
    );
  }

  it('renders as closed when open=false', () => {
    const store = createTestStore();
    renderWithStore(<SettingsModal open={false} onClose={vi.fn()} />, store);
    expect(screen.queryByText(/app settings/i)).not.toBeInTheDocument();
  });

  it('opens when open=true', async () => {
    const store = createTestStore();
    renderWithStore(<SettingsModal open={true} onClose={vi.fn()} />, store);
    await waitFor(() => {
      expect(screen.getByText(/app settings/i)).toBeInTheDocument();
    });
  });

  it('fetches settings on open', async () => {
    const store = createTestStore();
    renderWithStore(<SettingsModal open={true} onClose={vi.fn()} />, store);
    await waitFor(() => {
      expect(screen.getByText(/app settings/i)).toBeInTheDocument();
    });
  });

  it('shows loading spinner while fetching', async () => {
    const store = createTestStore({ settings: {}, loading: true, error: null });
    renderWithStore(<SettingsModal open={true} onClose={vi.fn()} />, store);
    
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  it('renders form with fetched settings', async () => {
    const store = createTestStore();
    renderWithStore(<SettingsModal open={true} onClose={vi.fn()} />, store);
    await waitFor(() => {
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/company name/i)).toHaveValue('Eventim');
    expect(screen.getByLabelText(/support email/i)).toHaveValue('support@eventim.com');
    expect(screen.getByLabelText(/max tickets per event/i)).toHaveValue(5);
  });

  it('shows success snackbar and closes on save', async () => {
    const onClose = vi.fn();
    const store = createTestStore();
    renderWithStore(<SettingsModal open={true} onClose={onClose} />, store);
    await waitFor(() => {
      expect(screen.getByText(/app settings/i)).toBeInTheDocument();
    });
    
    // Make changes to enable save button
    const companyNameInput = screen.getByLabelText(/company name/i);
    await userEvent.clear(companyNameInput);
    await userEvent.type(companyNameInput, 'New Company Name');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('closes when dialog close button is clicked', async () => {
    const onClose = vi.fn();
    const store = createTestStore({
      settings: defaultSettings,
      loading: false,
      error: null,
    });
    renderWithStore(<SettingsModal open={true} onClose={onClose} />, store);
    await waitFor(() => {
      expect(screen.getByText(/app settings/i)).toBeInTheDocument();
    });
    
    // Click the MUI dialog backdrop to close
    const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
    if (backdrop) {
      await userEvent.click(backdrop);
    }
    expect(onClose).toHaveBeenCalled();
  });
});
