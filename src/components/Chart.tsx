import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart
} from 'recharts';
import {
  Tweet
} from './types';

interface ChartProps {
  tweetData: Tweet[];
}

const Chart: React.FC<ChartProps> = ({ 
  tweetData
}) => {
  const data = tweetData
    .map((tweet) => {
      const tweetDate = new Date(tweet.tweet_time);
      return {
        tweetTime: tweetDate.getTime(),
        followerCount: tweet.follower_count,
        displayTime: tweetDate.toLocaleDateString(),
      };
    })
    .sort((a, b) => a.tweetTime - b.tweetTime);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="tweetTime" 
          name="Tweet Time"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
          label={{ value: 'Tweet Date', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          type="number" 
          dataKey="followerCount" 
          name="Follower Count"
          label={{ value: 'Follower Count', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          formatter={(value: any, name: string) => {
            if (name === 'followerCount') return [value.toLocaleString(), 'Followers'];
            return [new Date(value).toLocaleDateString(), 'Date'];
          }}
        />
        <Scatter 
          name="Tweets" 
          data={data} 
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Chart;
