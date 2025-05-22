export interface Cat {
  id: number;
  name: string;
  gender: '公' | '母';
  age: string;
  color: string;
  location: string;
  health: '健康' | '生病' | '受伤';
  neutered: boolean;
  description: string;
  image_url: string | null;
  created_at?: string;
}

export interface CatFormData extends Omit<Cat, 'id' | 'image_url'> {
  image_url: File | string | null;
} 