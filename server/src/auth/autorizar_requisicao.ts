import { Response, NextFunction, Request } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../shared/errors/AppError'
import authConfig from './jwt'
import { retira_sub_string } from '../data/utils'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
  tipo_usuario: number 
  id_empresa : number
}

declare global {
  namespace Express {
    interface Request {
      usuario: {
        _id: string;
        tipo_usuario: number;
        id_empresa : number;
      };
    }
  }
}
let id_empresa_global: number| null = null

export function getIdEmpresaGlobal() {
  return id_empresa_global;
}

export default function autorizarPorTipoUsuario(tipoEsperado: number) {
  return function(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      throw new AppError('Token de autenticação está faltando.', 401)
    }
    
    try {
      let token = req.headers.authorization
      token = retira_sub_string(token, 'Bearer')

      const decoded = verify(token, authConfig.jwt.secret) as TokenPayload

      if (decoded.tipo_usuario > tipoEsperado) {
        throw new AppError('Acesso não autorizado para este tipo de usuário.', 403)
      }
      
      req.usuario = {
        _id: decoded.sub,
        tipo_usuario: decoded.tipo_usuario,
        id_empresa:   decoded.id_empresa
      }
        id_empresa_global = decoded.id_empresa;
      
      return next()
    } catch (err) {
      console.log(new Date(),"autorizarPorTipoUsuario -- erro:", err)
      throw new AppError('Token de autenticação inválido.', 401)
    }
  }
}
