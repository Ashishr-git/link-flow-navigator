export interface NavLink {
  id: string;
  url: string;
  description: string;
  keywords: string[];
  platform: string;
  product: string;
  subproduct?: string;
  screenshotPath?: string;
  createdBy: string;
  status: "pending" | "approved" | "rejected";
  upvotes: number;
  downvotes: number;
  clickCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Contributor" | "Reviewer" | "Admin";
}

export interface WorkflowStep {
  id: string;
  navLinkId: string;
  stage: "Manager" | "CoreTeam";
  status: "pending" | "approved" | "rejected";
  reviewer?: string;
  comments?: string;
  timestamp: Date;
}

export interface Version {
  id: string;
  linkId: string;
  versionNumber: number;
  changes: string;
  modifiedBy: string;
  timestamp: Date;
  status: "pending" | "approved";
}
