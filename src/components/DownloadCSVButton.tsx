import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tweet, ApiResponse } from './types';
import { convertTweetsToCSV, downloadCSV } from '../utils/csvExport';

interface DownloadCSVButtonProps {
  searchQuery: string;
  language: string;
  startDate: string | null;
  endDate: string | null;
  sortBy: string;
  hashtags: string[];
  pageSize: number;
  totalResults: number;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({
  searchQuery,
  language,
  startDate,
  endDate,
  sortBy,
  hashtags,
  pageSize,
  totalResults
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllTweets = async (): Promise<Tweet[]> => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const allTweets: Tweet[] = [];
    
    for (let page = 1; page <= totalPages; page++) {
      try {
        const url = new URL('http://ioarchive.com/search');
        url.searchParams.append('query', searchQuery);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('size', pageSize.toString());
        url.searchParams.append('language', language);
        
        if (startDate && endDate) {
          url.searchParams.append('from', startDate);
          url.searchParams.append('to', endDate);
        }
        
        url.searchParams.append('sort_by', sortBy);
        
        hashtags.forEach(tag => {
          const normalized = tag.startsWith('#') ? tag.slice(1) : tag;
          url.searchParams.append('hashtags', normalized);
        });
        
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`Failed to fetch page ${page}`);
        }
        
        const data = await response.json() as ApiResponse;
        allTweets.push(...data.tweets);
        
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        break;
      }
    }
    
    return allTweets;
  };

  const handleDownloadCSV = async () => {
    if (totalResults === 0) return;
    
    setLoading(true);
    try {
      const allTweets = await fetchAllTweets();
      const csvContent = convertTweetsToCSV(allTweets);
      const date = new Date().toISOString().split('T')[0];
      const queryPart = searchQuery ? `_${searchQuery.replace(/[^a-z0-9]/gi, '_').substring(0, 30)}` : '';
      const filename = `tweets_export${queryPart}_${date}.csv`;
      
      downloadCSV(csvContent, filename);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleDownloadCSV}
      disabled={loading || totalResults === 0}
      startIcon={loading ? <CircularProgress size={20} /> : <FileDownloadIcon />}
      sx={{ ml: 2 }}
    >
      {loading ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
};

export default DownloadCSVButton;
