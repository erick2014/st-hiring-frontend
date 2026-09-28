import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../../settings/settingsSlice';

const mockFetchEvents = vi.fn();
vi.mock('../eventsApi', () => ({
  fetchEvents: (...args: any[]) => mockFetchEvents(...args),
}));

import { EventsList } from './EventsList';

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

function renderWithStore(ui, store = createTestStore()) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

describe('EventsList', () => {
  const mockEvents = [
    {
      id: 1,
      name: 'Rock Concert',
      date: '2025-03-15T19:00:00.000Z',
      location: 'Madison Square Garden',
      description: 'An amazing rock concert.',
      availableTickets: 150,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    mockFetchEvents.mockImplementation(() => new Promise(() => {}));
    renderWithStore(<EventsList />);
    expect(document.querySelector('[class*="CircularProgress"]')).toBeInTheDocument();
  });

  it('renders events after data loads', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    renderWithStore(<EventsList />);
    await waitFor(() => {
      expect(screen.getByText('Rock Concert')).toBeInTheDocument();
    });
  });

  it('shows error alert on fetch failure', async () => {
    mockFetchEvents.mockRejectedValue(new Error('Failed to fetch'));
    renderWithStore(<EventsList />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/failed to fetch events/i)).toBeInTheDocument();
  });

  it('shows "No events found" when list is empty', async () => {
    mockFetchEvents.mockResolvedValue([]);
    renderWithStore(<EventsList />);
    await waitFor(() => {
      expect(screen.getByText(/no events found/i)).toBeInTheDocument();
    });
  });

  it('renders events table with data', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    renderWithStore(<EventsList />);
    await waitFor(() => {
      expect(screen.getByText('Rock Concert')).toBeInTheDocument();
      expect(screen.getByText('Madison Square Garden')).toBeInTheDocument();
    });
  });

  it('displays company name from settings', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    const store = createTestStore({
      settings: { companyName: 'Eventim' },
    });
    renderWithStore(<EventsList />, store);
    await waitFor(() => {
      expect(screen.getByText(/powered by: eventim/i)).toBeInTheDocument();
    });
  });

  it('displays support email from settings', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    const store = createTestStore({
      settings: { supportEmail: 'test@test.com' },
    });
    renderWithStore(<EventsList />, store);
    await waitFor(() => {
      expect(screen.getByText(/email us questions to: test@test.com/i)).toBeInTheDocument();
    });
  });

  it('displays both company name and support email', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    const store = createTestStore({
      settings: { companyName: 'Eventim', supportEmail: 'help@eventim.com' },
    });
    renderWithStore(<EventsList />, store);
    await waitFor(() => {
      expect(screen.getByText(/powered by: eventim/i)).toBeInTheDocument();
      expect(screen.getByText(/email us questions to: help@eventim.com/i)).toBeInTheDocument();
    });
  });

  it('does not show powered by text when companyName is empty', async () => {
    mockFetchEvents.mockResolvedValue(mockEvents);
    const store = createTestStore({
      settings: { supportEmail: 'test@test.com' },
    });
    renderWithStore(<EventsList />, store);
    await waitFor(() => {
      expect(screen.queryByText(/powered by:/i)).not.toBeInTheDocument();
    });
  });
});
