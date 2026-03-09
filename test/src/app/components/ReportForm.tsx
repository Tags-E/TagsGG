import { useState } from 'react';
import { MapPin, Upload, Send, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DrainageReport, MembershipTier } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ReportFormProps {
  onSubmit: (report: Omit<DrainageReport, 'id' | 'timestamp' | 'upvotes'>) => void;
  userMembership: MembershipTier;
  reportsThisMonth: number;
  onUpgrade: () => void;
}

const FREE_MEMBER_LIMIT = 3;

export function ReportForm({ onSubmit, userMembership, reportsThisMonth, onUpgrade }: ReportFormProps) {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const canSubmit = userMembership === 'premium' || reportsThisMonth < FREE_MEMBER_LIMIT;
  const reportsRemaining = Math.max(0, FREE_MEMBER_LIMIT - reportsThisMonth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      onUpgrade();
      return;
    }

    if (location && description) {
      onSubmit({
        userId: '1',
        userName: 'Demo User',
        location,
        description,
        severity,
        images: [],
        status: 'pending',
        lat: 40.7489 + Math.random() * 0.05,
        lng: -73.9851 + Math.random() * 0.05
      });
      
      setLocation('');
      setDescription('');
      setSeverity('moderate');
      setShowSuccessDialog(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Report Drainage Issue
            </CardTitle>
            {userMembership === 'free' && (
              <div className="text-sm">
                <span className={`font-semibold ${reportsRemaining === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                  {reportsRemaining}
                </span>
                <span className="text-gray-500"> reports left this month</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Enter street address or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                  disabled={!canSubmit}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="severity">Severity Level *</Label>
              <Select value={severity} onValueChange={(value: any) => setSeverity(value)} disabled={!canSubmit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor">Minor - Small pooling, no blockage</SelectItem>
                  <SelectItem value="moderate">Moderate - Standing water, slow drainage</SelectItem>
                  <SelectItem value="severe">Severe - Major blockage, flooding risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the drainage issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                disabled={!canSubmit}
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {userMembership === 'premium' ? 'Upload photos (Premium)' : 'Upload up to 1 photo (Free)'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Click to browse or drag and drop
              </p>
            </div>

            {!canSubmit && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900">Report Limit Reached</p>
                  <p className="text-xs text-amber-700 mt-1">
                    You've used all {FREE_MEMBER_LIMIT} free reports this month. Upgrade to Premium for unlimited reports.
                  </p>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="mt-2 bg-amber-600 hover:bg-amber-700"
                    onClick={onUpgrade}
                    type="button"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={!canSubmit || !location || !description}
            >
              <Send className="w-4 h-4 mr-2" />
              {canSubmit ? 'Submit Report' : 'Upgrade to Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              Report Submitted Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <p className="text-sm text-gray-600">
              Your drainage issue report has been submitted and is now pending review by our maintenance team.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Your report will be reviewed within 24 hours</li>
                <li>• Maintenance team will assess the severity</li>
                <li>• You'll receive updates on the status</li>
              </ul>
            </div>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
