import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lock, TrendingUp, Download } from 'lucide-react';
import { Button } from './ui/button';
import { MembershipTier } from '../types';

interface AnalyticsDashboardProps {
  membershipTier: MembershipTier;
  onUpgrade: () => void;
}

const weeklyFloodData = [
  { day: 'Mon', floods: 12, resolved: 8 },
  { day: 'Tue', floods: 15, resolved: 11 },
  { day: 'Wed', floods: 8, resolved: 14 },
  { day: 'Thu', floods: 18, resolved: 9 },
  { day: 'Fri', floods: 22, resolved: 15 },
  { day: 'Sat', floods: 10, resolved: 18 },
  { day: 'Sun', floods: 14, resolved: 12 }
];

const severityData = [
  { name: 'Critical', value: 8, color: '#ef4444' },
  { name: 'High', value: 15, color: '#f97316' },
  { name: 'Medium', value: 23, color: '#eab308' },
  { name: 'Low', value: 31, color: '#3b82f6' }
];

const monthlyTrend = [
  { month: 'Oct', incidents: 45 },
  { month: 'Nov', incidents: 52 },
  { month: 'Dec', incidents: 38 },
  { month: 'Jan', incidents: 61 },
  { month: 'Feb', incidents: 48 },
  { month: 'Mar', incidents: 77 }
];

export function AnalyticsDashboard({ membershipTier, onUpgrade }: AnalyticsDashboardProps) {
  const isPremium = membershipTier === 'premium';

  const LockedOverlay = () => (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-3">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Premium Feature</h3>
        <p className="text-sm text-gray-600 mb-3">Unlock advanced analytics</p>
        <Button 
          size="sm"
          onClick={onUpgrade}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
        </div>
        {isPremium && (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="relative">
          {!isPremium && <LockedOverlay />}
          <CardHeader>
            <CardTitle className="text-base">Weekly Flood Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyFloodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="floods" fill="#3b82f6" name="New Floods" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="relative">
          {!isPremium && <LockedOverlay />}
          <CardHeader>
            <CardTitle className="text-base">Incidents by Severity</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="lg:col-span-2 relative">
          {!isPremium && <LockedOverlay />}
          <CardHeader>
            <CardTitle className="text-base">6-Month Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Total Incidents"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
