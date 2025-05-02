/**
 * Type definitions for the IOA Search application
 */

/**
 * Tweet interface representing the structure of a tweet from the IOA dataset
 * Contains all metadata and engagement metrics for a single tweet
 */
export interface Tweet {
  account_creation_date: string | null;
  account_language: string;
  dataset: string;
  file_name: string;
  follower_count: number;
  following_count: number;
  hashtags: string[];
  in_reply_to_tweetid: string;
  in_reply_to_userid: string;
  is_retweet: string;
  latitude: string;
  like_count: number;
  longitude: string;
  quote_count: number;
  quoted_tweet_tweetid: string;
  reply_count: number;
  retweet_count: number;
  retweet_tweetid: string;
  retweet_userid: string;
  tweet_client_name: string;
  tweet_language: string;
  tweet_text: string;
  tweet_time: string;
  tweetid: string;
  urls: string;
  user_display_name: string;
  user_mentions: string[];
  user_profile_description: string;
  user_profile_url: string;
  user_reported_location: string;
  user_screen_name: string;
  userid: string;
}

/**
 * API response interface for paginated tweet search results
 */
export interface ApiResponse {
  page: number;
  size: number;
  total: number;
  tweets: Tweet[];
}
