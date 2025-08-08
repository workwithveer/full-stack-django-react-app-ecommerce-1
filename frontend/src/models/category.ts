export interface Category {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  level: number;
  parent: number | null;
}
