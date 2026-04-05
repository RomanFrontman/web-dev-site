// src/types/database.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live_url: string;
  github_url: string;
  image: string;
  featured: boolean;
  category: string;   // used for the category badge in the public portfolio
  order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;      // 0 = no progress bar (tools)
  category: string;  // "Programming" | "Tool" | "Backend" | "Other"
  icon: string;
  color: string;      // Tailwind gradient classes e.g. "from-purple-500 to-blue-500"
  order: number;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;       // URL-safe identifier, e.g. "privacy-policy"
  title: string;
  content: string;    // HTML string
  is_published: boolean;
  updated_at: string;
}
