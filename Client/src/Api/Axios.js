import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
});

// api.interceptors.request.use(
//     (config) => {
//         const accesstoken = localStorage.getItem("accesstoken")
//         if (token) {
//             config.headers.authorization = `Bearer ${accesstoken}`
//         }
//         (error) => {
//             return Promise.reject(error)
//         }
//         return config
//     }

// )

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config
//         if (originalRequest.url === "/auth/refresh") {
//             localStorage.removeItem("accessToken")
//             localStorage.removeItem("refreshToken")
//             console.log("You are logout please login again!")

//             return (error) => Promise.reject(error)
//         }
//         if (response.status === "401" &&
//             !originalRequest._retry &&
//             originalRequest.url !== "/auth/refresh" &&
//             originalRequest.url !== "/auth/login"
//         ) {
//             originalRequest._retry = true
//             try {
//                 const refreshToken = localStorage.getItem("refreshToken")
//                 const res = await api.post("/auth/refresh", { refreshToken })
//                 const newAccessToken = res.data.newAccessToken
//                 localStorage.setItem("newAccesstoken", res.data.newAccessToken)
//                 originalRequest.headers.authorization = `Bearer${newAccessToken}`
//                 return api(originalRequest)
//             } catch (refresherror) {
//                 console.log(reportError.response.data)
//                 localStorage.removeItem("accessToken")
//                 localStorage.removeItem("refreshToken")
//                 return Promise.reject(refresherror)

//             }
//         }
//         return Promise.reject(error)
//     }
// )
export default api