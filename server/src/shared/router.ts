import { Router } from 'express'
import usersRouter from '../modules/users/routes/usersRoutes'
import postsRouter from '../modules/posts/routes/postsRoutes'
import commentsRouter from '../modules/comments/routes/commentsRoutes'

const router = Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

export default router;