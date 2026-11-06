import {type FastifyInstance } from "fastify";
import { UserRegisterController } from "../controllers/user.controller";
import { userLoginValidation,UserValidation } from "../validation/user.validation";
import {z} from 'zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";


export default async function userRoute(server:FastifyInstance){
    const app=server.withTypeProvider<ZodTypeProvider>();
    server.post('/register',{
        schema:{
             tags: ["User"],
        summary: "Register a new user",
            body:UserValidation
        }
    },UserRegisterController.userRegisterHandler);
    server.post('/login',{
        schema:{
             tags: ["User"],
        summary: "Login user",
            body:userLoginValidation
        }
    },UserRegisterController.userLogin)
}