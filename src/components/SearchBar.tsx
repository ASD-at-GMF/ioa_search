/**
 * SearchBar Component
 * Provides the main search interface for the application
 * Features:
 * - Search input field with icon
 * - Loading state indicator
 * - Submit button
 * - Responsive design
 */

import React from 'react';
import {
  Paper,
  TextField,
  Button,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Props interface for the search bar component
interface SearchBarProps {
  searchInput: string;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchInput, 
  loading, 
  onInputChange, 
  onSubmit 
}) => {
  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      elevation={1}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        mb: 4,
        borderRadius: 2,
      }}
    >
      <InputAdornment position="start" sx={{ pl: 1.5 }}>
        <SearchIcon color="action" />
      </InputAdornment>
      <TextField
        fullWidth
        placeholder="Search tweets..."
        variant="standard"
        value={searchInput}
        onChange={onInputChange}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ ml: 1, flex: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ 
          m: 1,
          borderRadius: 2,
          color: 'white'
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
      </Button>
    </Paper>
  );
};

export default SearchBar;
