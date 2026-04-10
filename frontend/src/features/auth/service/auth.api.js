import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/user",
    withCredentials: true,
})


export async function register({ email, contact, password, fullname, role }) {

    console.log(email, contact, password, fullname, role)
    const response = await authApiInstance.post("/register", {
        email,
        contact,
        password,
        fullname,
        role
    })
    console.log(response)

    return response.data
}

export async function login({ email, password }) {
    const response = await authApiInstance.post("/login", {
        email,
        password
    })
    return response.data
}