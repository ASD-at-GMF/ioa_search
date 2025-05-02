import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Grid,
  Stack,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import CommentIcon from '@mui/icons-material/Comment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Tweet } from './types';
import { formatDate, getHashtags, formatNumber } from './utils';

interface TweetCardProps {
  tweet: Tweet;

  onCardClick: (tweet: Tweet) => void;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet, onCardClick }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => onCardClick(tweet)}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 1 }}>
            @{tweet.user_screen_name}'s Tweet
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {tweet.tweet_text}
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                {formatDate(tweet.tweet_time)}
              </Typography>
            </Grid>
            
            {getHashtags(tweet.hashtags).length > 0 && (
              <Grid item>
                <Stack direction="row" spacing={1}>
                  {getHashtags(tweet.hashtags).slice(0, 3).map(tag => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ 
                        backgroundColor: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main,
                      }} 
                    />
                  ))}
                  {getHashtags(tweet.hashtags).length > 3 && (
                    <Chip 
                      label={`+${getHashtags(tweet.hashtags).length - 3}`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: `${theme.palette.primary.main}10`,
                        color: theme.palette.primary.main,
                      }} 
                    />
                  )}
                </Stack>
              </Grid>
            )}
          </Grid>
          
          <Box sx={{ display: 'flex', mt: 2, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{formatNumber(tweet.like_count)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <RepeatIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{formatNumber(tweet.retweet_count)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{formatNumber(tweet.reply_count)}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TweetCard;
