
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
