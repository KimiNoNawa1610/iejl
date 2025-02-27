import {z} from "zod";

const requiredString = z.string().trim().min(1,"Required")

export const signUpSchema = z.object({
    email: requiredString.email("Invalid email address."),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "No special characters allowed."
    ),
    password:requiredString.min(7,"Must be at least 8 characters")

});

export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
    username:requiredString,
    password:requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>

