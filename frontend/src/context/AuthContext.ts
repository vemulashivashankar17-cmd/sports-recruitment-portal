import React, { createContext } from 'react';

export interface User {
  id: number;
  email: string;
  userType: 'athlete' | 'recruiter' | 'admin';
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
