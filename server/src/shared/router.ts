import { Router } from 'express'
import usersRouter from '../modules/users/routes/usersRoutes'
import postsRouter from '../modules/posts/routes/postsRoutes'

const router = Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)
// router.use('/api/comments',    commentsRouter)

export default router;