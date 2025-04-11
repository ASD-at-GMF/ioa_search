import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  ThemeProvider,
  SelectChangeEvent,
  Autocomplete,
  TextField
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
  ApiResponse,
  Chart
} from './components';
import { start } from 'repl';
import { ChatRounded } from '@mui/icons-material';

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
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);

  const fetchTweets = async (page: number, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL('http://ioarchive.com/search');
      url.searchParams.append('query', query);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('size', PAGE_SIZE.toString());
      url.searchParams.append('language', language);
      if(startDate && endDate) {
        url.searchParams.append('from', formatDate(startDate.toString()));
        url.searchParams.append('to', formatDate(endDate.toString()));
      }
      url.searchParams.append('sort_by', sortBy);
      hashtags.forEach(tag => {
        const normalized = tag.startsWith('#') ? tag.slice(1) : tag;
        url.searchParams.append('hashtags', normalized);
      });
            
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
  
  const fetchHashtagSuggestions = async () => {
    try {
      const url = new URL('http://ioarchive.com/insights');
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch hashtag suggestions');
      }
      const data = await response.json();
      const topHashtags = data.top_hashtags.map((item: any) => item.key);
      setSuggestedHashtags(topHashtags);
    } catch (err) {
      console.error('Error fetching hashtag suggestions:', err);
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

  const handleAddHashtag = () => {
    let trimmed = hashtagInput.trim();
    if (!trimmed.startsWith('#')) {
      trimmed = `#${trimmed}`;
    }
    if (trimmed && !hashtags.includes(trimmed)) {
      setHashtags([...hashtags, trimmed]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
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


  useEffect(() => {
    fetchHashtagSuggestions();
  }, []);

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

          <Box sx={{ mb: 2 }}>
            <Autocomplete
              multiple
              freeSolo
              options={suggestedHashtags}
              value={hashtags}
              onChange={(event, newValue) => {
                setHashtags(newValue);
              }}
              inputValue={hashtagInput}
              onInputChange={(event, newInputValue) => {
                setHashtagInput(newInputValue);
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      mr: 1,
                      mb: 1
                    }}
                  >
                    #{option}
                    <Box
                      component="button"
                      onClick={() =>
                        setHashtags(hashtags.filter(tag => tag !== option))
                      }
                      sx={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        ml: 1,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      ×
                    </Box>
                  </Box>
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Hashtags"
                  placeholder="Type and press Enter"
                />
              )}
            />
          </Box>

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

          {tweets.length > 0 && (
            <Chart tweetData={tweets} />
          )}

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
