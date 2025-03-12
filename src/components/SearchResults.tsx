import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Alert
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
}

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  error,
  tweets,
  total,
  searchQuery,
  onCardClick,
  onClearSearch
}) => {
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
              Showing results {tweets.length > 0 ? `1-${tweets.length}` : '0'} out of {total}
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
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResults;
