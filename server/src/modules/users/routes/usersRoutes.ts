import { Router } from "express";
import usuario_controller from "../controllers/usersController"
import autorizarPorTipoUsuario from "../../../auth/autorizar_requisicao";

const usersRouter = Router()

usersRouter.post('/login', usuario_controller.login)

// usersRouter.post('/insertUser',autorizarPorTipoUsuario(0),usuario_controller.inserir_usuario)

// usersRouter.get('/readUsers',autorizarPorTipoUsuario(0),usuario_controller.readUsers)

// usersRouter.get('/readUser',autorizarPorTipoUsuario(0),usuario_controller.readUser)

// usersRouter.put('/updateUser',autorizarPorTipoUsuario(0),usuario_controller.updateUser)

// usersRouter.delete('/deleteUser',autorizarPorTipoUsuario(0),usuario_controller.deleteUser)

export default usersRouter

