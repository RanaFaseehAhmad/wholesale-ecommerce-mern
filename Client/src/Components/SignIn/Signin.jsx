import style from "./Signin.module.css"
import api from "../../Api/Axios";
import 'primeicons/primeicons.css';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { signInSchema } from "../../ReactFormSchema/schema.js"
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSuccess, loginStart, setCountryCode } from "../../Features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mergeCart } from "../../Api/productApi.js";


export default function Signin({ onClose, redirectTo }) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false)
    const signInForm = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: yupResolver(signInSchema)
    })
    const email = signInForm.getValues("email")

    const mergeGuestCart = useMutation({
        mutationFn: mergeCart,
        onSuccess: (data) => {
            console.log("login successfull merge data are:", data)
            localStorage.removeItem("guestCart");

            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
        onError: (error) => {
            console.log(error.response?.data)
        }
    })

    const handleLoginForm = async (data) => {
        try {

            dispatch(loginStart())

            const loginResponse = await api.post("/auth/signIn", { email: data.email, password: data.password })
            console.log(loginResponse.data)
            localStorage.setItem("accessToken", loginResponse.data.accessToken)
            localStorage.setItem("refreshToken", loginResponse.data.refreshToken)
            console.log(loginResponse.data.user)
            dispatch(loginSuccess(loginResponse.data.user))
            dispatch(setCountryCode(loginResponse.data?.user?.countryCode))

            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []
            if (guestCart.length > 0) {
                await mergeGuestCart.mutateAsync(guestCart)

            }

            if (redirectTo) {
                navigate(redirectTo);
            } else {
                navigate(location.state?.from || "/");
            }
            if (loginResponse.status === 200) {
                onClose?.()
            }
        } catch (error) {
            const serverError = error.response?.data
            if (serverError?.email) {
                signInForm.setError("email", {
                    type: "server",
                    message: serverError.email
                })
            }
            if (serverError?.password) {
                signInForm.setError("password", {
                    type: "server",
                    message: serverError.password
                })
            }
        }

    }


    return (

        // <div className={style.overlay} onClick={onClose}>
        <div className={style.signIn}>
            {/* <span className={style.removePopup}><i onClick={onClose} className="pi pi-times"></i></span> */}
            <h1>Sign in</h1>
            <form onSubmit={signInForm.handleSubmit(handleLoginForm)} className={style.emailLoginForm}>
                <input className={style.signInEmailField} type="email" placeholder='Enter Your email' {...signInForm.register("email")} />
                {signInForm.formState.errors.email && (<span className={style.error}> {signInForm.formState.errors.email.message}</span>)}
                <div className={style.passwordWrapper}>
                    <input type={showPassword ? "text" : "password"} placeholder='Enter Your Pasword' {...signInForm.register("password")} />
                    <button type="button" className={style.passwordToggle} onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}>
                        <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`} />
                    </button>
                </div>
                {signInForm.formState.errors.password && (<span className={style.error}> {signInForm.formState.errors.password.message}</span>)}
                <span className={style.forgotPass} onClick={() => {
                    const url = email
                        ? `/login/forgotPassword?query=${encodeURIComponent(email)}`
                        : "/login/forgotPassword";
                    navigate(url)
                }}>Forgot Password?</span>
                <button className={style.loginBtn} type="submit">Login</button>
            </form>
            <p>OR</p>
            <div className={style.directSigninBtnWrapper}>
                <button className={style.socialBtn}><i className="pi pi-google"></i>Continue with Google</button>
                <button className={style.socialBtn}><i className="pi pi-facebook"></i>Continue with Facebook</button>
                <button className={style.socialBtn}><i className="pi pi-linkedin"></i>Continue with Linkedln</button>
            </div>
            <div className={style.createAccountLink}>
                <span>New to Site? <span onClick={() => navigate("/login/create-account")}>Create an account</span></span>
            </div>
        </div>
        // </div>

    )
}
