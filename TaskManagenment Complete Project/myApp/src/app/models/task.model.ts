// src/app/models/task.model.ts
export interface Task {
    id: number;
    name: string;
    description: string;
    priority: number;
    status: number;
    timerRunning?: boolean;  // Optional flag to indicate if the timer is running
    timeLeft?: number;       // Optional time left in seconds
    added: Date;             // DateTime when the task was added
    completed?: Date;        // Optional DateTime when the task was completed, nullable
}
