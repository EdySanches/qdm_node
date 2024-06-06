import { sign } from 'jsonwebtoken'
import { userModel, userModelInt } from '../models/userModel'

class authUserService {

  public async execute(uParam: userModelInt): Promise<string> {
    
    let user: userModelInt
    
    /* database user search */
        try {
        // const user = banco(uParam) // TODO puxar do banco
        user = new userModel() // NOTE mock data
        user.email = 'admin@admin.com'
        user.password = 'p@ss321312'
        
        if (!user) {
            console.log(new Date(), `authUserService/execute -- User ${user} not found!`);
            return ''
        }
    
        /* user validation */
        if (user.password !== uParam.password) {
            console.log(new Date(), `authUserService/execute -- Incorrect email/passw combination!`);
            return ''
        }
    
    } catch (err) {
        console.log(new Date(),'authUserService/execute -- Error on database:', err);
        return ''
    }
   
    /* build token */
    try {
        const { secret, expiresIn } = {
            secret: `${process.env.API_SECRET}` || 'secret',
            expiresIn: '30d',
        };

        const token = sign({ tipo_usuario: user }, secret, {
            subject: user.email,
            expiresIn,
        });

        console.log(`authUserService/execute -- usuário: ${user.email} - token emitido: ${token}`);
        return token

    } catch (err) {
    console.log(new Date(),'authUserService/execute -- Error generating token:', err);
    return ''
    }
  }

}

export default authUserService

