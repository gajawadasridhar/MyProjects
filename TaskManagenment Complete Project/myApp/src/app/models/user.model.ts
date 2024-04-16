// src/app/models/user.model.ts
export interface User {
    userId?: number;
    userName: string;
    password: string; // Note: Only use for login requests, do not store
    location?: string;
    contactNumber?: string;
  }
  