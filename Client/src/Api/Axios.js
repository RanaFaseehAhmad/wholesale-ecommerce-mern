import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
});
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config

        console.log("FAILED URL:", originalRequest?.url);
        console.log("STATUS:", error.response?.status);
        console.log("ERROR DATA:", error.response?.data);
        if (originalRequest.url === "/auth/refresh") {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            return Promise.reject(error)
        }
        if (error.response.status === 401 &&
            localStorage.getItem("refreshToken") &&
            originalRequest.url !== "/auth/refresh" &&
            originalRequest.url !== "/auth/login" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            try {
                const refreshToken = localStorage.getItem("refreshToken")
                const response = await api.post("/auth/refresh", { refreshToken })
                const newAccessToken = response.data.accessToken
                localStorage.setItem("accessToken", newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
export default api