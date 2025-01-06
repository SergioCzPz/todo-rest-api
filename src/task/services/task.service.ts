import pool from '../../data/db'
import { v4 as uuidv4 } from 'uuid'
import { formatDateIso } from '../../shared/helpers/date.iso'
import { Table, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'
import type { ResultSetHeader } from 'mysql2'
import type { CreateTask, UpdateTask } from '../schemas/task.schema'
import type { TaskStatusDb, UpdateTaskStatus } from '../schemas/task.status.schema'
import type { UpdateStatusNoBoolean } from '../schemas/status.schema'
import { transformTaskStatus } from '../../shared/helpers/transform.task'

export class TaskService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  async getTasksByUserId(userId: string): Promise<TaskStatusDb[]> {
    const values = [userId]
    const [tasks] = await this.dbConnection.pool.execute<TaskStatusDb[]>(
      'SELECT t.`task_id`, t.`task`, ts.`status`, ts.`start_date`, ts.`finish_date` FROM `tasks` t RIGHT JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.user_id = ?',
      values,
    )
    return tasks
  }

  async getTaskById(id: string): Promise<TaskStatusDb> {
    const values = [id]
    const [task] = await this.dbConnection.pool.execute<TaskStatusDb[]>(
      'SELECT t.`task_id`, t.`task`, ts.`status`, ts.`start_date`, ts.`finish_date` FROM `tasks` t RIGHT JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.task_id = ?',
      values,
    )
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

  async updateTask(id: string, updateTaskStatus: UpdateTaskStatus): Promise<ResultSetHeader> {
    const task: UpdateTask = {
      task: updateTaskStatus.task,
    }

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

  async updateTaskStatus(id: string, updateTaskStatus: UpdateTaskStatus): Promise<ResultSetHeader> {
    const status: UpdateStatusNoBoolean = transformTaskStatus(updateTaskStatus)

    const updateOpt: UpdateQueryOpt = {
      table: Table.TASK_STATUS,
      dto: status,
      id: 'task_id',
    }
    const query = UpdateQuery(updateOpt)

    const values = [...Object.values(status), id]
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async deleteTask(id: string): Promise<ResultSetHeader> {
    const values = [id]
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'DELETE FROM `tasks` WHERE `task_id` = ? LIMIT 1',
      values,
    )
    return resultSetHeader
  }
}
