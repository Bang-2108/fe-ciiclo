export interface Skill {
  id: number;
  profile_id: number;
  name: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  is_featured: boolean;
  sort_order: number;
}