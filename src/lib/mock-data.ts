import { NavLink } from "@/types/types";

export const mockLinks: NavLink[] = [
  {
    id: "1",
    url: "https://dashboard.example.com/analytics",
    description: "Main analytics dashboard for tracking product performance metrics and user engagement statistics across all platforms.",
    keywords: ["analytics", "dashboard", "metrics"],
    platform: "Web",
    product: "Analytics Suite",
    subproduct: "Executive Dashboard",
    screenshotPath: "",
    createdBy: "alice@example.com",
    status: "approved",
    upvotes: 24,
    downvotes: 2,
    clickCount: 156
  },
  {
    id: "2",
    url: "https://design.example.com/components",
    description: "Component library for the design system, including usage guidelines and implementation examples.",
    keywords: ["design", "components", "ui"],
    platform: "Web",
    product: "Design System",
    subproduct: "Component Library",
    screenshotPath: "",
    createdBy: "bob@example.com",
    status: "approved",
    upvotes: 18,
    downvotes: 1,
    clickCount: 103
  },
  {
    id: "3",
    url: "https://help.example.com/api/v2",
    description: "API documentation for developers including endpoints, request formats, and response examples.",
    keywords: ["api", "documentation", "developers"],
    platform: "Web",
    product: "Developer Portal",
    subproduct: "API Docs",
    screenshotPath: "",
    createdBy: "charlie@example.com",
    status: "pending",
    upvotes: 12,
    downvotes: 0,
    clickCount: 87
  },
  {
    id: "4",
    url: "https://mobile.example.com/settings",
    description: "Mobile application settings documentation for user preference management and configuration options.",
    keywords: ["mobile", "settings", "configuration"],
    platform: "Mobile",
    product: "Mobile App",
    subproduct: "Settings",
    screenshotPath: "",
    createdBy: "dana@example.com",
    status: "rejected",
    upvotes: 5,
    downvotes: 8,
    clickCount: 42
  },
  {
    id: "5",
    url: "https://admin.example.com/users",
    description: "User management panel for creating, updating and deleting user accounts across the platform.",
    keywords: ["admin", "users", "management"],
    platform: "Web",
    product: "Admin Portal",
    subproduct: "User Management",
    screenshotPath: "",
    createdBy: "evan@example.com",
    status: "approved",
    upvotes: 31,
    downvotes: 3,
    clickCount: 210
  },
  {
    id: "6",
    url: "https://docs.example.com/integration",
    description: "Integration documentation for third-party developers with sample code and authentication guidance.",
    keywords: ["integration", "documentation", "api"],
    platform: "Web",
    product: "Developer Portal",
    subproduct: "Integration Guide",
    screenshotPath: "",
    createdBy: "frank@example.com",
    status: "pending",
    upvotes: 9,
    downvotes: 1,
    clickCount: 65
  },
  {
    id: 'pending1',
    url: 'https://docs.example.com/api/v2',
    description: 'Updated API documentation with new endpoints',
    keywords: ['api', 'documentation', 'developer'],
    platform: 'Web',
    product: 'Developer Portal',
    createdBy: 'Mike Wilson',
    status: 'pending',
    upvotes: 12,
    downvotes: 2,
    clickCount: 145
  },
  {
    id: 'pending2',
    url: 'https://dashboard.example.com/analytics',
    description: 'Real-time analytics dashboard for product metrics',
    keywords: ['analytics', 'dashboard', 'metrics'],
    platform: 'Web',
    product: 'Analytics Suite',
    createdBy: 'Emma Davis',
    status: 'pending',
    upvotes: 8,
    downvotes: 1,
    clickCount: 89
  }
];

export const mockVersionHistory = [
  {
    id: '1',
    linkId: '3',
    versionNumber: 2,
    changes: "Updated API documentation structure and examples",
    modifiedBy: "charlie@example.com",
    timestamp: new Date('2025-04-16T14:20:00'),
    status: "pending"
  },
  {
    id: '2',
    linkId: '3',
    versionNumber: 1,
    changes: "Initial version of API documentation",
    modifiedBy: "charlie@example.com",
    timestamp: new Date('2025-04-10T10:30:00'),
    status: "approved"
  }
];

export const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Contributor"
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Reviewer"
  },
  {
    id: "4",
    name: "Dana White",
    email: "dana@example.com",
    role: "Contributor"
  }
];

export const mockAnalytics = {
  clicksOverTime: [
    { date: '2025-04-01', clicks: 45, uniqueUsers: 32, searchClicks: 28, directClicks: 17 },
    { date: '2025-04-02', clicks: 62, uniqueUsers: 41, searchClicks: 35, directClicks: 27 },
    { date: '2025-04-03', clicks: 58, uniqueUsers: 39, searchClicks: 30, directClicks: 28 },
    { date: '2025-04-04', clicks: 71, uniqueUsers: 52, searchClicks: 42, directClicks: 29 },
    { date: '2025-04-05', clicks: 89, uniqueUsers: 63, searchClicks: 51, directClicks: 38 },
    { date: '2025-04-06', clicks: 95, uniqueUsers: 70, searchClicks: 58, directClicks: 37 },
    { date: '2025-04-07', clicks: 86, uniqueUsers: 58, searchClicks: 49, directClicks: 37 },
  ]
};

export const mockWorkflowHistory = [
  {
    id: '1',
    navLinkId: 'link1',
    stage: 'Manager',
    status: 'approved',
    reviewer: 'John Smith',
    comments: 'Approved after reviewing content and metadata',
    timestamp: new Date('2025-04-15T10:30:00'),
  },
  {
    id: '2',
    navLinkId: 'link1',
    stage: 'CoreTeam',
    status: 'approved',
    reviewer: 'Sarah Johnson',
    comments: 'Verified alignment with navigation standards',
    timestamp: new Date('2025-04-16T14:20:00'),
  }
];
