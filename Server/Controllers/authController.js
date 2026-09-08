import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/nodemailer.js"

export async function registerBuyer(req, res) {
    try {
        const { name, email, city, password, phone, role, country, countryCode } = req.body
        // console.log("new", email)
        const isExist = await User.findOne({ email })
        if (isExist) {
            return res.status(409).json({
                email: "User already exist please login"
            })
        }
        const hashPass = await bcrypt.hash(
            password,
            10
        )
        const result = await User.create({
            name: name,
            email: email,
            city: city,
            phone: phone,
            country: country,
            countryCode: countryCode,
            role: role,
            password: hashPass

        })

        return res.status(200).json({
            message: "User registered",
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function signIn(req, res) {
    try {
        const { email, password } = req.body
        // console.log(loginData)
        const user = await User.findOne({ email })
        // console.log(user)
        if (!user) {
            return res.status(404).json({
                email: "user not exist please try again and tap continue"
            })
        }
        const matchPass = await bcrypt.compare(
            password,
            user.password
        )
        if (!matchPass) {
            return res.status(400).json({
                password: "invalid password"
            })
        }

        const accessToken = jwt.sign(

            {
                _id: user._id,
                role: user.role
            }
            ,
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        )
        const refreshToken = jwt.sign(

            {
                _id: user._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        )
        return res.status(200).json({
            message: "login successful",
            user,
            role: user.role,
            accessToken,
            refreshToken
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function forgetPass(req, res) {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(
            user.email,
            "Password Reset OTP",
            otp
        );

        return res.status(200).json({
            message: "otp send successfuly"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function verifyOtp(req, res) {
    try {
        const { email, otp } = req.body
        // console.log(email)
        const user = await User.findOne({ email })
        // console.log(user)
        if (!email) {
            return res.status(404).json({
                message: "email not found"
            })
        }
        if (otp !== user.resetOtp) {
            return res.status(400).json({
                OtpError: "invalid Otp"
            })
        }
        if (Date.now() > user.otpExpireIn) {
            return res.status(401).json({
                message: "otp expired"
            })
        }
        return res.status(200).json({
            message: "otp verified"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function ResetPassword(req, res) {
    try {
        const { password, email } = req.body
        // console.log(email)
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        const isSamePass = await bcrypt.compare(password, user.password)
        if (isSamePass) {
            return res.status(409).json({
                password: "Old password please type New one"
            })
        }
        const hashPass = await bcrypt.hash(
            password,
            10
        )
        user.password = hashPass
        user.resetOtp = null
        user.resetOtpExpires = null
        await user.save()
        return res.status(200).json({
            message: "password changed"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(401).json({
                message: "refreshToken not found"
            })
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }
        const accessToken = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        return res.json({
            message: "new access token",
            accessToken
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user._id).select("-passowrd")
        return res.status(200).json({
            message: "user found",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}