import { setUser, setLoading, setError } from "../state/auth.slice";
import { register, login } from "../service/auth.api";
import { useDispatch } from "react-redux";



export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({ email, contact, password, fullname, role }) {
        const data = await register({ email, contact, password, fullname, role });
        console.log(data)
        dispatch(setUser(data.user))
    }
    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        dispatch(setUser(data.user))
    }


    return {
        handleRegister,
        handleLogin
    }

}