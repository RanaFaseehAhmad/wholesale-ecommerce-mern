import * as yup from "yup"

export const signInSchema = yup.object({
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Enter a valid email"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
})

export const createBuyerSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Name is required")
        .matches(
            /^[a-zA-Z\s]+$/,
            "Name cannot contain numbers or special characters"
        ),
    city: yup
        .string()
        .trim()
        .required("city name is required")
        .matches(
            /^[a-zA-Z\s]+$/,
            "city cannot contain numbers or special characters"
        ),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Enter a valid email"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),

    phone: yup
        .string()
        .required("Phone number is required"),

    countryCode: yup
        .string()
        .required(),

    dialCode: yup
        .string()
        .required(),

    role: yup
        .string()
        .required("please select the role again and continue")
})

export const resetPasswordSchema = yup.object({
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
})