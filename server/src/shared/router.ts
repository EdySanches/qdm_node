import { Router } from 'express'
import usersRouter from '../modules/users/routes/usersRoutes'

const router = Router()

router.use('/api/users', usersRouter)
// router.use('/api/posts',     postsRouter)
// router.use('/api/comments',    commentsRouter)

export default router;