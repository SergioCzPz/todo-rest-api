import type { ResultSetHeader } from 'mysql2'
import pool from '../../data/db'
import { v4 as uuidv4 } from 'uuid'
import type { CreateTask, Task, TaskDb, UpdateTask } from '../schemas/task.schema'
import { formatDateIso } from '../../shared/helpers/date.iso'
import { Table, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'

export class TaskService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  // QUERY FOR /tasks/status
  // SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id',
  async getTasks(): Promise<TaskDb[]> {
    const [tasks] = await this.dbConnection.pool.execute<TaskDb[]>('SELECT * FROM `tasks`')
    return tasks
  }

  // QUERY FOR /tasks/status/:id
  // SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.task_id = ?
  async getTaskById(id: string): Promise<Task> {
    const [task] = await this.dbConnection.pool.execute<Task[]>('SELECT * FROM `tasks` WHERE task_id = ?', [id])
    return task[this.firstElement]
  }

  async createTask(userId: string, taskCreate: CreateTask): Promise<ResultSetHeader[]> {
    const { task } = taskCreate
    const taskId = uuidv4()
    const taskValues = [taskId, userId, task]

    const [resultSetHeaderTasks] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `tasks`(`task_id`, `user_id`, `task`) VALUES(?, ?, ?)',
      taskValues,
    )

    const startDate = formatDateIso(new Date())
    const statusValues = [taskId, startDate]
    const [resultSetHeaderStatus] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `task_status`(`task_id`, `start_date`) VALUES(?, ?)',
      statusValues,
    )

    return [resultSetHeaderTasks, resultSetHeaderStatus]
  }

  async updateTask(id: string, task: UpdateTask): Promise<ResultSetHeader> {
    const updateOpt: UpdateQueryOpt = {
      table: Table.TASK,
      dto: task,
      id: 'task_id',
    }
    const query = UpdateQuery(updateOpt)
    const values = [...Object.values(task), id]
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async deleteTask(id: string): Promise<ResultSetHeader> {
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'DELETE FROM `tasks` WHERE `task_id` = ? LIMIT 1',
      [id],
    )
    return resultSetHeader
  }
}
