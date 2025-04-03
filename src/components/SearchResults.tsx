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

interface SearchResultsProps {
  loading: boolean;
  error: Error | null;
  tweets: Tweet[];
  total: number;
  searchQuery: string;
  onCardClick: (tweet: Tweet) => void;
  onClearSearch: () => void;

  fetchTweets: (page: number, query: string) => void;
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
  fetchTweets
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
  if (!searchQuery && !loading) {
    return null;
  }
  

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
            <Typography variant="body1" color="text.secondary">
              Showing results {tweets.length > 0 ? `${startIndex}-${endIndex}` : '0'} out of {total}
            </Typography>
            {searchQuery && (
              <Chip 
                label={`Search: ${searchQuery}`}
                color="primary"
                variant="outlined"
                onDelete={onClearSearch}
              />
            )}
          </Box>
          
          {tweets.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No tweets found
              </Typography>
            </Paper>
          ) : (
            <>
              {tweets.map((tweet, index) => (
                <TweetCard
                  key={tweet.tweetid}
                  tweet={tweet}
                  index={index}
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
