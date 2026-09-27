import { Settings } from './types';

export async function fetchSettings(): Promise<Settings> {
  const response = await fetch('/settings');
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  return response.json();
}

export async function saveSettings(data: Partial<Settings>): Promise<void> {
  const response = await fetch('/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to save settings');
  }
}
