import { describe, it, expect } from 'vitest';
import {
  settingsSlice,
  setSettings,
  setLoading,
  setError,
} from './settingsSlice';

describe('settingsSlice', () => {
  const initialState = {
    settings: {},
    loading: false,
    error: null,
  };

  it('has correct initial state', () => {
    const state = settingsSlice.reducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('handles setSettings', () => {
    const settings = {
      companyName: 'Test Co',
      supportEmail: 'test@test.com',
      maxTicketsPerEvent: 3,
    };
    const result = settingsSlice.reducer(
      initialState,
      setSettings(settings)
    );
    expect(result.settings).toEqual(settings);
    expect(result.loading).toBe(false);
    expect(result.error).toBeNull();
  });

  it('handles setSettings with partial data', () => {
    const result = settingsSlice.reducer(
      initialState,
      setSettings({ companyName: 'Test Co' })
    );
    expect(result.settings.companyName).toBe('Test Co');
  });

  it('handles setLoading(true)', () => {
    const result = settingsSlice.reducer(
      initialState,
      setLoading(true)
    );
    expect(result.loading).toBe(true);
  });

  it('handles setLoading(false)', () => {
    const result = settingsSlice.reducer(
      { ...initialState, loading: true },
      setLoading(false)
    );
    expect(result.loading).toBe(false);
  });

  it('handles setError', () => {
    const result = settingsSlice.reducer(
      initialState,
      setError('Something went wrong')
    );
    expect(result.error).toBe('Something went wrong');
  });

  it('handles setError with null', () => {
    const result = settingsSlice.reducer(
      { ...initialState, error: 'previous error' },
      setError(null)
    );
    expect(result.error).toBeNull();
  });
});
