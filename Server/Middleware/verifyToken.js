import jwt from "jsonwebtoken"
export function verify(req, res, next) {
    try {

        const authheader = req.headers.authorization
        if (!authheader) {
            return res.status(401).json({
                message: "no token found"
            })
        }
        const token = authheader.split("")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,

        )
        req.user = decoded
        next()
    } catch (error) {
        return res.status().json({
            message: error.message
        })
    }
}