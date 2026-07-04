import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AuthLocals } from '../types/auth_locals'

export function requireAuthMiddleware(req: Request, res: Response<any, AuthLocals>, next: NextFunction) {
    next()
}
