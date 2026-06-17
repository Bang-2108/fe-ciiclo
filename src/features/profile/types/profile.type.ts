export interface Profile {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  education: string;
  objective: string | null;
  avatar: string | null;
  cv_path: string | null;
  stats_experience: number;
  stats_projects: number;
  stats_internships: number;
  created_at?: string;
  updated_at?: string;
}