import { Response, NextFunction, Request } from 'express'
import { verify } from 'jsonwebtoken'
import { jwtConfig } from './jwt'
import { removeSubstring } from '../shared/utils'
import appError from '../shared/appError'

interface TokenPayload {
    iat: number
    exp: number
    sub: string
    userType: number 
}

export default function authByUserType(corrType: number) {
    return function (req, res, next) {

        if (!req.headers.authorization) {
            throw new appError('Token de autenticação está faltando.', 401)
        }

        try {
            let token = req.headers.authorization
            token = removeSubstring(token, 'Bearer')

            const decoded = verify(token, jwtConfig.secret) as TokenPayload

            if (decoded.userType < corrType) {
            throw new appError('Acesso não autorizado para este tipo de usuário.', 403)
            }
            
            return next()
        } catch (err) {
            console.log(new Date(),"authByUserType -- erro:", err)
            throw new appError('Token de autenticação inválido.', 401)
        }
    }
}
