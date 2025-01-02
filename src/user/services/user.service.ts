import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import pool from '../../data/db'
import type { User } from '../../data/entities/user.entity'
import { v4 as uuidv4 } from 'uuid'
import type { CreateUserDto, UpdateUserDto } from '../schemas/user.schema'
import { bcryptPassword } from '../../shared/helpers/encrypt.password'
import { UpdateDto, UpdateQuery, type UpdateQueryOpt } from '../../shared/helpers/update.query'
import type { Task } from '../../data/entities/task.entity'
import type { CreateTask, UpdateTaskDto } from '../../task/schemas/task.schema'
import { formatDateIso } from '../../shared/helpers/date.iso'

interface UserId extends RowDataPacket {
  id: string
}

export class UserService {
  private readonly dbConnection
  private readonly firstElement = 0

  constructor() {
    this.dbConnection = pool
  }

  async getUsers(): Promise<User[]> {
    const [users] = await this.dbConnection.pool.execute<User[]>('SELECT * FROM `users`')
    return users
  }

  async getUser(id: string): Promise<User> {
    const values = [id]
    const [user] = await this.dbConnection.pool.execute<User[]>('SELECT * FROM `users` WHERE `user_id` = ?', values)
    return user[this.firstElement]
  }

  async getUserId(emailUser: string): Promise<string> {
    const [dataPackets] = await this.dbConnection.pool.execute<UserId[]>(
      'SELECT `password` FROM `credentials` WHERE `email` = ?',
      [emailUser],
    )

    return dataPackets[this.firstElement].id
  }

  async createUser(user: CreateUserDto): Promise<ResultSetHeader[]> {
    const { name, surname, email, password, occupation } = user
    const id = uuidv4()
    const encryptedPassword = await bcryptPassword(password)
    const userValues = [id, name, surname, occupation]
    const credentialValues = [email, id, encryptedPassword]

    const [resultSetHeaderUser] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `users`(`user_id`, `name`, `surname`, `occupation`) VALUES (?, ?, ?, ?)',
      userValues,
    )

    const [resultSetHeaderCredential] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `credentials`(`email`, `user_id`, `password`) VALUES(?, ?, ?)',
      credentialValues,
    )

    return [resultSetHeaderUser, resultSetHeaderCredential]
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<ResultSetHeader> {
    const updateOpt: UpdateQueryOpt = {
      table: UpdateDto.USER,
      dto: user,
      id: 'user_id',
    }
    const query = UpdateQuery(updateOpt)
    const values = [...Object.values(user), id]

    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async deleteUser(id: string): Promise<ResultSetHeader> {
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'DELETE FROM `users` WHERE `user_id` = ? LIMIT 1',
      [id],
    )

    return resultSetHeader
  }

  /**
   *
   * @param id from user
   */
  async getTasks(id: string): Promise<Task[]> {
    const [tasks] = await this.dbConnection.pool.execute<Task[]>(
      'SELECT * FROM `tasks` t INNER JOIN `task_status` ts ON t.task_id = ts.task_id WHERE t.user_id = ?',
      [id],
    )

    return tasks
  }

  async createTask(taskCreate: CreateTask): Promise<ResultSetHeader[]> {
    const { userId, task } = taskCreate
    const taskId = uuidv4()
    const [resultSetHeaderTasks] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `tasks`(`task_id`, `user_id`, `task`) VALUES (?, ?, ?)',
      [taskId, userId, task],
    )

    const startDate = formatDateIso(new Date())
    const [resultSetHeaderStatus] = await this.dbConnection.pool.execute<ResultSetHeader>(
      'INSERT INTO `task_status`(`task_id`, `start_date`) VALUES(?, ?)',
      [taskId, startDate],
    )

    return [resultSetHeaderTasks, resultSetHeaderStatus]
  }

  async updateTask(idTask: string, task: UpdateTaskDto): Promise<ResultSetHeader> {
    const updateOpt: UpdateQueryOpt = {
      table: UpdateDto.TASK,
      dto: task,
      id: 'task_id',
    }
    const query = UpdateQuery(updateOpt)
    const values = [...Object.values(task), idTask]
    const [resultSetHeader] = await this.dbConnection.pool.execute<ResultSetHeader>(query, values)
    return resultSetHeader
  }

  async updateStatus(idTask: string, task: UpdateTaskDto): Promise<ResultSetHeader> {
    const updateOpt: UpdateQueryOpt = {
      table: UpdateDto.TASK_STATUS,
      dto: task,
      id: 'task_id',
    }
    const query = UpdateQuery(updateOpt)
    const values = [...Object.values(task), idTask]
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
