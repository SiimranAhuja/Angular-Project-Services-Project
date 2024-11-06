import { inject, Inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// @Injectable({
//     providedIn: 'root'
// })

export class TasksService {
    private tasks = signal<Task[]>([]);
    private logService = inject(LoggingService);
    allTasks = this.tasks.asReadonly();
    addTask(taskData: { title: string, description: string }) {
        let newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this.logService.log('ADDED TASK');
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.filter((task) => task.id === taskId ? { ...task, status: newStatus } : task));
        this.logService.log('Change Task Status to:' + newStatus);
    }
}
