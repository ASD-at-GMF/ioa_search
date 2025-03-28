import React, { useState } from 'react';
import {
  Box,
  Container,
  ThemeProvider
} from '@mui/material';
import {
  TweetCard,
  TweetDetailsDialog,
  SearchBar,
  SearchResults,
  theme,
  Tweet,
  ApiResponse
} from './components';

const TweetSearch: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchTweets = async (page: number, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL('http://ioarchive.com/mock_search');
      if (query) {
        url.searchParams.append('q', query);
      }
      url.searchParams.append('page', page.toString());

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json() as ApiResponse;
      setTweets(data.tweets);
      setTotal(data.total);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    fetchTweets(1, searchInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleCardClick = (tweet: Tweet) => {
    setSelectedTweet(tweet);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchInput('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              IOA Search
            </Typography>
          </Toolbar>
        </AppBar> */}
        
        <Container maxWidth="md" sx={{ py: 4 }}>
          <SearchBar 
            searchInput={searchInput}
            loading={loading}
            onInputChange={handleInputChange}
            onSubmit={handleSearch}
          />
          
          <SearchResults
            loading={loading}
            error={error}
            tweets={tweets}
            total={total}
            searchQuery={searchQuery}
            onCardClick={handleCardClick}
            onClearSearch={handleClearSearch}
            fetchTweets={(page: number) => fetchTweets(page, searchQuery)}
          />
        </Container>
        
        <TweetDetailsDialog
          tweet={selectedTweet}
          open={dialogOpen}
          onClose={handleCloseDialog}
        />
      </Box>
    </ThemeProvider>
  );
};

export default TweetSearch;
