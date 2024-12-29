import type { Request, Response } from 'express'
import { TaskService } from '../services/task.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

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
      const task = await this.taskService.getTask(id)
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: task })
    } catch (error) {
      console.log(error)
    }
  }
}
