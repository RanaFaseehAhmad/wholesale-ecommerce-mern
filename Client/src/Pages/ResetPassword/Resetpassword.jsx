import style from "./Resetpassword.module.css"
import api from "../../Api/Axios"
import { useForm } from "react-hook-form"
import { resetPasswordSchema } from "../../ReactFormSchema/schema.js"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Resetpassword() {

    const signInForm = useForm({
        defaultValues: {
            password: ""
        },
        mode: "onChange",
        resolver: yupResolver(resetPasswordSchema)
    })

    const { search } = useLocation()
    const navigate = useNavigate()
    const searchQuery = new URLSearchParams(search).get("query");

    const [email, setEmail] = useState(searchQuery || "")
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState("email")
    const [error, setError] = useState({
        email: "",
        otp: ""
    })

    const handleforgotPasswordForm = async (e) => {

        e.preventDefault()
        try {
            const response = await api.post("/auth/verifyEmail", { email })
            console.log("otp created", response.data)
            if (response.status === 200) {
                setStep("otpCreated")
            }
        } catch (error) {
            console.log(error.response?.data?.message)
            setError(prev => ({
                ...prev,
                email: error.response?.data?.message
            }))
        }

    }

    const handleOtpForm = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("/auth/verify-otp", { email, otp })
            console.log("otp", response.data)
            if (response.status === 200) {
                setStep("resetPassword")
            }
        } catch (error) {
            console.log(error.response?.data?.message)
            setError(prev => ({
                ...prev,
                otp: error.response?.data?.OtpError
            }))
        }
    }
    const handlechangePassword = async (data) => {
        try {
            const response = await api.put("/auth/change-password", { email, password: data.password })
            console.log("password updated", response.data)
            if (response.status === 200) {
                navigate("/login/signIn")
            }
        } catch (error) {
            const serverError = error.response?.data
            if (serverError?.password) {
                signInForm.setError("password", {
                    type: "server",
                    message: serverError.password
                })
            }
        }
    }

    return (
        <div>
            <div className={style.header}>
                <div className={style.logo}>
                    <img src="/" alt="site logo" />
                </div>
            </div>

            <div className={style.containerMain}>
                <div className={style.container}>
                    {step === "email" && (
                        <form action="" onSubmit={handleforgotPasswordForm}>
                            <h1 className={style.title}>Find your account</h1>
                            <p className={style.detail}>Enter the email or member ID associated with your account</p>
                            <input type="email" placeholder="Email ID" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                                setError(prev => ({
                                    ...prev,
                                    email: ""
                                }))
                            }} />
                            {error.email && (<span className={style.error}>{error.email}</span>)}
                            <button type="submit">Continue</button>
                        </form>
                    )}
                    {step === "otpCreated" && (

                        <form action="" onSubmit={handleOtpForm}>
                            <h1 className={style.title}>Verify your identity</h1>

                            <p className={style.detail}>Enter the verification code that we sent to <strong>{email}</strong>
                            </p>
                            <input type="text" placeholder="Please enter your OTP" value={otp} onChange={(e) => {
                                setOtp(e.target.value)
                                setError(prev => ({
                                    ...prev,
                                    otp: ""
                                }))
                            }} />
                            {error.otp && (<span className={style.error}>{error.otp}</span>)}
                            <button type="submit">verify otp</button>
                        </form>
                    )}

                    {step === "resetPassword" && (
                        <form action="" onSubmit={signInForm.handleSubmit(handlechangePassword,
                            (error) => console.log("VALIDATION ERRORS:", error)
                        )}>
                            <h1 className={style.title}>Update your password</h1>
                            <input type="password" placeholder='Enter Your Pasword' {...signInForm.register("password")} />
                            {signInForm.formState.errors.password && (<span className={style.error}> {signInForm.formState.errors.password.message}</span>)}
                            <ul className={style.passwordDescLists}>
                                <li>Your password must be between 6 and 20 characters long</li>
                                <li>Include at least two of the following: letters, numbers, and special characters</li>
                                <li>Symbols such as emojis are not supported</li>
                            </ul>
                            <button type="submit">Reset password</button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Resetpassword
