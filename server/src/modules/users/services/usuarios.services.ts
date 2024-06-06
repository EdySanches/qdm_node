import { userModelInt } from '../../../models/userModel'

export default class usersServices {
        
    public async get_tipo_usuario(userId: number): Promise<number>{

        return 1
    }

    public async inserir_usuarios(user: userModelInt): Promise<boolean>{
        return true
    }
    
    public async listar_usuarios(user: userModelInt): Promise<any>{
        return
    }

    public async alterar_usuario(user: userModelInt): Promise<boolean>{

        return true
    }

    public async excluir_usuario(user: userModelInt): Promise<boolean>{

        return true
    }

}
