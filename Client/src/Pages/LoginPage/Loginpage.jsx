import style from "./Loginpage.module.css"
import api from "../../Api/Axios";
import 'primeicons/primeicons.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form"
import { createBuyerSchema } from "../../ReactFormSchema/schema.js"
import { yupResolver } from '@hookform/resolvers/yup';
import siteimage from "./siteimage.avif";
import { useLocation, useNavigate } from "react-router-dom"
import Signin from "../../Components/SignIn/Signin.jsx";
import { useState } from "react";

function Loginpage() {
    const navigate = useNavigate();
    const search = useLocation();
    const [showPassword, setShowPassword] = useState(false)
    const createBuyerAccForm = useForm({
        defaultValues: {
            name: "",
            email: "",
            city: "",
            password: "",
            phone: "",
            country: "",
            countryCode: "",
            dialCode: "",
            role: ""
        },
        mode: "onChange",
        resolver: yupResolver(createBuyerSchema)
    })
    const handleCreatebuyerAccount = async (data) => {
        // console.log(data)
        try {
            const response = await api.post("/auth/register",
                { name: data.name, email: data.email, city: data.city, password: data.password, phone: data.phone, countryCode: data.countryCode, dialCode: data.dialCode, role: data.role })
           
            console.log(response.data)
            if (response.status === 200) {
                navigate("/login/signIn")
                createBuyerAccForm.reset()
            }
        } catch (error) {
            console.log("server error", error.response?.data)
            const serverError = error.response?.data
            if (serverError?.email) {
                createBuyerAccForm.setError("email", {
                    type: "server",
                    message: serverError.email
                })
            }
            if (serverError?.password) {
                createBuyerAccForm.setError("password", {
                    type: "server",
                    message: serverError.password
                })
            }
        }
    }

    return (
        <div>
            <div className={style.containerMain}>
                <div className={style.header}>
                    <div className={style.logo}>
                        <img src="/" alt="site logo" />
                    </div>
                </div>
                <div className={style.leftSection}>
                    <img src={siteimage} alt="banner" />
                </div>
                <div className={style.rightSection}>
                    <div className={style.logInContainer}>
                        {search.pathname === "/login" && (
                            <div className={style.signInOneClickWrapper}>
                                <h1>Sign in</h1>
                                <span className={style.subTitle}>Use your last sign-in method</span>
                                <button><i className="pi pi-google"></i>Continue with Google</button>
                                <p>OR</p>
                                <button><i className="pi pi-facebook"></i>Continue with Facebook</button>
                                <button><i className="pi pi-linkedin"></i>Continue with Linkedln</button>
                                <button onClick={() => navigate("/login/signIn")}><i className="pi pi-envelope"></i>Continue with email</button>
                                <div className={style.createAccountLink}>
                                    <span>New to Site? <span onClick={() => navigate("/login/create-account")}>Create an account</span></span>
                                </div>
                            </div>
                        )
                        }
                        {search.pathname === "/login/signIn" && (
                            <Signin />
                        )}

                        {search.pathname === "/login/create-account" && (

                            <div className={style.createAcount}>
                                <h1>Which account would you like to create?</h1>
                                <form action="" className={style.createAccForm}>
                                    <div className={style.groupRoleBtn}>
                                        <div className={style.buyer}>
                                            <input className={style.buyerRadioBtn} type="radio" name="role" onChange={() => {
                                                createBuyerAccForm.setValue("role", "buyer");
                                                navigate("/login/create-account/buyer");
                                            }} />
                                            <div className={style.buyerContentWrapper}>
                                                <h2 className={style.buyerTitle}>Buyer</h2>
                                                <p className={style.buyerDesc}>Access over 200 million products from 200,000 suppliers</p>
                                            </div>
                                            <span className={style.buyerShoppingIconWarpper}><i className="pi pi-shopping-bag"></i></span>
                                        </div>
                                        <div className={style.seller}>
                                            <input className={style.sellerRadioBtn} type="radio" name="role" />
                                            <div className={style.sellerContentWrapper}>
                                                <h2 className={style.sellerTitle}>Seller</h2>
                                                <p className={style.sellerDesc}>Sell your products to 40 million business buyers worldwide</p>
                                            </div>
                                            <span className={style.sellerShoppingIconWarpper}><i className="pi pi-warehouse"></i></span>
                                        </div>
                                    </div>
                                    <button>Continue</button>
                                </form>
                                <div className={style.BackLink}>
                                    <span>Already have an account? <span onClick={() => {
                                        navigate("/login/signIn")
                                    }} >Sign in</span></span>
                                </div>
                            </div>
                        )}
                        {
                            search.pathname === "/login/create-account/buyer" && (
                                <div className={style.buyerSignIn}>
                                    <h1>Create account</h1>
                                    <form className={style.buyerSignInForm} onSubmit={createBuyerAccForm.handleSubmit(handleCreatebuyerAccount)}>
                                        {createBuyerAccForm.formState.errors.role && (<span className={style.error}>{createBuyerAccForm.formState.errors.role.message}</span>)}
                                        <input type="text" placeholder="Enter your name" {...createBuyerAccForm.register("name")} />
                                        {createBuyerAccForm.formState.errors.name && (<span className={style.error}>{createBuyerAccForm.formState.errors.name.message}</span>)}
                                        <input type="email" placeholder="Enter your email" {...createBuyerAccForm.register("email")} />
                                        {createBuyerAccForm.formState.errors.email && (<span className={style.error}>{createBuyerAccForm.formState.errors.email.message}</span>)}
                                        <input type="text" placeholder="Enter your city" {...createBuyerAccForm.register("city")} />
                                        {createBuyerAccForm.formState.errors.city && (<span className={style.error}>{createBuyerAccForm.formState.errors.city.message}</span>)}
                                        {/* <input type="password" placeholder="Enter your password" {...createBuyerAccForm.register("password")} /> */}
                                        <div className={style.passwordWrapper}>
                                            <input type={showPassword ? "text" : "password"} placeholder='Enter Your Pasword' {...createBuyerAccForm.register("password")} />
                                            <button type="button" className={style.passwordToggle} onClick={() => setShowPassword(prev => !prev)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}>
                                                <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`} />
                                            </button>
                                        </div>
                                        {createBuyerAccForm.formState.errors.password && (<span className={style.error}>{createBuyerAccForm.formState.errors.password.message}</span>)}
                                        <Controller
                                            name="phone"
                                            control={createBuyerAccForm.control}
                                            render={({ field }) => (
                                                <PhoneInput
                                                    country="pk"
                                                    value={field.value}
                                                    onChange={(value, country) => {
                                                        field.onChange(value)
                                                        createBuyerAccForm.setValue(
                                                            "country",
                                                            country.name
                                                        )
                                                        createBuyerAccForm.setValue(
                                                            "dialCode",
                                                            country.dialCode
                                                        )
                                                        createBuyerAccForm.setValue(
                                                            "countryCode",
                                                            country.countryCode
                                                        )
                                                    }}
                                                    containerClass={style.phoneContainer}
                                                    inputClass={style.phoneInput}
                                                    buttonClass={style.countryButton}
                                                    dropdownClass={style.countryDropdown}
                                                />
                                            )}
                                        />
                                        {createBuyerAccForm.formState.errors.phone && (<span className={style.error}>{createBuyerAccForm.formState.errors.phone.message}</span>)}
                                        <button type="submit">Continue</button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Loginpage
