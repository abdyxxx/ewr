import { useDispatch } from "react-redux"
import { setAuth } from "../redux/actions"

export default function Header(){
    const dispatch = useDispatch()
    function logout(){
        sessionStorage.clear()
        dispatch(setAuth(false));
    }
    return(
        <header>
            <h1 className="title">
                MyWeather
            </h1>
            <button onClick={logout} className="switch-button">
                Выйти
            </button>
        </header>
    )
}