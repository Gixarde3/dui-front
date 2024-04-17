import LayoutPrincipal from "./LayoutPrincipal";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "./config.json"
import Alert from "./Alert";
import axios from "axios";
import Cookies from "js-cookie";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        openAlert("Iniciando sesión", "Espere un momento por favor", "loading");
        const data = {
            username: username,
            password: password,
        };
        try{
            const response = await axios.post(`${endpoint}/login`, data);
            if(response.data.success === true){
                console.log(response.data);
                Cookies.set("sesion", response.data.sesion);
                Cookies.set("username", response.data.username);
                Cookies.set("tipoUsuario", response.data.tipoUsuario);
                closeAlert();
                if(response.data.tipoUsuario == "2"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
            }else{
                openAlert("Inicio de sesión fallido", "Los datos ingresados no son correctos, prueba con otra contraseña o usuario.", "error", null);
            }
        }catch(error){
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Inicio de sesión fallido", "Los datos ingresados no son correctos, prueba con otra contraseña o usuario.", "error", null);
            }else if(error.response !== undefined && error.response.status === 403){
                console.log(error);
                openAlert("Inicio de sesión fallido", "No tienes permisos para acceder a esta página: " + error.response.data.error, "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
                console.log(error);
            }
        }
    }
    return (
        <LayoutPrincipal titulo="login" frase="Inicio de sesión">
            <form onSubmit={handleSubmit}>
                <div className={"inputForm "}>
                    <label htmlFor="username"><img src="/img/user.png" alt="Icono de usuario" /></label>
                    <input type="username" name="username" id="username" placeholder="Ingresa tu correo electrónico" onChange={(event)=>(setUsername(event.target.value))} required/>
                </div>
                <div className={"inputForm "}>
                    <label htmlFor="username"><img src="/img/icon_pass.png" alt="Icono de contraseña" /></label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder="Ingresa tu contraseña" onChange={(event)=>(setPassword(event.target.value))}required/>
                    <button type="button" onClick={() => (setShowPassword(!showPassword))}><img src={`/img/${showPassword ? "ver.png" : "no_ver.png"}`} alt="Icono para cambiar visibilidad" /></button>
                </div>
                <p>¿No tienes cuenta?<Link to="/registrarse">Regístrate</Link></p>
                <button className="login">Iniciar sesión</button>
            </form>
            <Alert 
                isOpen={alertOpen} 
                title={alert ? alert.title : ""} 
                message={alert ? alert.message : ""} 
                kind={alert ? alert.kind : ""} 
                closeAlert={closeAlert} 
                redirectRoute={alert ? alert.redirectRoute : ""}
            />
        </LayoutPrincipal>
    );
}

export default Login;