import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const mockEvents = [
  {
    id: 1,
    name: 'Rock Concert',
    date: new Date('2025-03-15T19:00:00.000Z'),
    location: 'Madison Square Garden',
    description: 'An amazing rock concert featuring top bands from around the world.',
    availableTickets: 150,
  },
  {
    id: 2,
    name: 'Comedy Show',
    date: new Date('2025-04-20T20:00:00.000Z'),
    location: 'The Laugh Factory',
    description: 'A hilarious evening with stand-up comedians.',
    availableTickets: 0,
  },
  {
    id: 3,
    name: 'Jazz Night',
    date: new Date('2025-05-10T21:00:00.000Z'),
    location: 'Blue Note Jazz Club',
    description: 'A sophisticated jazz evening with world-class musicians.',
    availableTickets: 50,
  },
];

const mockSettings = {
  companyName: 'Eventim',
  supportEmail: 'support@eventim.com',
  maxTicketsPerEvent: 5,
};

const handlers = [
  http.get('/events', () => {
    return HttpResponse.json({ events: mockEvents });
  }),

  http.get('/settings', () => {
    return HttpResponse.json(mockSettings);
  }),

  http.post('/settings', async ({ request }) => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get('/events/fail', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
  }),

  http.get('/events/empty', () => {
    return HttpResponse.json([]);
  }),

  http.get('/settings/fail', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
  }),
];

export const server = setupServer(...handlers);
