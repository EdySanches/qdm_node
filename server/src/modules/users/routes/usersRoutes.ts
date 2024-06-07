import { Router } from "express";
import authByUserType from "../../../auth/authorizeReq";
import usersController from "../controllers/usersControllers";

const usersRouter = Router()

usersRouter.post('/login', usersController.login)

usersRouter.post('/createUser', authByUserType(0), usersController.createUser)

usersRouter.get('/readUsers', authByUserType(0), usersController.readUser)

usersRouter.put('/updateUser', authByUserType(0), usersController.updateUser)

usersRouter.delete('/deleteUser', authByUserType(0), usersController.deleteUser)

export default usersRouter

