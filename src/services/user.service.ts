import prisma from "../config/prisma";
import type { UserValidationType , userLoginValidation} from "../validation/user.validation";
import argon2 from 'argon2'



export class UserRegisterService{
   constructor(){
        // this.userId=req.user
        }
static async  createUserService(input: UserValidationType) {

    const existUser=await prisma.user.findUnique({
      where:{
        email:input.email
      }
    })

    if(existUser){
      throw new Error("User already exist")
    }
    else{
      const hashPassword=await argon2.hash(input.password);
      const userData=await prisma.user.create({
        data: {
          email: input.email,
          name:input.email,
          password: hashPassword,
        },
      })
    }
  
}

async  loginUserService(input:userLoginValidation){
        const loginUser=await prisma.user.findFirst({
                where:{
                        email:input.email
                }
        })
        if(!loginUser){
        throw new Error("User doesn't exist Please Register");
        }
        // if(loginUser.password !== input.password){
        //        throw new Error("INVALID_CREDENTIALS");
        // }
        const hashPassword=await argon2.verify(loginUser.password,input.password)
        if(!hashPassword){
          throw new Error("INVALID_CREDENTIALS");
        }
        return {
    id: loginUser.id,
    name: loginUser.name,
    email: loginUser.email,
  };
}

}



        
