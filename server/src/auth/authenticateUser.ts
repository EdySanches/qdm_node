import { sign } from 'jsonwebtoken'
import { PrismaClient, users } from '@prisma/client'
import { jwtConfig } from './jwt'
import { userDTO } from '../modules/users/dtos/userDTO'

class authUserService {

  public async execute(email: string, passw: string): Promise<string> {
    
    let userDB: users
    const prisma = new PrismaClient()

    try {
        /* database user search */
        userDB = await prisma.users.findUnique({
            where: {
                user_email: email
            }
        })
        
        if (!userDB) {
            console.log(new Date(), `authUserService/execute -- User ${email} not found!`);
            return ''
        }
    
        /* user auth */
        if (userDB.user_passw !== passw) {
            console.log(new Date(), `authUserService/execute -- Incorrect email/passw combination!`);
            return ''
        }
    
    } catch (err) {
        console.log(new Date(),'authUserService/execute -- Error on database:', err);
        return ''
    }
   
    /* build token */
    try {
        const { secret, expiresIn } = jwtConfig

        const token = sign({ tipo_usuario: userDB.user_type }, secret, {
            subject: userDB.user_email,
            expiresIn,
        });

        console.log(`authUserService/execute -- usuário: ${userDB.user_email} - token emitido: ${token}`);

        /* update user lastLogin */
        const success = await prisma.users.update({
            where: { user_email: userDB.user_email },
            data: { last_login: new Date() }
        })
        if (!success) 
            return ''

        return token

    } catch (err) {
        console.log(new Date(),'authUserService/execute -- Error generating token:', err);
        return ''
    }
  }

}

export default authUserService

