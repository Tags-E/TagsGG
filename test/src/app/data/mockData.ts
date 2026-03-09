import { FloodAlert, DrainageReport, Statistics, User } from '../types';

// Mock flood alerts data
export const mockFloodAlerts: FloodAlert[] = [
  {
    id: '1',
    location: 'Downtown District, 5th Avenue',
    severity: 'critical',
    waterLevel: 85,
    description: 'Severe flooding due to heavy rainfall and blocked drainage system',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lat: 40.7589,
    lng: -73.9851,
    status: 'active'
  },
  {
    id: '2',
    location: 'Industrial Park, Zone B',
    severity: 'high',
    waterLevel: 62,
    description: 'Storm drains overwhelmed, water accumulating rapidly',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    lat: 40.7489,
    lng: -73.9951,
    status: 'active'
  },
  {
    id: '3',
    location: 'Riverside Road',
    severity: 'medium',
    waterLevel: 35,
    description: 'Minor flooding near river banks, monitoring closely',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lat: 40.7689,
    lng: -73.9751,
    status: 'monitoring'
  },
  {
    id: '4',
    location: 'Main Street Junction',
    severity: 'low',
    waterLevel: 18,
    description: 'Water pooling in low-lying areas, drainage working',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lat: 40.7389,
    lng: -73.9651,
    status: 'monitoring'
  }
];

// Mock drainage reports
export const mockDrainageReports: DrainageReport[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    location: 'Park Avenue & 23rd Street',
    description: 'Large pothole causing water accumulation and drainage blockage',
    severity: 'severe',
    images: [],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    lat: 40.7429,
    lng: -73.9881,
    upvotes: 24
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    location: 'Oak Street, near Library',
    description: 'Clogged storm drain grate filled with debris',
    severity: 'moderate',
    images: [],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    lat: 40.7529,
    lng: -73.9781,
    upvotes: 15
  },
  {
    id: '3',
    userId: '3',
    userName: 'Michael Chen',
    location: 'Industrial Zone, Warehouse District',
    description: 'Broken drainage pipe causing flooding in parking area',
    severity: 'severe',
    images: [],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    lat: 40.7329,
    lng: -73.9981,
    upvotes: 31
  },
  {
    id: '4',
    userId: '1',
    userName: 'John Smith',
    location: 'Elm Street Residential',
    description: 'Slow drainage in street gutters after rain',
    severity: 'minor',
    images: [],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    lat: 40.7629,
    lng: -73.9581,
    upvotes: 8
  }
];

// Mock statistics
export const mockStatistics: Statistics = {
  activeFloods: 4,
  resolvedIssues: 127,
  pendingReports: 18,
  totalUsers: 2458,
  avgResponseTime: '4.5 hours'
};

// Default user for demo
export const getDefaultUser = (): User => {
  const saved = localStorage.getItem('floodUser');
  if (saved) {
    return JSON.parse(saved);
  }
  const defaultUser: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@floodwatch.com',
    membershipTier: 'free',
    reportsThisMonth: 2,
    joinDate: new Date('2025-01-15').toISOString()
  };
  localStorage.setItem('floodUser', JSON.stringify(defaultUser));
  return defaultUser;
};

export const saveUser = (user: User) => {
  localStorage.setItem('floodUser', JSON.stringify(user));
};

// Get stored reports
export const getStoredReports = (): DrainageReport[] => {
  const stored = localStorage.getItem('drainageReports');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('drainageReports', JSON.stringify(mockDrainageReports));
  return mockDrainageReports;
};

export const saveReports = (reports: DrainageReport[]) => {
  localStorage.setItem('drainageReports', JSON.stringify(reports));
};
