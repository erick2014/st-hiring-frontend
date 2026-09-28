import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Event } from '../types';
import { formatDate, truncateDescription } from '../../../shared/utils';

interface EventsTableProps {
  events: Event[];
  loading: boolean;
}

export function EventsTable({ events, loading }: EventsTableProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{marginTop: "20px"}}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><Typography variant="body2" fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight="bold">Date</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight="bold">Location</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight="bold">Description</Typography></TableCell>
              <TableCell align="center"><Typography variant="body2" fontWeight="bold">Tickets Available</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5}>
                      <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '100%',
                              height: 20,
                              bgcolor: '#e0e0e0',
                              borderRadius: 1,
                              animation: 'pulse 1.5s ease-in-out infinite',
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : events.map((event) => (
                  <TableRow
                    key={event.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f9f9f9' },
                      cursor: 'default',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {event.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(event.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{event.location}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {truncateDescription(event.description, 50)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          <Typography variant="body2" fontWeight="bold">
                            {event.availableTickets}
                          </Typography>
                        }
                        color={event.availableTickets > 0 ? 'primary' : 'default'}
                        variant={event.availableTickets > 0 ? 'filled' : 'outlined'}
                        clickable
                        sx={{ cursor: event.availableTickets > 0 ? 'pointer' : 'default' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
