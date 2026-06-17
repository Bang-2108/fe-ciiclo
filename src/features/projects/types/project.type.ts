export interface Project {
  id: number;
  profile_id: number;
  title: string;
  description: string;
  image: string | null;
  type: string;
  tech_stack: string[]; 
  demo_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  status: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}