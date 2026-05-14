import type { ApiResponse } from './api';

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  id: number;
  profile_id: number;
  name: string;
  percentage: number;
  category: SkillCategory;
  is_featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export type GroupedSkills = Record<string, Skill[]>;

export interface SkillRequest {
  profile_id: number; 
  name: string;
  percentage: number;
  category: SkillCategory;
  is_featured: boolean;
  sort_order: number;
}