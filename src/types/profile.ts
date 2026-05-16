export interface Profile {
  id: number;
  name: string;
  role: string;
  bio: string;
  education: string;
  objective: string;
  avatar: string;
  cv_path: string | null;
  stats_experience: number;
  stats_projects: number;
  stats_internships: number;
  is_available: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile;
}

export interface ProfileUpdateRequest {
  name: string;
  role: string;
  bio: string;
  education: string;
  objective: string;
  stats_experience: number;
  stats_projects: number;
  stats_internships: number;
  avatar?: File | null;
  cv_file?: File | null;
}