import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Crown } from 'lucide-react';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { InteractiveMap } from './components/InteractiveMap';
import { FloodAlertsList } from './components/FloodAlertsList';
import { ReportForm } from './components/ReportForm';
import { ReportsList } from './components/ReportsList';
import { MembershipModal } from './components/MembershipModal';
import { UserProfile } from './components/UserProfile';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { User, DrainageReport } from './types';
import { 
  mockFloodAlerts, 
  mockStatistics, 
  getDefaultUser, 
  saveUser,
  getStoredReports,
  saveReports 
} from './data/mockData';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [user, setUser] = useState<User>(getDefaultUser());
  const [reports, setReports] = useState<DrainageReport[]>(getStoredReports());
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Simulate real-time water level updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Just for visual effect in demo - would be real-time data in production
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpgradeMembership = () => {
    if (user.membershipTier === 'free') {
      setShowMembershipModal(true);
    }
  };

  const handleUpgradeConfirm = () => {
    const updatedUser = { ...user, membershipTier: 'premium' as const };
    setUser(updatedUser);
    saveUser(updatedUser);
    toast.success('🎉 Welcome to Premium!', {
      description: 'You now have access to all premium features including unlimited reports, advanced analytics, and more.'
    });
  };

  const handleDowngrade = () => {
    const updatedUser = { ...user, membershipTier: 'free' as const };
    setUser(updatedUser);
    saveUser(updatedUser);
    toast.info('Membership Changed', {
      description: 'You are now on the free plan. You can upgrade anytime.'
    });
  };

  const handleSubmitReport = (reportData: Omit<DrainageReport, 'id' | 'timestamp' | 'upvotes'>) => {
    const newReport: DrainageReport = {
      ...reportData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      upvotes: 0
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    saveReports(updatedReports);

    // Update user's report count
    const updatedUser = { ...user, reportsThisMonth: user.reportsThisMonth + 1 };
    setUser(updatedUser);
    saveUser(updatedUser);

    toast.success('Report submitted successfully!', {
      description: 'Our team will review your report within 24 hours.'
    });
  };

  const handleUpvoteReport = (reportId: string) => {
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, upvotes: report.upvotes + 1 }
        : report
    );
    setReports(updatedReports);
    saveReports(updatedReports);
    toast.success('Upvoted!', { description: 'Your support helps prioritize this issue.' });
  };

  const activeAlerts = mockFloodAlerts.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />
      
      <Header 
        userName={user.name}
        membershipTier={user.membershipTier}
        onUpgradeMembership={handleUpgradeMembership}
        onViewProfile={() => setShowProfileModal(true)}
        activeAlerts={activeAlerts}
      />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Dashboard Statistics */}
        <div className="mb-6">
          <DashboardStats stats={mockStatistics} isPremium={user.membershipTier === 'premium'} />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="report">Report Issue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <InteractiveMap 
                  alerts={mockFloodAlerts}
                  reports={reports}
                  isPremium={user.membershipTier === 'premium'}
                />
                <FloodAlertsList alerts={mockFloodAlerts} />
              </div>
              <div>
                <ReportsList 
                  reports={reports}
                  onUpvote={handleUpvoteReport}
                  userMembership={user.membershipTier}
                  currentUserId={user.id}
                />
              </div>
            </div>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ReportForm
                  onSubmit={handleSubmitReport}
                  userMembership={user.membershipTier}
                  reportsThisMonth={user.reportsThisMonth}
                  onUpgrade={handleUpgradeMembership}
                />
              </div>
              <div>
                <UserProfile user={user} onUpgrade={handleUpgradeMembership} />
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard 
              membershipTier={user.membershipTier}
              onUpgrade={handleUpgradeMembership}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto space-y-6">
              <UserProfile user={user} onUpgrade={handleUpgradeMembership} />
              
              {/* Membership Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Membership Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.membershipTier === 'free' ? (
                    <Button 
                      onClick={handleUpgradeMembership}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  ) : (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="font-semibold text-gray-900">Premium Member</p>
                        <p className="text-sm text-gray-600 mt-1">Enjoying all premium features</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleDowngrade}
                        className="w-full"
                      >
                        Switch to Free Plan
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
        currentTier={user.membershipTier}
        onUpgrade={handleUpgradeConfirm}
      />
    </div>
  );
}