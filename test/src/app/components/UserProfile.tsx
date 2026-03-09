import { User, MembershipTier } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Crown, Mail, Calendar, FileText, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserProfileProps {
  user: User;
  onUpgrade: () => void;
}

export function UserProfile({ user, onUpgrade }: UserProfileProps) {
  const isPremium = user.membershipTier === 'premium';
  const reportsRemaining = isPremium ? 'Unlimited' : Math.max(0, 3 - user.reportsThisMonth);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />
                {user.email}
              </p>
              <div className="mt-2">
                {isPremium ? (
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                ) : (
                  <Badge variant="outline">Free Member</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Membership Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Member Since</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs">Reports Left</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {reportsRemaining}
              </p>
            </div>
          </div>

          {/* Usage This Month */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">This Month's Activity</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Reports Submitted</span>
                <span className="font-semibold text-blue-900">{user.reportsThisMonth}</span>
              </div>
              {!isPremium && (
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(user.reportsThisMonth / 3) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {user.reportsThisMonth} of 3 free reports used
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upgrade CTA */}
          {!isPremium && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Upgrade to Premium</h4>
              <ul className="space-y-1 mb-3 text-sm text-gray-700">
                <li>• Unlimited report submissions</li>
                <li>• Advanced analytics & insights</li>
                <li>• Priority notifications</li>
                <li>• Historical data access</li>
              </ul>
              <Button 
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade for $9.99/month
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
