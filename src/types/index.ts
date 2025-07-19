// User type
export interface User {
  id: number;
  email?: string;
  name?: string;
  role?: string;
}

// Issue type
export interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  priority: number | null; // Priority can be null if not set
  tags: Tag[];
  created_at: string;
  updated_at: string;
  assigned_to?: User;
  assigned_name?: string; // For display purposes
  priority_name?: string; // For display purposes 
}

// Tag type
export interface Tag {
  id: number;
  name: string;
  color?: string;
}

// Priority type
export interface Priority {
  id: number;
  name: string; // e.g., 'Low', 'Medium', 'High'
  level: number; 
  // description?: string;
}

// Invitation type
export interface Invitation {
  id: number;
  email: string;
  invited_by: User;
  status: 'pending' | 'accepted' | 'declined';
  sent_at: string;
  accepted_at?: string;
}

// Auth tokens type
export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

// Generic API response type
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}