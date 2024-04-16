// src/app/models/register-request.model.ts
export interface RegisterRequest {
    userName: string;
    password: string; // Note: Always secure password transmission via HTTPS.
    location: string;
    contactNumber: string;
  }
  