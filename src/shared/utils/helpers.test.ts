import { describe, it, expect } from 'vitest';
import { formatDate, truncateDescription } from './helpers';

describe('formatDate', () => {
  it('formats a Date object correctly', () => {
    const result = formatDate(new Date(2025, 0, 15));
    expect(result).toBe('Jan 15, 2025');
  });

  it('formats a date string correctly', () => {
    // Use a Date object to avoid timezone issues with string parsing
    const result = formatDate(new Date('2025-01-15T00:00:00'));
    expect(result).toBe('Jan 15, 2025');
  });

  it('formats different dates correctly', () => {
    const result = formatDate(new Date(2024, 11, 25));
    expect(result).toBe('Dec 25, 2024');
  });

  it('handles edge case - end of year', () => {
    const result = formatDate(new Date(2024, 11, 31));
    expect(result).toBe('Dec 31, 2024');
  });
});

describe('truncateDescription', () => {
  it('does not truncate short strings', () => {
    const result = truncateDescription('hi', 50);
    expect(result).toBe('hi');
  });

  it('does not truncate strings at exactly max length', () => {
    const result = truncateDescription('a'.repeat(50), 50);
    expect(result).toBe('a'.repeat(50));
  });

  it('truncates long strings with ellipsis', () => {
    const longText = 'This is a very long description that should be truncated because it exceeds the maximum length allowed.';
    const result = truncateDescription(longText, 20);
    expect(result).toBe('This is a very long ...');
  });

  it('uses default max length of 50', () => {
    const longText = 'This is a very long description that should be truncated because it exceeds the maximum length allowed.';
    const result = truncateDescription(longText);
    expect(result.length).toBe(53); // 50 chars + '...'
  });

  it('truncates with custom max length', () => {
    const result = truncateDescription('Hello World', 5);
    expect(result).toBe('Hello...');
  });
});
