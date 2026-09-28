import { useEffect, useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../eventsApi';
import { Event } from '../types';
import { Spinner } from '../../../shared/components/Spinner/Spinner';
import { EventsTable } from './EventsTable';
import { selectSettings } from '../../settings/settingsSelectors';

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { companyName, supportEmail } = useSelector(selectSettings);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        // intentionally handle this state locally, instead of using Redux, since other components don't need to know about this data
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

  if (!events.length) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
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
      <Typography variant="body1" gutterBottom>
        { companyName ? `Powered by: ${companyName}` : '' }  {supportEmail ? `/ Email us questions to: ${supportEmail}` : ''}
      </Typography>
      <EventsTable events={events} loading={loading} />
    </Container>
  );
}
