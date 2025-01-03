import type { Request, Response } from 'express'
import { TaskService } from '../services/task.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { RequestCreate, RequestUpdate } from '../../shared/constants/request/request'
import type { CreateTask, UpdateTask } from '../schemas/task.schema'

export class TaskController {
  constructor(private readonly taskService: TaskService = new TaskService()) {}

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getTasks()
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: tasks })
    } catch (error) {
      console.log(error)
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const task = await this.taskService.getTaskById(id)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: task })
    } catch (error) {
      console.log(error)
    }
  }

  async createTask(req: RequestCreate<CreateTask>, res: Response): Promise<void> {
    try {
      if (req.session?.userId === undefined) throw Error('No User Found')
      const {
        session: { userId },
      } = req
      const [resultSetHeaderTasks, resultSetHeaderStatus] = await this.taskService.createTask(userId, req.body)
      res
        .status(StatusCodes.OK)
        .json({ message: ReasonPhrases.OK, data: [resultSetHeaderTasks, resultSetHeaderStatus] })
    } catch (error) {
      console.log(error)
    }
  }

  async updateTask(req: RequestUpdate<UpdateTask, string>, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const resultSetHeader = await this.taskService.updateTask(id, req.body)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const resultSetHeader = await this.taskService.deleteTask(id)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: resultSetHeader })
    } catch (error) {
      console.log(error)
    }
  }
}
