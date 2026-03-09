import { AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { FloodAlert } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface FloodAlertsListProps {
  alerts: FloodAlert[];
}

const severityConfig = {
  critical: { 
    color: 'bg-red-500', 
    textColor: 'text-red-700', 
    bgLight: 'bg-red-50',
    label: 'Critical',
    icon: AlertTriangle 
  },
  high: { 
    color: 'bg-orange-500', 
    textColor: 'text-orange-700', 
    bgLight: 'bg-orange-50',
    label: 'High',
    icon: TrendingUp 
  },
  medium: { 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-700', 
    bgLight: 'bg-yellow-50',
    label: 'Medium',
    icon: TrendingUp 
  },
  low: { 
    color: 'bg-blue-500', 
    textColor: 'text-blue-700', 
    bgLight: 'bg-blue-50',
    label: 'Low',
    icon: Info 
  }
};

export function FloodAlertsList({ alerts }: FloodAlertsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Active Flood Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {alerts.map(alert => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            
            return (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${config.bgLight} ${config.color} border-l-${config.color} transition-all hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${config.color} mt-0.5`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{alert.location}</h4>
                        <Badge variant="outline" className={`${config.textColor} border-current text-xs`}>
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Water Level: <span className="font-semibold text-gray-700">{alert.waterLevel} cm</span></span>
                        <span>•</span>
                        <span className="capitalize">Status: {alert.status}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Water level indicator */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${config.color} transition-all duration-500`}
                      style={{ width: `${Math.min(100, alert.waterLevel)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
