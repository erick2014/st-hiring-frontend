import { RootState } from '../../app/store';

export const selectSettings = (state: RootState) => state.settings.settings;
export const selectSettingsLoading = (state: RootState) => state.settings.loading;
export const selectSettingsError = (state: RootState) => state.settings.error;
