import { useEffect, useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { fetchEvents } from '../eventsApi';
import { Event } from '../types';
import { Spinner } from '../../../shared/components/Spinner/Spinner';
import { EventsTable } from './EventsTable';

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" variant="filled">
          <Typography variant="body1" component="span" fontWeight="bold" mr={1}>
            Error:
          </Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  if (events.length === 0) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No events found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Events
      </Typography>
      <EventsTable events={events} loading={loading} />
    </Container>
  );
}
