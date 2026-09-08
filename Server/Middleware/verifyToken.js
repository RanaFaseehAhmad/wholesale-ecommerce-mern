import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
    //  console.log("VERIFY TOKEN RUNNING");
    try {

        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                message: "Access token not provided"
            })
        }
        const accessToken = authHeader.split(" ")[1]

        const decode = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        )

        req.user = decode
        console.log(
            "USER:",
            req.user._id,
            "ROLE:",
            req.user.role,
            "REQUEST:",
            req.method,
            req.originalUrl
        );
        next()
    } catch (error) {
        // console.log(error)
        return res.status(401).json({
            message: error.message
        })
    }
}