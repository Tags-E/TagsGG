import { ThumbsUp, MapPin, Clock, CheckCircle, AlertCircle, Loader, Lock } from 'lucide-react';
import { DrainageReport, MembershipTier } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';

interface ReportsListProps {
  reports: DrainageReport[];
  onUpvote: (reportId: string) => void;
  userMembership: MembershipTier;
  currentUserId: string;
}

const severityColors = {
  minor: { badge: 'bg-blue-100 text-blue-700 border-blue-300', dot: 'bg-blue-500' },
  moderate: { badge: 'bg-yellow-100 text-yellow-700 border-yellow-300', dot: 'bg-yellow-500' },
  severe: { badge: 'bg-red-100 text-red-700 border-red-300', dot: 'bg-red-500' }
};

const statusConfig = {
  pending: { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Pending Review' },
  'in-progress': { icon: Loader, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' },
  resolved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Resolved' }
};

export function ReportsList({ reports, onUpvote, userMembership, currentUserId }: ReportsListProps) {
  const displayReports = userMembership === 'premium' ? reports : reports.slice(0, 5);
  const hasMore = reports.length > displayReports.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Community Reports
          </CardTitle>
          {userMembership === 'free' && (
            <Badge variant="outline" className="text-amber-600 border-amber-300">
              Free: Limited View
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {displayReports.map(report => {
            const severityStyle = severityColors[report.severity];
            const statusInfo = statusConfig[report.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <div 
                key={report.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <h4 className="font-semibold text-gray-900">{report.location}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${severityStyle.badge} border`}>
                        <div className={`w-2 h-2 rounded-full ${severityStyle.dot} mr-1.5`}></div>
                        {report.severity}
                      </Badge>
                      <Badge variant="outline" className={`${statusInfo.color} ${statusInfo.bg} border-current`}>
                        <StatusIcon className={`w-3 h-3 mr-1 ${report.status === 'in-progress' ? 'animate-spin' : ''}`} />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Upvote Button */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onUpvote(report.id)}
                    className="flex-col h-auto py-2 px-3 min-w-[60px]"
                  >
                    <ThumbsUp className="w-4 h-4 mb-1" />
                    <span className="text-xs font-semibold">{report.upvotes}</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                  <span>Reported by {report.userName}</span>
                  <span>{formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}</span>
                </div>
              </div>
            );
          })}

          {/* Premium Upsell */}
          {hasMore && userMembership === 'free' && (
            <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center bg-gradient-to-br from-amber-50 to-yellow-50">
              <Lock className="w-10 h-10 text-amber-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">
                {reports.length - displayReports.length} More Reports Available
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Upgrade to Premium to view all community reports and get unlimited access
              </p>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                Unlock Premium Features
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}