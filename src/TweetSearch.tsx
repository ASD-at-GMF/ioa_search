import React, { useState } from 'react';
import {
  Box,
  Container,
  ThemeProvider,
  SelectChangeEvent,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import {
  TweetCard,
  TweetDetailsDialog,
  SearchBar,
  SearchResults,
  SearchFilters,
  theme,
  Tweet,
  ApiResponse
} from './components';
import { start } from 'repl';

const PAGE_SIZE = 10;
const TweetSearch: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [total, setTotal] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [sortBy, setSortBy] = useState<string>('');

  const fetchTweets = async (page: number, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL('http://ioarchive.com/search');
      if (query) {

        url.searchParams.append('query', query);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('size', PAGE_SIZE.toString());
        url.searchParams.append('language', language);
        if(startDate && endDate) {
          url.searchParams.append('from', formatDate(startDate.toString()));
          console.log('here')
          console.log(startDate.toString());
          url.searchParams.append('to', formatDate(endDate.toString()));
        }
        url.searchParams.append('sort_by', sortBy);

      }
      
      console.log(url.toString());

      const response = await fetch(url.toString());
      console.log(response)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  }

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

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  
  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
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

          <SearchFilters
            language={language}
            startDate={startDate}
            endDate={endDate}
            sortBy={sortBy}
            onLanguageChange={handleLanguageChange}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSortByChange={handleSortByChange}
          />
          
          <SearchResults
            loading={loading}
            error={error}
            tweets={tweets}
            total={total}
            searchQuery={searchQuery}
            onCardClick={handleCardClick}
            onClearSearch={handleClearSearch}
            fetchTweets={fetchTweets}
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
