import { Request, Response , NextFunction, request} from "express";
import authUserService from "../../../auth/authenticateUser"
import { plainToInstance } from "class-transformer";
import { userDTO } from "../dtos/userDTO";
import { validateOrReject } from "class-validator";
import usersServices from "../services/userServices";

export default new class userControllers {

    public async login(req: Request, res: Response, _:NextFunction){

        console.log(`userController/login -- corpo `, req.body)

        try{
            console.log("a")
            /* check inputs */
            if (!req.body.user_email || !req.body.user_passw){
                res.status(422).send('Missing email and/or password.')
                return
            }
            console.log("b")

            /* token part */
            const token = await new authUserService().execute(req.body.user_email, req.body.user_passw)
            console.log("c")
            
            if(token) {
                res.status(200).json({token:token})
            }
            else {
                res.status(401).send('Incorrect email/password combination.')
            }
        }  catch(err){
            res.status(422).send('Parameters error!');
        }

        return

    } 

    public async createUser(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.user.last_login = new Date()
            const userFMT = plainToInstance(userDTO, req.body.user)
            await validateOrReject(userFMT)

            /* call service */
            const user = new usersServices().createtUser(userFMT)

            /* return reponse */
            res.status(201).json(user)
        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readUser(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.user.last_login = new Date()
            const userFMT = plainToInstance(userDTO, req.body.user)
            await validateOrReject(userFMT)

            /* call service */
            const user = new usersServices().createtUser(userFMT)

            /* return reponse */
            res.status(201).json(user)
        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

}

