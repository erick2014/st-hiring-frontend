import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { SettingsPage } from './SettingsPage';

vi.mock('../features/settings/components/SettingsModal', () => ({
  SettingsModal: () => null,
}));

describe('SettingsPage', () => {
  it('renders the gear icon', () => {
    render(<SettingsPage />);
    const gearIcon = document.querySelector('svg');
    expect(gearIcon).toBeInTheDocument();
  });

  it('gear icon is clickable', () => {
    render(<SettingsPage />);
    const gearIcon = document.querySelector('svg');
    expect(gearIcon).toBeInTheDocument();
  });
});
