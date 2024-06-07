import { Router } from "express";
import authByUserType from "../../../auth/authorizeReq";
import usersController from "../controllers/usersControllers";

const usersRouter = Router()

usersRouter.post('/login', usersController.login)

usersRouter.post('/createUser', authByUserType(0), usersController.createUser)

// usersRouter.get('/readUsers',autorizarPorTipoUsuario(0),usuario_controller.readUsers)

// usersRouter.get('/readUser',autorizarPorTipoUsuario(0),usuario_controller.readUser)

// usersRouter.put('/updateUser',autorizarPorTipoUsuario(0),usuario_controller.updateUser)

// usersRouter.delete('/deleteUser',autorizarPorTipoUsuario(0),usuario_controller.deleteUser)

export default usersRouter

