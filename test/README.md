# FloodWatch - Drainage Monitoring System

A fully functional flood and drainage monitoring system built with HTML, CSS, and vanilla JavaScript. Features include real-time flood alerts, interactive maps, community reporting, and tiered membership options.

## Features

### 🔐 Authentication System
- **Login Page** - Secure user login with demo accounts
- **Sign Up Page** - User registration with password strength indicator
- **Session Management** - Persistent login with localStorage
- **Logout Functionality** - Secure session termination

### 🆓 Free Membership
- View active flood alerts
- Basic map visualization
- Submit up to 3 reports per month
- Email notifications
- View limited community reports (first 5)
- Basic statistics dashboard

### 👑 Premium Membership ($9.99/month)
- Everything in Free, plus:
- Unlimited report submissions
- View all community reports
- Advanced analytics dashboard
- Historical data access (12 months)
- Priority alerts
- Export data in CSV/PDF
- API access for integrations
- Ad-free experience

### 🗺️ Interactive Features
- **Live Flood Map** - Real-time visualization with severity indicators
- **Clickable Markers** - View detailed information for each flood alert
- **Severity Levels** - Critical, High, Medium, Low with color coding
- **Water Level Tracking** - Visual progress bars showing water levels
- **Status Updates** - Active, Monitoring, Resolved states

### 📝 Report System
- Submit drainage issue reports with location and description
- Severity classification (Minor, Moderate, Severe)
- Community upvoting system
- Status tracking (Pending, In-Progress, Resolved)
- Photo upload support (Premium feature)

### 📊 Analytics Dashboard
- Weekly flood activity charts
- Incidents by severity breakdown
- 6-month trend analysis
- Response time metrics
- Premium-locked advanced analytics

## Demo Accounts

### Free Account
- **Email:** demo@floodwatch.com
- **Password:** demo123
- **Features:** 3 reports/month, basic features

### Premium Account
- **Email:** premium@floodwatch.com
- **Password:** premium123
- **Features:** Unlimited reports, all premium features

## File Structure

```
/
├── index.html          # Main dashboard
├── login.html          # Login page
├── signup.html         # Registration page
├── styles.css          # Main application styles
├── auth.css            # Authentication page styles
├── script.js           # Main application logic
├── auth.js             # Authentication logic
└── README.md           # This file
```

## Getting Started

### Option 1: Open Locally
1. Download all files to a folder
2. Open `login.html` in your web browser
3. Use demo credentials or create a new account

### Option 2: Serve with Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000/login.html
```

## How to Use

### 1. Login
- Navigate to `login.html`
- Use demo credentials or sign up for a new account
- Click demo credential buttons for quick access

### 2. Dashboard Overview
- View real-time flood alerts and statistics
- Click on map markers to see detailed information
- Browse community reports in the sidebar

### 3. Report an Issue
- Go to "Report Issue" tab
- Fill in location, severity, and description
- Submit report (within monthly limit for free users)

### 4. View Analytics
- Go to "Analytics" tab
- Premium members see full charts and trends
- Free members see locked preview

### 5. Manage Profile
- Go to "Profile" tab
- View your activity and membership status
- Upgrade to Premium or switch plans

### 6. Logout
- Click user menu in top-right
- Select "Logout" to end session

## Data Storage

All data is stored in browser's localStorage:
- `currentUser` - Active session email
- `floodUser` - Current user profile data
- `registeredUsers` - All registered accounts
- `drainageReports` - Community reports

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, flexbox, and grid
- **JavaScript ES6+** - Vanilla JS with modern features
- **Font Awesome 6** - Icons
- **LocalStorage API** - Data persistence

## Key Features Explained

### Authentication Flow
1. User visits any page
2. Script checks for `currentUser` in localStorage
3. If not found, redirects to login.html
4. After login, user data is stored
5. Logout clears session and redirects to login

### Membership System
- Users can upgrade/downgrade anytime
- Free users limited to 3 reports per month
- Premium users get unlimited access
- Feature flags control UI visibility

### Report Submission
1. Check if user can submit (membership + count)
2. Validate form data
3. Create report object with metadata
4. Store in localStorage
5. Update user's monthly count
6. Re-render UI with new data

### Interactive Map
- Simulated coordinates for demo purposes
- Markers positioned based on lat/lng
- Hover tooltips show alert details
- Click to expand full information
- Animated pulse effect for active alerts

## Customization

### Change Color Scheme
Edit CSS variables in `styles.css` and `auth.css`

### Modify Membership Features
Update feature arrays in:
- `renderStats()` - Dashboard statistics
- `renderReportsList()` - Report visibility
- `renderAnalytics()` - Analytics access

### Add New Alert Severities
Update severity configurations in:
- `severityColors` object
- `getSeverityBadgeClass()` function
- CSS severity classes

## Security Notes

⚠️ **For Demo Purposes Only**
- Passwords stored in plain text
- No encryption or hashing
- No server-side validation
- Not suitable for production

For production use:
- Implement proper authentication (JWT, OAuth)
- Use secure backend (Node.js, Python, etc.)
- Hash passwords with bcrypt
- Add HTTPS and CORS
- Implement rate limiting
- Add CSRF protection

## Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Push notifications
- [ ] Actual map integration (Google Maps, Mapbox)
- [ ] Weather API integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Profile picture upload
- [ ] Share reports on social media
- [ ] Mobile app (React Native)
- [ ] Backend API integration

## Credits

- Design inspired by modern SaaS applications
- Icons from Font Awesome
- Built with ❤️ for flood monitoring and prevention

## License

This project is open source and available for educational purposes.

## Support

For questions or issues, please create an issue in the repository.

---

**Made with HTML, CSS, and JavaScript** | **No frameworks required** | **Ready to run**
