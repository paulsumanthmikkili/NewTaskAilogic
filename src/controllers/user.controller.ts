import { type FastifyRequest, type FastifyReply } from "fastify";
import { createUserService, loginUserService } from "../services/user.service";
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
      const user = await createUserService(body);

      return reply.code(200).send(user);
    } catch (error) {
      console.error(error);
      return reply.code(500).send(error);
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
      const user = await loginUserService(body);
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
    } catch (error) {
      if (error instanceof Error) {
        return reply.code(401).send({
          success: false,
          message: "invalid email or password",
        });
      }
      return reply.code(500).send({
        success: false,
        message: "internal server error",
      });
    }
  }
}
