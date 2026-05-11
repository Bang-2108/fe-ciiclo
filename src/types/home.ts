export interface ProfileSocial {
  id: number;

  platform: string;

  icon: string;

  url: string;
}

export interface ProfileBadge {
  id: number;

  label: string;

  icon: string;

  position: string;
}

export interface Profile {
  id: number;

  name: string;

  role: string;

  description: string;

  avatar: string;

  socials: ProfileSocial[];

  badges: ProfileBadge[];
}