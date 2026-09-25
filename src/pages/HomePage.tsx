import { Container, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        See Tickets
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Browse and book events near you
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Navigate to /events to see the events list
      </Typography>
    </Container>
  );
}
