
import  {z} from "zod";

export const UserValidation = z.object({
     name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userLoginValidation=z.object({
   email: z.string().email(),
  password: z.string().min(6),
})

export type UserValidationType = z.infer<typeof UserValidation>;
export type userLoginValidation = z.infer<typeof userLoginValidation>
