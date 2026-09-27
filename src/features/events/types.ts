export interface Ticket {
  id: number;
  eventId: number;
  type: string;
  status: string;
  price: number;
}

export interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description: string;
  availableTickets: number
}
