import { Crown, Menu, Bell, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MembershipTier } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  userName: string;
  membershipTier: MembershipTier;
  onUpgradeMembership: () => void;
  onViewProfile: () => void;
  activeAlerts: number;
}

export function Header({ 
  userName, 
  membershipTier, 
  onUpgradeMembership,
  onViewProfile,
  activeAlerts
}: HeaderProps) {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">FloodWatch</h1>
            <p className="text-sm text-gray-500">Drainage Monitoring System</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Alerts */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeAlerts}
              </span>
            )}
          </Button>

          {/* Membership Badge */}
          <div className="flex items-center gap-2">
            {membershipTier === 'premium' ? (
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onUpgradeMembership}
                className="border-amber-500 text-amber-600 hover:bg-amber-50"
              >
                <Crown className="w-3 h-3 mr-1" />
                Upgrade to Premium
              </Button>
            )}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <UserIcon className="w-4 h-4 mr-2" />
                {userName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewProfile}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUpgradeMembership}>
                Membership Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
