// src/app/models/task.model.ts
export interface TaskEdit {
    id?: number;  // Marking 'id' as optional
    name: string;
    description: string;
    priority: number;
    status: string;
  }
  