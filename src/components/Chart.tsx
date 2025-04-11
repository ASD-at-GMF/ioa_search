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
  const data = tweetData.map((tweet) => {
    const creationDate = new Date(tweet.account_creation_date);
    const now = new Date();
    const accountAgeInYears = (now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return {
      accountAge: Number(accountAgeInYears.toFixed(2)),
      followerCount: Number(tweet.follower_count),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="accountAge" 
          name="Account Age (years)" 
          label={{ value: 'Account Age (years)', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          type="number" 
          dataKey="followerCount" 
          name="Follower Count"
          label={{ value: 'Follower Count', angle: -90, position: 'insideLeft' }}
        />
        <Scatter name="Accounts" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Chart;
