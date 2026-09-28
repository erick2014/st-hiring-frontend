import { describe, it, expect } from 'vitest';
import {
  selectSettings,
  selectSettingsLoading,
  selectSettingsError,
} from './settingsSelectors';

describe('settings selectors', () => {
  const mockState = {
    settings: {
      settings: {
        companyName: 'Test Co',
        supportEmail: 'test@test.com',
        maxTicketsPerEvent: 3,
      },
      loading: true,
      error: 'some error',
    },
  };

  it('selectSettings returns settings object', () => {
    const result = selectSettings(mockState);
    expect(result).toEqual({
      companyName: 'Test Co',
      supportEmail: 'test@test.com',
      maxTicketsPerEvent: 3,
    });
  });

  it('selectSettings returns empty object when settings is empty', () => {
    const result = selectSettings({
      ...mockState,
      settings: {
        ...mockState.settings,
        settings: {},
      },
    });
    expect(result).toEqual({});
  });

  it('selectSettingsLoading returns loading boolean', () => {
    const result = selectSettingsLoading(mockState);
    expect(result).toBe(true);
  });

  it('selectSettingsLoading returns false when not loading', () => {
    const result = selectSettingsLoading({
      ...mockState,
      settings: {
        ...mockState.settings,
        loading: false,
      },
    });
    expect(result).toBe(false);
  });

  it('selectSettingsError returns error string', () => {
    const result = selectSettingsError(mockState);
    expect(result).toBe('some error');
  });

  it('selectSettingsError returns null when no error', () => {
    const result = selectSettingsError({
      ...mockState,
      settings: {
        ...mockState.settings,
        error: null,
      },
    });
    expect(result).toBeNull();
  });
});
