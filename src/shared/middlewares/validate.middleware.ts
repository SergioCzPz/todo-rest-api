import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

const firstElement = 0

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      let err = error
      if (err instanceof z.ZodError) {
        err = err.issues.map(e => ({ path: e.path[firstElement], message: e.message }))
      }
      res.status(StatusCodes.CONFLICT).json({
        status: 'failed',
        error: err,
      })
    }
  }
