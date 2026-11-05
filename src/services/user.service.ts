import { fastify, type FastifyReply, type FastifyRequest } from "fastify";
import prisma from "../config/prisma";
import type { UserValidationType , userLoginValidation} from "../validation/user.validation";



export class UserRegisterService{
   constructor(){
        this.userId=req.user
        }
static async  createUserService(input: UserValidationType) {
  const user = await prisma.user.create({
    data: input,
  });
}

async  loginUserService(input:userLoginValidation){
        const loginUser=await prisma.user.findFirst({
                where:{
                        email:input.email
                }
        })
        if(!loginUser){
        throw new Error("INVALID_CREDENTIALS");
        }
        if(loginUser.password !== input.password){
               throw new Error("INVALID_CREDENTIALS");
        }
        return {
    id: loginUser.id,
    name: loginUser.name,
    email: loginUser.email,
  };
}
}



        
