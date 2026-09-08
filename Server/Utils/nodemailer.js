import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
export async function sendEmail(to, subject, otp) {
    try {
        await transporter.sendMail({
            from: `CityStore-Site <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: `
                    <h2>Password Reset Otp</h2>
                    <p>Your OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP expires in 10 minutes.</p>
                `
        })
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }

}




























// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// export async function sendEmail(to, subject, text) {
//     try {
//         await transporter.sendMail({
//             from: `CityStore-Site <${process.env.EMAIL_USER}>`,
//             to: user.email,
//             subject: "password reset OTP ",
//             html: `
//         <h2>Password Reset</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP expires in 10 minutes.</p>
//     `
//         });

//         console.log("Email sent successfully");
//     } catch (error) {
//         console.error("Email sending failed:", error);
//         throw error;
//     }
// }