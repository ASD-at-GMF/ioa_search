import React from 'react';
import {
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Stack,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { Tweet } from './types';
import { formatDateDetailed, getHashtags } from './utils';

interface TweetDetailsDialogProps {
  tweet: Tweet | null;
  open: boolean;
  onClose: () => void;
}

const TweetDetailsDialog: React.FC<TweetDetailsDialogProps> = ({ tweet, open, onClose }) => {
  if (!tweet) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={tweet.user_screen_name}
              sx={{ bgcolor: 'primary.main', mr: 2 }}
            >
              {tweet.user_screen_name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {tweet.user_display_name || tweet.user_screen_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{tweet.user_screen_name}
              </Typography>
            </Box>
          </Box>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom paragraph>
          {tweet.tweet_text}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {formatDateDetailed(tweet.tweet_time)}
        </Typography>
        
        {getHashtags(tweet.hashtags).length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {getHashtags(tweet.hashtags).map(tag => (
                <Chip 
                  key={tag} 
                  label={`#${tag}`} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    my: 0.5
                  }} 
                />
              ))}
            </Stack>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" align="center">
                {tweet.like_count}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Likes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" align="center">
                {tweet.retweet_count}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Retweets
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" align="center">
                {tweet.reply_count}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Replies
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          User Profile
        </Typography>
        
        <List disablePadding>
          {tweet.user_reported_location && (
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <LocationOnIcon color="action" />
              </ListItemAvatar>
              <ListItemText 
                primary={tweet.user_reported_location} 
                secondary="Location" 
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          )}
          
          <ListItem disablePadding sx={{ py: 1 }}>
            <ListItemAvatar sx={{ minWidth: 40 }}>
              <PeopleIcon color="action" />
            </ListItemAvatar>
            <ListItemText 
              primary={`${tweet.follower_count} followers · ${tweet.following_count} following`}
              secondary="Network" 
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
          
          {tweet.user_profile_description && (
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <PersonIcon color="action" />
              </ListItemAvatar>
              <ListItemText 
                primary={tweet.user_profile_description} 
                secondary="Bio" 
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          )}
        </List>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TweetDetailsDialog;
