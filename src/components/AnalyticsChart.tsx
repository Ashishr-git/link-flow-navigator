
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalytics } from '@/lib/mock-data';

const AnalyticsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Click Analytics</CardTitle>
        <CardDescription>
          Track link performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalytics.clicksOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#2563eb" 
                name="Total Clicks"
              />
              <Line 
                type="monotone" 
                dataKey="uniqueUsers" 
                stroke="#16a34a" 
                name="Unique Users"
              />
              <Line 
                type="monotone" 
                dataKey="searchClicks" 
                stroke="#ca8a04" 
                name="Search Clicks"
              />
              <Line 
                type="monotone" 
                dataKey="directClicks" 
                stroke="#9333ea" 
                name="Direct Clicks"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
