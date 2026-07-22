export type UserRole = "USER" | "ADMIN";

export interface Address {
  id: string;
  fullName: string;
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}
