import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import { EventsList } from '../features/events/components/EventsList';

vi.mock('../features/events/eventsApi', () => ({
  fetchEvents: vi.fn(),
}));

import { fetchEvents } from '../features/events/eventsApi';

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

describe('EventsPage', () => {
  it('renders EventsList', async () => {
    vi.mocked(fetchEvents).mockResolvedValue([
      {
        id: 1,
        name: 'Test Event',
        date: new Date('2025-03-15T19:00:00.000Z'),
        location: 'Test Venue',
        description: 'Test description',
        availableTickets: 100,
      },
    ]);
    const store = createTestStore();
    renderWithStore(<EventsList />, store);
    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
    });
  });
});
