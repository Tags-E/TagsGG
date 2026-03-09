export type MembershipTier = 'free' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  membershipTier: MembershipTier;
  reportsThisMonth: number;
  joinDate: string;
}

export interface FloodAlert {
  id: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  waterLevel: number; // in cm
  description: string;
  timestamp: string;
  lat: number;
  lng: number;
  status: 'active' | 'monitoring' | 'resolved';
}

export interface DrainageReport {
  id: string;
  userId: string;
  userName: string;
  location: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
  images: string[];
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
  lat: number;
  lng: number;
  upvotes: number;
}

export interface Statistics {
  activeFloods: number;
  resolvedIssues: number;
  pendingReports: number;
  totalUsers: number;
  avgResponseTime: string;
}
