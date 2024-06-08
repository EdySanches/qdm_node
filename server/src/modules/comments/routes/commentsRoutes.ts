import { Router } from "express";
import authByUserType from "../../../auth/authorizeReq";
import commentsControllers from "../controllers/commentsControllers";

const commentsRouter = Router()

commentsRouter.post('/createComment', authByUserType(1), commentsControllers.createComment)

commentsRouter.get('/readCommentsByPost', authByUserType(1), commentsControllers.readCommentsByPost)

commentsRouter.get('/readCommentsByUser', authByUserType(1), commentsControllers.readCommentsByUser)

commentsRouter.get('/readCommentById', authByUserType(1), commentsControllers.readCommentById)

commentsRouter.put('/updateComment', authByUserType(1), commentsControllers.updateComment)

commentsRouter.delete('/deleteCommentByPO', authByUserType(1), commentsControllers.deleteCommentByPO)

commentsRouter.delete('/deleteCommentByUser', authByUserType(1), commentsControllers.deleteCommentByUser)

export default commentsRouter

