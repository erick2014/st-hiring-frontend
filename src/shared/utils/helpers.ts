export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function truncateDescription(
  description: string,
  maxLength = 50
): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + '...';
}
