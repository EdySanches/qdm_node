import { Router } from "express";
import authByUserType from "../../../auth/authorizeReq";
import postsControllers from "../controllers/postsControllers";

const postsRouter = Router()

postsRouter.post('/createPost', authByUserType(1), postsControllers.createPost)

postsRouter.get('/readPostById', authByUserType(1), postsControllers.readPostById)

postsRouter.get('/readPostsByUser', authByUserType(1), postsControllers.readPostsByUser)

postsRouter.put('/updatePost', authByUserType(1), postsControllers.updatePost)

postsRouter.delete('/deletePost', authByUserType(1), postsControllers.deletePost)

export default postsRouter

