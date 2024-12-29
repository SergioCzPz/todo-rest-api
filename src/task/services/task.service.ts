import type { ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '../../data/entities/task.entity'
import type { CreateTaskDto } from '../schemas/task.schema'

export class TaskService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  // QUERY FOR /tasks/status
  // SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id',
  async getTasks(): Promise<Task[]> {
    const [tasks] = await this.dbConnection.pool.execute<Task[]>('SELECT * FROM `tasks`')
    return tasks
  }

  // QUERY FOR /tasks/status/:id
  // SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.task_id = ?
  async getTask(id: string): Promise<Task> {
    const [task] = await this.dbConnection.pool.execute<Task[]>('SELECT * FROM `tasks` WHERE task_id = ?', [id])
    return task[this.firstElement]
  }

  async createTask(taskCreate: CreateTaskDto): Promise<ResultSetHeader[]> {
    // Need: user_id and task
  }
}
