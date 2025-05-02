/**
 * SearchResults Component
 * Displays the search results with features including:
 * - Paginated tweet list
 * - Loading and error states
 * - Active filters display
 * - CSV export functionality
 * - Tweet count and statistics
 */

import React, {useEffect, useState} from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { Tweet } from './types';
import TweetCard from './TweetCard';
import DownloadCSVButton from './DownloadCSVButton';

// Props interface for the search results component
interface SearchResultsProps {
  loading: boolean;
  error: Error | null;
  tweets: Tweet[];
  total: number;
  searchQuery: string;
  onCardClick: (tweet: Tweet) => void;
  onClearSearch: () => void;
  fetchTweets: (page: number, query: string) => void;
  language?: string;
  startDate?: string | null;
  endDate?: string | null;
  sortBy?: string;
  hashtags?: string[];
}

const PAGE_SIZE = 10;  
const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  error,
  tweets,
  total,
  searchQuery,
  onCardClick,
  onClearSearch,
  fetchTweets,
  language = '',
  startDate = null,
  endDate = null,
  sortBy = '',
  hashtags = []
}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // useEffect(() => {
  //   // Fetch tweets when the page changes
  
  //     fetchTweets(page, searchQuery);
  // }, [page, searchQuery, fetchTweets]); 

  const startIndex = (page - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(page * PAGE_SIZE, total);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    fetchTweets(newPage, searchQuery);
  };
  

  return (
    <Box sx={{ mt: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error.message}
        </Alert>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {searchQuery && (
                <Typography variant="body1" color="text.secondary">
                  Showing results {tweets.length > 0 ? `${startIndex}-${endIndex}` : '0'} out of {total}
                </Typography>
              )}
              {tweets.length > 0 && (
                <DownloadCSVButton
                  searchQuery={searchQuery}
                  language={language}
                  startDate={startDate}
                  endDate={endDate}
                  sortBy={sortBy}
                  hashtags={hashtags}
                  pageSize={PAGE_SIZE}
                  totalResults={total}
                />
              )}
            </Box>
            {searchQuery && (
              <Chip 
                label={`Search: ${searchQuery}`}
                color="primary"
                variant="outlined"
                onDelete={onClearSearch}
              />
            )}
          </Box>
          
          {searchQuery && tweets.length === 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tweets found
              </Typography>
            </Box>
          )}
          
          {tweets.length > 0 && (
            <>
              {tweets.map((tweet) => (
                <TweetCard
                  key={tweet.tweetid}
                  tweet={tweet}
                  onCardClick={onCardClick}
                />
              ))}
              {total > PAGE_SIZE && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResults;
