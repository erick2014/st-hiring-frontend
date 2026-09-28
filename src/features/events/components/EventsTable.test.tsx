import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventsTable } from './EventsTable';
import { Event } from '../types';
import { mockEvents } from '../../../test/msw-server';

describe('EventsTable', () => {
  it('renders loading skeleton when loading=true', () => {
    const { container } = render(<EventsTable events={[]} loading={true} />);
    const skeletonBoxes = container.querySelectorAll('[class*="Box-root"]');
    expect(skeletonBoxes.length).toBeGreaterThan(0);
  });

  it('renders events list when loading=false', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    expect(screen.getByText('Rock Concert')).toBeInTheDocument();
    expect(screen.getByText('Comedy Show')).toBeInTheDocument();
  });

  it('displays event name', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    expect(screen.getByText('Rock Concert')).toBeInTheDocument();
    expect(screen.getByText('Comedy Show')).toBeInTheDocument();
  });

  it('displays event date in correct format', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    expect(screen.getByText('Mar 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('Apr 20, 2025')).toBeInTheDocument();
  });

  it('displays event location', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    expect(screen.getByText('Madison Square Garden')).toBeInTheDocument();
    expect(screen.getByText('The Laugh Factory')).toBeInTheDocument();
  });

  it('displays ticket count', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescription = 'This is an extremely long description that should definitely be truncated by the truncateDescription function because it exceeds the maximum allowed length.';
    const longEvent: Event = {
      id: 3,
      name: 'Long Event',
      date: new Date('2025-06-01T12:00:00.000Z'),
      location: 'Big Venue',
      description: longDescription,
      availableTickets: 10,
    };
    render(<EventsTable events={[longEvent]} loading={false} />);
    expect(screen.getByText('Long Event')).toBeInTheDocument();
    expect(screen.queryByText(longDescription)).not.toBeInTheDocument();
  });

  it('shows available chip when tickets > 0', () => {
    render(<EventsTable events={mockEvents} loading={false} />);
    const ticketsChip = screen.getByText('150');
    expect(ticketsChip).toBeInTheDocument();
  });

});
