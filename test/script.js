// Application State
let state = {
    user: null,
    floodAlerts: [],
    drainageReports: [],
    statistics: {}
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeState();
    setupEventListeners();
    render();
});

// Initialize State from localStorage or defaults
function initializeState() {
    // Load or create user
    const savedUser = localStorage.getItem('floodUser');
    if (savedUser) {
        state.user = JSON.parse(savedUser);
        if (!state.user.role) state.user.role = 'user';
    } else {
        state.user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@floodwatch.com',
            membershipTier: 'free',
            reportsThisMonth: 2,
            joinDate: new Date('2025-01-15').toISOString(),
            role: 'user'
        };
        saveUser();
    }

    // Load reports
    const savedReports = localStorage.getItem('drainageReports');
    if (savedReports) {
        state.drainageReports = JSON.parse(savedReports);
    } else {
        state.drainageReports = getMockReports();
        saveReports();
    }

    // Load flood alerts (admin can add from user reports)
    const savedAlerts = localStorage.getItem('floodAlerts');
    if (savedAlerts) {
        state.floodAlerts = JSON.parse(savedAlerts);
    } else {
        state.floodAlerts = getMockFloodAlerts();
        saveFloodAlerts();
    }
    
    // Mock statistics
    state.statistics = {
        activeFloods: 4,
        resolvedIssues: 127,
        pendingReports: 18,
        totalUsers: 2458,
        avgResponseTime: '4.5 hours'
    };
}

// Mock Data Generators
function getMockFloodAlerts() {
    const now = Date.now();
    return [
        {
            id: '1',
            location: 'Downtown District, 5th Avenue',
            severity: 'critical',
            waterLevel: 85,
            description: 'Severe flooding due to heavy rainfall and blocked drainage system',
            timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
            lat: 40.7389,
            lng: -73.9651,
            status: 'monitoring'
        }
    ];
}

function getMockReports() {
    const now = Date.now();
    return [
        {
            id: '1',
            userId: '1',
            userName: 'John Smith',
            location: 'Park Avenue & 23rd Street',
            description: 'Large pothole causing water accumulation and drainage blockage',
            severity: 'severe',
            timestamp: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 12 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
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
            timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'resolved',
            lat: 40.7629,
            lng: -73.9581,
            upvotes: 8
        },
        {
            id: '5',
            userId: '2',
            userName: 'Sarah Johnson',
            location: 'Central Park West',
            description: 'Standing water near playground area',
            severity: 'moderate',
            timestamp: new Date(now - 18 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            lat: 40.7789,
            lng: -73.9751,
            upvotes: 12
        },
        {
            id: '6',
            userId: '3',
            userName: 'Michael Chen',
            location: 'Broadway & 42nd Street',
            description: 'Cracked drainage cover needs replacement',
            severity: 'minor',
            timestamp: new Date(now - 30 * 60 * 60 * 1000).toISOString(),
            status: 'resolved',
            lat: 40.7589,
            lng: -73.9851,
            upvotes: 7
        }
    ];
}

// Save Functions
function saveUser() {
    localStorage.setItem('floodUser', JSON.stringify(state.user));
}

function saveReports() {
    localStorage.setItem('drainageReports', JSON.stringify(state.drainageReports));
}

function saveFloodAlerts() {
    localStorage.setItem('floodAlerts', JSON.stringify(state.floodAlerts));
}

// Event Listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });

    // User menu
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    userBtn.addEventListener('click', () => {
        userDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // Profile buttons
    document.getElementById('viewProfileBtn').addEventListener('click', () => {
        switchTab('profile');
        userDropdown.classList.remove('show');
    });

    document.getElementById('membershipSettingsBtn').addEventListener('click', () => {
        openMembershipModal();
        userDropdown.classList.remove('show');
    });

    // Membership badge click
    document.getElementById('membershipBadge').addEventListener('click', () => {
        if (state.user.role === 'admin') {
            switchTab('admin');
        } else if (state.user.membershipTier === 'free') {
            openMembershipModal();
        }
    });

    // Report form
    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleReportSubmit();
    });

    // Upgrade buttons
    document.getElementById('upgradeFromFormBtn')?.addEventListener('click', openMembershipModal);
    document.getElementById('upgradePlanBtn').addEventListener('click', handleUpgrade);

    // Analytics upgrade buttons (in Premium locked cards)
    document.querySelectorAll('.analytics-upgrade-btn').forEach(btn => {
        btn.addEventListener('click', openMembershipModal);
    });

    // Membership modal - overlay and close button
    document.getElementById('membershipModalOverlay').addEventListener('click', closeMembershipModal);
    document.getElementById('membershipModalClose').addEventListener('click', closeMembershipModal);

    // Success modal - overlay and close button
    document.getElementById('successModalOverlay').addEventListener('click', closeSuccessModal);
    document.getElementById('successModalCloseBtn').addEventListener('click', closeSuccessModal);
}

// Tab Switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Render tab-specific content
    if (tabName === 'analytics') {
        renderAnalytics();
    }
    if (tabName === 'admin') {
        renderAdminTab();
    }
}

// Render Functions
function render() {
    renderHeader();
    renderStats();
    renderMap();
    renderAlertsList();
    renderReportsList();
    renderReportForm();
    renderUserProfile();
    updateMembershipModal();
    if (state.user.role === 'admin') {
        renderAdminTab();
    }
}

function renderHeader() {
    const isPremium = state.user.membershipTier === 'premium';
    const isAdmin = state.user.role === 'admin';
    const activeAlerts = state.floodAlerts.filter(a => a.status === 'active').length;

    document.getElementById('userName').textContent = state.user.name;

    // Show/hide Admin tab
    const adminTabBtn = document.querySelector('.tab-admin');
    if (adminTabBtn) {
        adminTabBtn.classList.toggle('hidden', !isAdmin);
    }

    document.getElementById('alertBadge').textContent = activeAlerts;

    const membershipBadge = document.getElementById('membershipBadge');
    const membershipText = document.getElementById('membershipText');

    if (isAdmin) {
        membershipBadge.classList.remove('free');
        membershipBadge.classList.add('admin-badge');
        membershipText.textContent = 'Admin';
    } else if (isPremium) {
        membershipBadge.classList.remove('free', 'admin-badge');
        membershipText.textContent = 'Premium';
    } else {
        membershipBadge.classList.remove('admin-badge');
        membershipBadge.classList.add('free');
        membershipText.textContent = 'Upgrade to Premium';
    }
}

function renderStats() {
    const isPremium = state.user.membershipTier === 'premium';
    const stats = [
        {
            title: 'Active Floods',
            value: state.statistics.activeFloods,
            icon: 'fa-exclamation-triangle',
            color: 'red',
            premium: false
        },
        {
            title: 'Resolved Issues',
            value: state.statistics.resolvedIssues,
            icon: 'fa-check-circle',
            color: 'green',
            premium: false
        },
        {
            title: 'Pending Reports',
            value: state.statistics.pendingReports,
            icon: 'fa-clock',
            color: 'orange',
            premium: false
        },
        {
            title: 'Total Users',
            value: state.statistics.totalUsers.toLocaleString(),
            icon: 'fa-users',
            color: 'blue',
            premium: true
        },
        {
            title: 'Avg Response Time',
            value: state.statistics.avgResponseTime,
            icon: 'fa-chart-line',
            color: 'purple',
            premium: true
        }
    ];

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = stats.map(stat => {
        const isLocked = stat.premium && !isPremium;
        return `
            <div class="stat-card ${isLocked ? 'locked' : ''}">
                ${isLocked ? '<div class="locked-overlay"><div class="locked-badge">Premium Only</div></div>' : ''}
                <div class="stat-header">
                    <div class="stat-title">${stat.title}</div>
                    <div class="stat-icon ${stat.color}">
                        <i class="fas ${stat.icon}"></i>
                    </div>
                </div>
                <div class="stat-value">${stat.value}</div>
            </div>
        `;
    }).join('');
}

// Leaflet map instance (reused across renders)
let floodMapInstance = null;
let floodMarkersLayer = null;

function renderMap() {
    const mapEl = document.getElementById('floodMap');
    if (!mapEl || typeof L === 'undefined') return;

    // Initialize map on first render
    if (!floodMapInstance) {
        floodMapInstance = L.map('floodMap', { zoomControl: false }).setView([40.7589, -73.9851], 13);
        L.control.zoom({ position: 'topright' }).addTo(floodMapInstance);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(floodMapInstance);

        floodMarkersLayer = L.layerGroup().addTo(floodMapInstance);
    }

    // Clear existing markers
    floodMarkersLayer.clearLayers();

    const severityColors = {
        critical: '#ef4444',
        high: '#f97316',
        medium: '#eab308',
        low: '#3b82f6'
    };

    const bounds = [];

    state.floodAlerts.forEach(alert => {
        const color = severityColors[alert.severity] || '#6b7280';
        const icon = L.divIcon({
            className: 'leaflet-flood-marker',
            html: `<div class="marker-pin ${alert.severity}" style="background:${color};border-color:${color};">
                <i class="fas fa-map-pin"></i>
                ${alert.status === 'active' ? `<div class="marker-pulse ${alert.severity}"></div>` : ''}
            </div>`,
            iconSize: [32, 42],
            iconAnchor: [16, 42]
        });

        const marker = L.marker([alert.lat, alert.lng], { icon })
            .bindPopup(`
                <div class="leaflet-popup-content">
                    <div class="tooltip-header">
                        <strong>${alert.location}</strong>
                        <span class="badge badge-${getSeverityBadgeClass(alert.severity)}">${alert.severity}</span>
                    </div>
                    <p class="tooltip-description">${alert.description}</p>
                    <div class="tooltip-details">
                        <span>Water Level: ${alert.waterLevel}cm</span>
                        <span>Status: ${alert.status}</span>
                    </div>
                </div>
            `);

        marker.on('click', () => showAlertDetails(alert));
        floodMarkersLayer.addLayer(marker);
        bounds.push([alert.lat, alert.lng]);
    });

    if (bounds.length > 1) {
        floodMapInstance.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    } else if (bounds.length === 1) {
        floodMapInstance.setView(bounds[0], 13);
    }

    // Fix map size when tab becomes visible (if was hidden)
    setTimeout(() => floodMapInstance?.invalidateSize(), 100);
}

function showAlertDetails(alert) {
    const mapDetails = document.getElementById('mapDetails');
    mapDetails.classList.remove('hidden');
    mapDetails.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
            <div>
                <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.25rem;">${alert.location}</h3>
                <p style="font-size: 0.875rem; color: #6b7280;">${alert.description}</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="closeAlertDetails()">Close</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.875rem;">
            <div>
                <p style="color: #6b7280;">Severity</p>
                <p style="font-weight: 600; text-transform: capitalize;" class="text-${getSeverityBadgeClass(alert.severity)}">${alert.severity}</p>
            </div>
            <div>
                <p style="color: #6b7280;">Water Level</p>
                <p style="font-weight: 600; color: #111827;">${alert.waterLevel} cm</p>
            </div>
            <div>
                <p style="color: #6b7280;">Status</p>
                <p style="font-weight: 600; color: #111827; text-transform: capitalize;">${alert.status}</p>
            </div>
        </div>
    `;
}

function closeAlertDetails() {
    document.getElementById('mapDetails').classList.add('hidden');
}

function renderAlertsList() {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = state.floodAlerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <div class="alert-header">
                <div class="alert-icon ${alert.severity}">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-info">
                    <div class="alert-title-row">
                        <h4 class="alert-title">${alert.location}</h4>
                        <span class="badge badge-${getSeverityBadgeClass(alert.severity)}">${alert.severity}</span>
                    </div>
                    <p class="alert-description">${alert.description}</p>
                    <div class="alert-meta">
                        <span>Water Level: <strong>${alert.waterLevel} cm</strong></span>
                        <span>•</span>
                        <span style="text-transform: capitalize;">Status: ${alert.status}</span>
                        <span>•</span>
                        <span>${formatTimeAgo(alert.timestamp)}</span>
                    </div>
                </div>
            </div>
            <div class="alert-progress">
                <div class="progress-bar">
                    <div class="progress-fill ${alert.severity}" style="width: ${Math.min(100, alert.waterLevel)}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderReportsList() {
    const isPremium = state.user.membershipTier === 'premium';
    const displayReports = isPremium ? state.drainageReports : state.drainageReports.slice(0, 5);
    const hasMore = state.drainageReports.length > displayReports.length;

    const reportsList = document.getElementById('reportsList');
    
    let html = displayReports.map(report => `
        <div class="report-item">
            <div class="report-header">
                <div class="report-info">
                    <div class="report-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <h4>${report.location}</h4>
                    </div>
                    <p class="report-description">${report.description}</p>
                    <div class="report-badges">
                        <span class="badge badge-${getSeverityBadgeClass(report.severity)}">
                            <span style="display: inline-block; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: currentColor; margin-right: 0.25rem;"></span>
                            ${report.severity}
                        </span>
                        <span class="badge badge-${getStatusBadgeClass(report.status)}">
                            <i class="fas ${getStatusIcon(report.status)} ${report.status === 'in-progress' ? 'fa-spin' : ''}"></i>
                            ${getStatusLabel(report.status)}
                        </span>
                    </div>
                </div>
                <button class="upvote-btn" onclick="handleUpvote('${report.id}')">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="upvote-count">${report.upvotes}</span>
                </button>
            </div>
            <div class="report-footer">
                <span>Reported by ${report.userName}</span>
                <span>${formatTimeAgo(report.timestamp)}</span>
            </div>
        </div>
    `).join('');

    if (hasMore && !isPremium) {
        html += `
            <div class="report-locked">
                <i class="fas fa-lock"></i>
                <h4>${state.drainageReports.length - displayReports.length} More Reports Available</h4>
                <p>Upgrade to Premium to view all community reports and get unlimited access</p>
                <button class="btn btn-warning" onclick="openMembershipModal()">
                    Unlock Premium Features
                </button>
            </div>
        `;
    }

    reportsList.innerHTML = html;

    // Update badge
    const badge = document.getElementById('reportsLimitBadge');
    if (!isPremium) {
        badge.textContent = 'Free: Limited View';
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderReportForm() {
    const isPremium = state.user.membershipTier === 'premium';
    const canSubmit = isPremium || state.user.reportsThisMonth < 3;
    const reportsRemaining = Math.max(0, 3 - state.user.reportsThisMonth);

    // Update reports remaining
    const reportsRemainingEl = document.getElementById('reportsRemaining');
    if (!isPremium) {
        reportsRemainingEl.innerHTML = `<span style="font-weight: 600; color: ${reportsRemaining === 0 ? '#dc2626' : '#111827'};">${reportsRemaining}</span> <span style="color: #6b7280;">reports left this month</span>`;
    } else {
        reportsRemainingEl.textContent = '';
    }

    // Update upload text
    const uploadText = document.getElementById('uploadText');
    uploadText.textContent = isPremium ? 'Upload photos (Premium)' : 'Upload up to 1 photo (Free)';

    // Show/hide warning and disable form
    const warning = document.getElementById('reportLimitWarning');
    const form = document.getElementById('reportForm');
    const inputs = form.querySelectorAll('input, textarea, select, button[type="submit"]');

    if (!canSubmit) {
        warning.classList.remove('hidden');
        inputs.forEach(input => input.disabled = true);
    } else {
        warning.classList.add('hidden');
        inputs.forEach(input => input.disabled = false);
    }
}

function renderUserProfile() {
    const isPremium = state.user.membershipTier === 'premium';
    const reportsRemaining = isPremium ? 'Unlimited' : Math.max(0, 3 - state.user.reportsThisMonth);

    const profileHTML = `
        <div class="user-profile-card">
            <div class="profile-header">
                <div class="profile-avatar">${state.user.name.charAt(0)}</div>
                <div class="profile-details">
                    <h3>${state.user.name}</h3>
                    <p class="profile-email">
                        <i class="fas fa-envelope" style="font-size: 0.75rem;"></i>
                        ${state.user.email}
                    </p>
                    ${isPremium ? 
                        '<span class="badge badge-warning"><i class="fas fa-crown"></i> Premium Member</span>' :
                        '<span class="badge badge-gray">Free Member</span>'
                    }
                </div>
            </div>

            <div class="profile-stats">
                <div class="stat-box">
                    <div class="stat-box-header">
                        <i class="fas fa-calendar"></i>
                        <span>Member Since</span>
                    </div>
                    <div class="stat-box-value">${formatTimeAgo(state.user.joinDate)}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-header">
                        <i class="fas fa-file-alt"></i>
                        <span>Reports Left</span>
                    </div>
                    <div class="stat-box-value">${reportsRemaining}</div>
                </div>
            </div>

            <div class="profile-activity">
                <div class="activity-header">
                    <i class="fas fa-chart-line"></i>
                    <span>This Month's Activity</span>
                </div>
                <div class="activity-item">
                    <span class="activity-label">Reports Submitted</span>
                    <span class="activity-value">${state.user.reportsThisMonth}</span>
                </div>
                ${!isPremium ? `
                    <div class="activity-progress">
                        <div class="progress-bar">
                            <div class="progress-fill blue" style="width: ${(state.user.reportsThisMonth / 3) * 100}%"></div>
                        </div>
                        <p style="font-size: 0.75rem; color: #1e40af; margin-top: 0.25rem;">
                            ${state.user.reportsThisMonth} of 3 free reports used
                        </p>
                    </div>
                ` : ''}
            </div>

            ${!isPremium ? `
                <div class="profile-upgrade">
                    <h4>Upgrade to Premium</h4>
                    <ul>
                        <li>• Unlimited report submissions</li>
                        <li>• Advanced analytics & insights</li>
                        <li>• Priority notifications</li>
                        <li>• Historical data access</li>
                    </ul>
                    <button class="btn btn-warning btn-block" onclick="openMembershipModal()">
                        <i class="fas fa-crown"></i>
                        Upgrade for $9.99/month
                    </button>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('userProfileCard').innerHTML = profileHTML;
    
    // Full profile for profile tab
    const membershipActions = document.getElementById('membershipActions');
    if (isPremium) {
        membershipActions.innerHTML = `
            <div class="membership-status">
                <i class="fas fa-crown"></i>
                <p>Premium Member</p>
                <p>Enjoying all premium features</p>
            </div>
            <button class="btn btn-outline btn-block" onclick="handleDowngrade()">
                Switch to Free Plan
            </button>
        `;
    } else {
        membershipActions.innerHTML = `
            <button class="btn btn-warning btn-block" onclick="openMembershipModal()">
                <i class="fas fa-crown"></i>
                Upgrade to Premium
            </button>
        `;
    }

    document.getElementById('userProfileFull').innerHTML = profileHTML;
}

function renderAdminTab() {
    const adminReportsList = document.getElementById('adminReportsList');
    const adminReportsCount = document.getElementById('adminReportsCount');
    if (!adminReportsList) return;

    const reports = state.drainageReports;
    const notYetOnMap = reports.filter(r => !r.addedToMap);

    if (adminReportsCount) {
        adminReportsCount.textContent = `${notYetOnMap.length} to verify`;
    }

    if (reports.length === 0) {
        adminReportsList.innerHTML = `
            <div class="admin-empty">
                <i class="fas fa-inbox"></i>
                <h4>No user reports yet</h4>
                <p>User reports will appear here when community members submit drainage issues.</p>
            </div>
        `;
        return;
    }

    adminReportsList.innerHTML = reports.map(report => `
        <div class="admin-report-item ${report.addedToMap ? 'added' : ''}">
            <div class="admin-report-info">
                <div class="admin-report-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <strong>${report.location}</strong>
                </div>
                <p class="admin-report-desc">${report.description}</p>
                <div class="admin-report-meta">
                    <span class="badge badge-${getSeverityBadgeClass(report.severity)}">${report.severity}</span>
                    <span class="badge badge-${getStatusBadgeClass(report.status)}">${getStatusLabel(report.status)}</span>
                    <span>Reported by ${report.userName}</span>
                    <span>${formatTimeAgo(report.timestamp)}</span>
                </div>
            </div>
            <div class="admin-report-actions">
                ${report.addedToMap
                    ? '<span class="badge badge-green"><i class="fas fa-check"></i> On Map</span>'
                    : `<button class="btn btn-primary btn-sm" type="button" data-report-id="${report.id}">
                        <i class="fas fa-map-pin"></i> Add to Map
                    </button>`
                }
            </div>
        </div>
    `).join('');

    // Add to Map button listeners
    adminReportsList.querySelectorAll('[data-report-id]').forEach(btn => {
        btn.addEventListener('click', () => handleAddToMap(btn.dataset.reportId));
    });
}

function handleAddToMap(reportId) {
    const report = state.drainageReports.find(r => r.id === reportId);
    if (!report || report.addedToMap) return;

    const severityToWaterLevel = { minor: 25, moderate: 50, severe: 85 };
    const waterLevel = severityToWaterLevel[report.severity] || 50;
    const severityForAlert = report.severity === 'minor' ? 'low' : report.severity === 'moderate' ? 'medium' : report.severity === 'severe' ? 'critical' : 'medium';

    const newAlert = {
        id: `alert-${report.id}`,
        location: report.location,
        severity: severityForAlert,
        waterLevel,
        description: report.description,
        timestamp: report.timestamp,
        lat: report.lat,
        lng: report.lng,
        status: 'active'
    };

    state.floodAlerts.unshift(newAlert);
    report.addedToMap = true;
    saveFloodAlerts();
    saveReports();
    render();
    showToast('Location added to map', `${report.location} is now visible on the flood map.`, 'success');
}

function renderAnalytics() {
    const isPremium = state.user.membershipTier === 'premium';
    const analyticsCards = document.querySelectorAll('.analytics-card');
    
    analyticsCards.forEach(card => {
        if (isPremium) {
            card.classList.add('premium');
        } else {
            card.classList.remove('premium');
        }
    });

    // Only render charts if premium
    if (isPremium && typeof Chart !== 'undefined') {
        // In a real implementation, you would use Chart.js here
        // For this demo, we're showing the locked overlay for free users
    }
}

// Event Handlers
function handleReportSubmit() {
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;

    const newReport = {
        id: Date.now().toString(),
        userId: state.user.id,
        userName: state.user.name,
        location,
        description,
        severity,
        timestamp: new Date().toISOString(),
        status: 'pending',
        lat: 40.7489 + Math.random() * 0.05,
        lng: -73.9851 + Math.random() * 0.05,
        upvotes: 0
    };

    state.drainageReports.unshift(newReport);
    state.user.reportsThisMonth += 1;
    
    saveReports();
    saveUser();

    // Reset form
    document.getElementById('reportForm').reset();

    // Show success modal
    openSuccessModal();

    // Re-render
    render();

    // Show toast
    showToast('Report submitted successfully!', 'Our team will review your report within 24 hours.', 'success');
}

function handleUpvote(reportId) {
    const report = state.drainageReports.find(r => r.id === reportId);
    if (report) {
        report.upvotes += 1;
        saveReports();
        renderReportsList();
        showToast('Upvoted!', 'Your support helps prioritize this issue.', 'success');
    }
}

function handleUpgrade() {
    state.user.membershipTier = 'premium';
    saveUser();
    closeMembershipModal();
    render();
    showToast('🎉 Welcome to Premium!', 'You now have access to all premium features including unlimited reports, advanced analytics, and more.', 'success');
}

function handleDowngrade() {
    state.user.membershipTier = 'free';
    saveUser();
    render();
    showToast('Membership Changed', 'You are now on the free plan. You can upgrade anytime.', 'info');
}

// Modal Functions
function openMembershipModal() {
    document.getElementById('membershipModal').classList.add('show');
    updateMembershipModal();
}

function closeMembershipModal() {
    document.getElementById('membershipModal').classList.remove('show');
}

function updateMembershipModal() {
    const isPremium = state.user.membershipTier === 'premium';
    const freePlanBtn = document.getElementById('freePlanBtn');
    const upgradePlanBtn = document.getElementById('upgradePlanBtn');

    if (isPremium) {
        freePlanBtn.textContent = 'Downgrade to Free';
        freePlanBtn.className = 'btn btn-outline btn-block';
        freePlanBtn.onclick = () => {
            handleDowngrade();
            closeMembershipModal();
        };

        upgradePlanBtn.textContent = 'Current Plan';
        upgradePlanBtn.className = 'btn btn-warning btn-block';
        upgradePlanBtn.disabled = true;
        upgradePlanBtn.innerHTML = '<i class="fas fa-crown"></i> Current Plan';
    } else {
        freePlanBtn.textContent = 'Current Plan';
        freePlanBtn.disabled = true;

        upgradePlanBtn.textContent = 'Upgrade to Premium';
        upgradePlanBtn.disabled = false;
        upgradePlanBtn.innerHTML = '<i class="fas fa-bolt"></i> Upgrade to Premium';
    }
}

function openSuccessModal() {
    document.getElementById('successModal').classList.add('show');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Utility Functions
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diff = now - then;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
}

function getSeverityBadgeClass(severity) {
    const map = {
        'critical': 'red',
        'severe': 'red',
        'high': 'red',
        'moderate': 'yellow',
        'medium': 'yellow',
        'minor': 'blue',
        'low': 'blue'
    };
    return map[severity] || 'gray';
}

function getStatusBadgeClass(status) {
    const map = {
        'pending': 'gray',
        'in-progress': 'blue',
        'resolved': 'green'
    };
    return map[status] || 'gray';
}

function getStatusIcon(status) {
    const map = {
        'pending': 'fa-clock',
        'in-progress': 'fa-spinner',
        'resolved': 'fa-check-circle'
    };
    return map[status] || 'fa-question';
}

function getStatusLabel(status) {
    const map = {
        'pending': 'Pending Review',
        'in-progress': 'In Progress',
        'resolved': 'Resolved'
    };
    return map[status] || status;
}

function showToast(title, description, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        ${description ? `<div class="toast-description">${description}</div>` : ''}
    `;

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Make functions globally accessible
window.openMembershipModal = openMembershipModal;
window.closeMembershipModal = closeMembershipModal;
window.closeSuccessModal = closeSuccessModal;
window.closeAlertDetails = closeAlertDetails;
window.handleUpvote = handleUpvote;
window.handleUpgrade = handleUpgrade;
window.handleDowngrade = handleDowngrade;
