import { MapPin, Activity } from 'lucide-react';
import { FloodAlert } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface InteractiveMapProps {
  alerts: FloodAlert[];
  reports: any[];
  isPremium: boolean;
}

const severityColors = {
  low: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-blue-600' },
  medium: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-600' },
  high: { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-orange-600' },
  critical: { bg: 'bg-red-500', border: 'border-red-600', text: 'text-red-600' }
};

export function InteractiveMap({ alerts, reports, isPremium }: InteractiveMapProps) {
  const [selectedAlert, setSelectedAlert] = useState<FloodAlert | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate relative positions for markers (simulated map)
  const getMarkerPosition = (lat: number, lng: number) => {
    // Normalize to 0-100% range for positioning
    const x = ((lng + 74) * 1000) % 100;
    const y = ((41 - lat) * 1000) % 100;
    return { left: `${Math.max(10, Math.min(90, x))}%`, top: `${Math.max(10, Math.min(90, y))}%` };
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs font-medium text-gray-700">Live Flood Map</p>
        <div className="flex items-center gap-2 mt-2">
          <Activity className="w-3 h-3 text-green-500 animate-pulse" />
          <span className="text-xs text-gray-600">Real-time monitoring</span>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs font-semibold text-gray-700 mb-2">Severity</p>
        <div className="space-y-1">
          {Object.entries(severityColors).map(([level, colors]) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
              <span className="text-xs capitalize text-gray-600">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Background */}
      <div className="relative h-[600px] bg-gradient-to-br from-blue-50 via-gray-50 to-green-50">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Simulated water flow animation */}
        <div className="absolute inset-0 pointer-events-none">
          {alerts.filter(a => a.status === 'active').map((alert, i) => {
            const pos = getMarkerPosition(alert.lat, alert.lng);
            return (
              <div 
                key={`ripple-${alert.id}`}
                className="absolute animate-ping opacity-20"
                style={{ 
                  left: pos.left, 
                  top: pos.top,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                <div className={`w-32 h-32 rounded-full ${severityColors[alert.severity].bg} -translate-x-1/2 -translate-y-1/2`}></div>
              </div>
            );
          })}
        </div>

        {/* Flood Alert Markers */}
        {alerts.map(alert => {
          const pos = getMarkerPosition(alert.lat, alert.lng);
          const colors = severityColors[alert.severity];
          const isHovered = hoveredId === alert.id;
          const isSelected = selectedAlert?.id === alert.id;

          return (
            <div
              key={alert.id}
              className="absolute z-20 transition-transform hover:scale-125 cursor-pointer"
              style={{ left: pos.left, top: pos.top }}
              onMouseEnter={() => setHoveredId(alert.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedAlert(alert)}
            >
              {/* Marker Pin */}
              <div className={`relative -translate-x-1/2 -translate-y-full ${isSelected ? 'scale-125' : ''}`}>
                <div className={`w-8 h-8 rounded-full ${colors.bg} border-2 border-white shadow-lg flex items-center justify-center`}>
                  <MapPin className="w-5 h-5 text-white fill-current" />
                </div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 ${colors.border} border-l-transparent border-r-transparent`}></div>
                
                {/* Pulsing ring for active alerts */}
                {alert.status === 'active' && (
                  <div className={`absolute inset-0 rounded-full ${colors.bg} animate-ping opacity-75`}></div>
                )}
              </div>

              {/* Hover Tooltip */}
              {(isHovered || isSelected) && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white rounded-lg shadow-xl border p-3 z-30">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-sm text-gray-900">{alert.location}</p>
                    <Badge variant="outline" className={`${colors.text} border-current`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Water Level: {alert.waterLevel}cm</span>
                    <span className={`font-medium ${colors.text}`}>{alert.status}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Report Markers (smaller, different style) */}
        {isPremium && reports.filter(r => r.status !== 'resolved').map(report => {
          const pos = getMarkerPosition(report.lat, report.lng);
          
          return (
            <div
              key={`report-${report.id}`}
              className="absolute z-10 transition-transform hover:scale-110 cursor-pointer"
              style={{ left: pos.left, top: pos.top }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Premium Overlay for Reports */}
        {!isPremium && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg px-4 py-3 border border-amber-200">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Want to see drainage reports on the map?
            </p>
            <p className="text-xs text-gray-600">
              Upgrade to Premium to view all report locations
            </p>
          </div>
        )}
      </div>

      {/* Selected Alert Details Panel */}
      {selectedAlert && (
        <div className="border-t bg-gray-50 p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedAlert.location}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedAlert.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Severity</p>
              <p className={`font-semibold capitalize ${severityColors[selectedAlert.severity].text}`}>
                {selectedAlert.severity}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Water Level</p>
              <p className="font-semibold text-gray-900">{selectedAlert.waterLevel} cm</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold text-gray-900 capitalize">{selectedAlert.status}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
