/**
 * Chart Component
 * Displays various analytics visualizations for tweet data including:
 * - Time-based tweet frequency
 * - Top hashtags distribution
 * - Top users activity
 * - URL frequency analysis
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Types for the insight data received from the API
interface InsightData {
  top_hashtags: Array<{ key: string; doc_count: number }>;
  top_urls: Array<{ key: string; doc_count: number }>;
  top_users: Array<{ key: string; doc_count: number }>;
  tweets_over_time: Array<{ key: number; key_as_string: string; doc_count: number }>;
}

interface ChartProps {
  insightData: InsightData;
}

const Chart: React.FC<ChartProps> = ({ insightData }) => {
  const { top_hashtags, top_users, top_urls, tweets_over_time } = insightData;

  const renderHistogram = (
    data: Array<{ key: string; doc_count: number }>,
    title: string,
    options: {
      height?: number;
      hideXAxis?: boolean;
      barGap?: number;
      barSize?: number;
      fill?: string;
    } = {}
  ) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={options.height || 200}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          barGap={options.barGap}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="key"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
            tick={options.hideXAxis ? false : undefined}
          />
          <YAxis dataKey="doc_count" />
          <Tooltip
            formatter={(value: number) => [`${value} tweets`, 'Count']}
          />
          <Bar 
            dataKey="doc_count" 
            fill={options.fill || '#1da1f2'}
            barSize={options.barSize}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // Group time series data by weeks
  const timeSeriesData = tweets_over_time.reduce((acc, item) => {
    const date = new Date(item.key_as_string);
    // Get the week start date
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toLocaleDateString();

    const existingWeek = acc.find(w => w.key === weekKey);
    if (existingWeek) {
      existingWeek.doc_count += item.doc_count;
    } else {
      acc.push({
        key: weekKey,
        doc_count: item.doc_count,
        originalDate: date
      });
    }
    return acc;
  }, [] as Array<{ key: string; doc_count: number; originalDate: Date }>).sort(
    (a, b) => a.originalDate.getTime() - b.originalDate.getTime()
  );

  return (
    <div className="space-y-8">
      {renderHistogram(timeSeriesData, 'Tweets by Month', {
        height: 300,
        hideXAxis: true,
        barGap: 0,
        barSize: 15,
        fill: '#1da1f2'
      })}
      {renderHistogram(top_hashtags, 'Top Hashtags')}
      {renderHistogram(top_users, 'Top Users')}
      {renderHistogram(top_urls.filter(item => item.key !== ''), 'Top URLs')}
    </div>
  );
};

export default Chart;
