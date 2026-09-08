import style from "./LoginPopup.module.css"
import api from "../../Api/Axios";
import 'primeicons/primeicons.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { signInSchema } from "../../ReactFormSchema/schema.js"
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSuccess, loginStart, initializeAuth } from "../../Features/auth/authSlice.js";
import { useDispatch } from "react-redux";


export default function LoginPopup({ onClose, onLogin }) {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const signInForm = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: yupResolver(signInSchema)
    })
    const email = signInForm.getValues("email")


    const handleLoginForm = async (data) => {
        try {
            dispatch(loginStart())

            const response = await api.post("/auth/signIn", { email: data.email, password: data.password })
            console.log(response.data)
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)

            console.log(response.data.user)
            dispatch(loginSuccess(response.data.user))

            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []

            if (guestCart.length > 0) {
                await api.post("/cart/mergeGuestCart", { guestCart })

            }
            localStorage.removeItem("guestCart")

            if (response.status === 200) {
                onClose()
                onLogin()
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

        <div className={style.overlay} onClick={onClose}>
            <div className={style.signIn} onClick={(e) => e.stopPropagation()}>
                <span className={style.removePopup}><i onClick={onClose} className="pi pi-times"></i></span>
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
        </div>

    )
}
