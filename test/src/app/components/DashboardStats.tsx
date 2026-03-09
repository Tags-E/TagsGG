import { Activity, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Statistics } from '../types';

interface DashboardStatsProps {
  stats: Statistics;
  isPremium: boolean;
}

export function DashboardStats({ stats, isPremium }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Active Floods',
      value: stats.activeFloods,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      premium: false
    },
    {
      title: 'Resolved Issues',
      value: stats.resolvedIssues,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      premium: false
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      premium: false
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      premium: true
    },
    {
      title: 'Avg Response Time',
      value: stats.avgResponseTime,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      premium: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isLocked = stat.premium && !isPremium;
        
        return (
          <Card key={index} className={isLocked ? 'opacity-60 relative overflow-hidden' : ''}>
            {isLocked && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="bg-white rounded-lg px-3 py-1.5 shadow-md border border-amber-200">
                  <p className="text-xs font-medium text-amber-700">Premium Only</p>
                </div>
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
