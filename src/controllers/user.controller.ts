import { type FastifyRequest, type FastifyReply } from "fastify";
import { UserRegisterService } from "../services/user.service";

import {
  type UserValidationType,
  userLoginValidation,
} from "../validation/user.validation";


export class UserRegisterController {
  static async userRegisterHandler(
    request: FastifyRequest<{
      Body: UserValidationType;
    }>,
    reply: FastifyReply,
  ) {
    const body = request.body;
    console.log(body);
    try {
      const user = await UserRegisterService.createUserService(body);

      return reply.code(200).send({
        status:"success",
        success:true,
        message:{
          msg:"user register successfully",
          user
        }
      });
    } catch (error) {
      if(error instanceof Error){
        return reply.code(404).send({
        status:"failed",
        success:false,
        message:{
          msg:error.message,
        }
        })
      }
      return reply.code(500).send({
        status:"failed",
        success:false,
        message:{
          msg:"internal server error",
        }
      });
    }
  }

  static async userLogin(
    request: FastifyRequest<{
      Body: userLoginValidation;
    }>,
    reply: FastifyReply,
  ) {
    const body = request.body;
    try {
      const user = await new UserRegisterService().loginUserService(body);
      const AccessToken = await reply.jwtSign(
        {
          email: user.email,
          name: user.name,
          id: user.id,
        },
        {
          expiresIn: "15m",
        },
      );

      return reply.code(200).send({
        status:"successfully",
        success:true,
        message:{
          msg:"user login successfully",
          AccessToken:AccessToken
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.code(401).send({
          success: false,
          message: error.message,
        });
      }
      return reply.code(500).send({
        success: false,
        message: "internal server error",
      });
    }
  }

  static async dashBoardController(request:FastifyRequest,reply:FastifyReply){
    try {
      const requestData=request.user;
      return reply.code(200).send({
        status:"successfully",
        success:true,
        message:{
          msg:"Sucessfully login",
          requestData:requestData
        }
      })
      
    } catch (error) {
        return reply.code(500).send({
        success: false,
        message:"internal server error",
      });
    }
  }
}
