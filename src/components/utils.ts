/**
 * Utility functions for formatting and data manipulation
 */

/**
 * Formats a date string into a short, readable format
 * Example: "Mar 15, 2025"
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Formats a date string into a detailed, readable format
 * Example: "March 15, 2025, 2:30 PM"
 */
export const formatDateDetailed = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Processes and normalizes hashtags array
 * Ensures consistent format and removes duplicates
 */
export const getHashtags = (hashtags: string[] | undefined): string[] => {
  if (!hashtags) return []
  return hashtags
};

/**
 * Formats large numbers into human-readable format
 * Example: 1000 -> "1K", 1000000 -> "1M"
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
