export interface FarmerFormData {
  name: string;
  type: string;
  location: string;
  year: string;
  month: string;
  day: string;
  skillsRequired: string;
  image: File | null;
  description: string;
}

export interface YouthFormData {
  name: string;
  skills: string;
  location: string;
  year: string;
  month: string;
  day: string;
  type: string;
  experienceLevel: string;
  contactInfo: string;
  goals: string;
}
