import type { Request } from 'express'

export type RequestCreate<T> = Request<any, any, T, any> // eslint-disable-line @typescript-eslint/no-explicit-any -- Request from express handle any by default

export type RequestUpdate<T, U> = Request<{ id: U }, any, T, any> // eslint-disable-line @typescript-eslint/no-explicit-any -- Request from express handle any by default
