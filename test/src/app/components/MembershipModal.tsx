import { Check, Crown, X, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MembershipTier } from '../types';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: MembershipTier;
  onUpgrade: () => void;
}

const features = {
  free: [
    { text: 'View active flood alerts', included: true },
    { text: 'Basic map visualization', included: true },
    { text: '3 reports per month', included: true },
    { text: 'Email notifications', included: true },
    { text: 'View limited community reports', included: true },
    { text: 'Advanced analytics dashboard', included: false },
    { text: 'Unlimited report submissions', included: false },
    { text: 'Historical data access', included: false },
    { text: 'Priority alerts', included: false },
    { text: 'Export data & reports', included: false },
    { text: 'API access', included: false },
    { text: 'Ad-free experience', included: false }
  ],
  premium: [
    { text: 'View active flood alerts', included: true },
    { text: 'Advanced interactive maps', included: true },
    { text: 'Unlimited report submissions', included: true },
    { text: 'Priority email & SMS alerts', included: true },
    { text: 'View all community reports', included: true },
    { text: 'Advanced analytics dashboard', included: true },
    { text: 'Historical data (12 months)', included: true },
    { text: 'Predictive flood warnings', included: true },
    { text: 'Export data in CSV/PDF', included: true },
    { text: 'API access for integrations', included: true },
    { text: 'Priority customer support', included: true },
    { text: 'Ad-free experience', included: true }
  ]
};

export function MembershipModal({ isOpen, onClose, currentTier, onUpgrade }: MembershipModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-2">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Perfect for occasional monitoring and basic reporting
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {currentTier === 'free' && (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              )}
            </div>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-2 border-amber-500 shadow-xl">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 text-xs font-semibold rounded-bl-lg">
              MOST POPULAR
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-amber-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    $9.99
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Full access to all features for power users and professionals
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {currentTier === 'premium' ? (
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500" disabled>
                  <Crown className="w-4 h-4 mr-2" />
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                  onClick={() => {
                    onUpgrade();
                    onClose();
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            🔒 Secure payment • 💳 Cancel anytime • ✨ Instant activation
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
