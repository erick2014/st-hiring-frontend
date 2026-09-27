import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Alert } from '@mui/material';
import { fetchEvents } from '../eventsApi';
import { setLoading, setEvents, setError } from '../eventsSlice';
import { Spinner } from '../../../shared/components/Spinner/Spinner';
import { EventsTable } from './EventsTable';
import {
  selectEvents,
  selectEventsLoading,
  selectEventsError,
} from '../eventsSelectors';

export function EventsList() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchEvents();
        dispatch(setEvents(data));
      } catch (err) {
        dispatch(setError('Failed to fetch events'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadData()
  }, [dispatch]);

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
