import { Tweet } from '../components/types';

export const convertTweetsToCSV = (tweets: Tweet[]): string => {
  if (tweets.length === 0) return '';

  const headers = Object.keys(tweets[0]);
  const csvRows = [headers.join(',')];
  
  for (const tweet of tweets) {
    const values = headers.map(header => {
      const value = tweet[header as keyof Tweet];
      const escaped = typeof value === 'string' 
        ? `"${value.replace(/"/g, '""')}"` 
        : value;
      return escaped;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export const downloadCSV = (csvContent: string, filename: string = 'tweets_export.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
