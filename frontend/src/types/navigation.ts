export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
