import React from 'react';
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  FormControl,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface SearchFiltersProps {
  language: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  sortBy: string;
  onLanguageChange: (event: SelectChangeEvent) => void;
  onStartDateChange: (newValue: Dayjs | null) => void;
  onEndDateChange: (newValue: Dayjs | null) => void;
  onSortByChange: (event: SelectChangeEvent) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  language,
  startDate,
  endDate,
  sortBy,
  onLanguageChange,
  onStartDateChange,
  onEndDateChange,
  onSortByChange,
}) => {
  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={onLanguageChange}
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="da">Danish</MenuItem>
            <MenuItem value="nl">Dutch</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{ textField: { size: 'small' } }}
          />
          <Box sx={{ mx: 2 }}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={onEndDateChange}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Box>
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={onSortByChange}
            size="small"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="_score">Accuracy</MenuItem>
            <MenuItem value="tweet_time">Time</MenuItem>
            <MenuItem value="retweet_count">Retweets</MenuItem>
            <MenuItem value="like_count">Likes</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default SearchFilters;
