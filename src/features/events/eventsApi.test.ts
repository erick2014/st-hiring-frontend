import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { fetchEvents } from './eventsApi';
import { server } from '../../test/msw-server';

describe('fetchEvents', () => {
  it('returns events array on success', async () => {
    const result = await fetchEvents();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('Rock Concert');
  });

  it('throws on network error (non-200)', async () => {
    server.use(
      http.get('/events', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await expect(fetchEvents()).rejects.toThrow('Failed to fetch events');
    } finally {
      server.restoreHandlers();
    }
  });
});
