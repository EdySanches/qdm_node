import { Request, Response , NextFunction, request} from "express";
import authUserService from "../../../auth/authUser"
import { userModel } from "../../../models/userModel";

export class userController {

    public async login(req : Request, res : Response, _:NextFunction){

        console.log(`userController/login -- corpo `, req.body)

        try{
            /* check inputs */
            if (!req.body.email || !req.body.password){
                res.status(422).send('Missing email and/or password.')
                return
            }
            /* format inputs */ 
            const user = new userModel().formatUserReq(req)

            /* token part */
            const token = await new authUserService().execute(user)

            if(token) {
                res.status(200).json({token:token})
            }
            else {
                res.status(401).send('Incorrect email/password combination.')
            }
        }  catch(err){
            res.status(500).send('Internal error!');
        }

        return

    } 

    public async inserir_usuario(req :Request, res :Response){

    } 


}
export default new userController()
