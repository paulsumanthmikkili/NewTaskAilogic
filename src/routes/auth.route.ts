import type{ FastifyInstance } from "fastify"
import authMiddleware from "../middleware/Auth.middleware"
import { UserRegisterController } from "../controllers/user.controller"

export async function authRouter(server:FastifyInstance){
    server.post('/dashBoard',{
        schema:{
            tags:["User"],
            summary:"get user dashboard",
            security:[{bearerAuth:[]}]
        },
        preHandler:authMiddleware
    },UserRegisterController.dashBoardController)
}