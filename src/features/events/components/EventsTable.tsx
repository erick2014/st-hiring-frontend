import { useState } from 'react';
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
  Popover,
  Chip,
} from '@mui/material';
import { Event } from '../types';
import { formatCurrency, truncateDescription } from '../../../shared/utils';

interface EventsTableProps {
  events: Event[];
  loading: boolean;
}

export function EventsTable({ events, loading }: EventsTableProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const open = Boolean(anchorEl);

  const handleTicketsClick = (
    event: React.MouseEvent<HTMLElement>,
    eventItem: Event
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventItem);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
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
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(new Date(event.date))}
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
                            {event.availableTickets.length}
                          </Typography>
                        }
                        color={event.availableTickets.length > 0 ? 'primary' : 'default'}
                        variant={event.availableTickets.length > 0 ? 'filled' : 'outlined'}
                        clickable
                        onClick={(e) => handleTicketsClick(e, event)}
                        sx={{ cursor: event.availableTickets.length > 0 ? 'pointer' : 'default' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedEvent?.name} - Tickets
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {selectedEvent?.availableTickets.length} ticket(s) available
        </Typography>
        <Box sx={{ mt: 1 }}>
          {selectedEvent?.availableTickets.map((ticket: { id: number; type: string; status: string; price: number }) => (
            <Box
              key={ticket.id}
              sx={{
                p: 1.5,
                mb: 1,
                borderRadius: 1,
                bgcolor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {ticket.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatCurrency(ticket.price)}
                </Typography>
              </Box>
              <Chip
                label={ticket.status}
                size="small"
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            onClick={handleClose}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Close
          </Typography>
        </Box>
      </Popover>
    </>
  );
}
