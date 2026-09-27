import { Event } from './types';

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}
