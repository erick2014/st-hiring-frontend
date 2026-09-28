import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { fetchSettings, saveSettings } from './settingsApi';
import { server } from '../../test/msw-server';

describe('fetchSettings', () => {
  it('returns settings object on success', async () => {
    const result = await fetchSettings();
    expect(result).toEqual({
      companyName: 'Eventim',
      supportEmail: 'support@eventim.com',
      maxTicketsPerEvent: 5,
    });
  });

  it('throws on network error (non-200)', async () => {
    server.use(
      http.get('/settings', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await expect(fetchSettings()).rejects.toThrow('Failed to fetch settings');
    } finally {
      server.restoreHandlers();
    }
  });
});

describe('saveSettings', () => {
  it('sends POST with partial settings', async () => {
    server.use(
      http.post('/settings', async () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    try {
      await expect(saveSettings({ companyName: 'New Co' })).resolves.toBeUndefined();
    } finally {
      server.restoreHandlers();
    }
  });

  it('throws on network error (non-200)', async () => {
    server.use(
      http.post('/settings', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await expect(saveSettings({ companyName: 'Test' })).rejects.toThrow('Failed to save settings');
    } finally {
      server.restoreHandlers();
    }
  });
});
