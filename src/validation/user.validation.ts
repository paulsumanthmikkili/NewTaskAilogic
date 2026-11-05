
import * as z from "zod";

export const UserValidation = z.object({
    email: z.string({
      error:"Email is required",
    }).email("Invalid email format"),

    name: z.string({
        error:"Email is required",
    }).min(3, "Name cannot be empty 3 character"),

    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginValidation=z.object({
    email:z.string().email("enter valid email format"),
    password:z.string({
        error:"password is required"
    })
})

export type UserValidationType = z.infer<typeof UserValidation>;
export type userLoginValidation = z.infer<typeof userLoginValidation>
