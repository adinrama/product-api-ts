import { Router } from 'express'
import { refreshSession, registerUser, createSession } from '../controllers/auth.controller'

export const AuthRouter = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)
AuthRouter.post('/refresh', refreshSession)
