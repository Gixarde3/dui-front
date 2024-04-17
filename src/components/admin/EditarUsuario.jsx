
import LayoutAdmin from "../LayoutAdmin";
import useUsuario from "../hooks/useUsuario";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import Cookies from "js-cookie";
function EditarUsuario() {
    const {id} = useParams();
    const {usuario, reload} = useUsuario(id);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const endpoint = config.endpoint;
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    useEffect(() => {
        if(usuario){
            if(usuario.username){
                setUsername(usuario.username);
            }
            if(usuario.email){
                setEmail(usuario.email);
            }
        }
    }, [usuario]);

    const editarUsuario = async () => {
        openAlert("Editando usuario", "Espere un momento por favor", "loading", null);
        const response = await axios.post(`${config.endpoint}/usuario/editar/${id}`, {
            username: username,
            email: email,
            password: password,
            sesion: Cookies.get("sesion")
        });
        if(response.data.success){
            openAlert("Usuario editado", "El usuario ha sido editado correctamente", "success", "/admin/usuarios");
        }else{
            openAlert("Error al editar", response.data.message, "error", null);
        }
    }
    return (
    <LayoutAdmin frase="Registrarse">
    <form>
        <div className={"inputForm "}>
            <label htmlFor="username"><img src="/img/user.png" alt="Icono de usuario" /></label>
            <input type="username" name="username" id="username" placeholder="Ingresa tu nombre de usuario" onChange={(event)=>(setUsername(event.target.value))} value={username} required/>
        </div>
        <div className={"inputForm "}>
            <label htmlFor="email"><img src="/img/user.png" alt="Icono de usuario" /></label>
            <input type="email" name="email" id="email" placeholder="Ingresa tu correo electrónico" onChange={(event)=>(setEmail(event.target.value))} value={email} required/>
        </div>
        <div className={"inputForm "}>
            <label htmlFor="username"><img src="/img/icon_pass.png" alt="Icono de contraseña" /></label>
            <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder="Ingresa tu contraseña" onChange={(event)=>(setPassword(event.target.value))}required/>
            <button type="button" onClick={() => (setShowPassword(!showPassword))}><img src={`/img/${showPassword ? "ver.png" : "no_ver.png"}`} alt="Icono para cambiar visibilidad" /></button>
        </div>
        <button onClick = { () => editarUsuario()} type="button" className="login">Registrarse</button>
    </form>
    <Alert 
        isOpen={alertOpen} 
        title={alert ? alert.title : ""} 
        message={alert ? alert.message : ""} 
        kind={alert ? alert.kind : ""} 
        closeAlert={closeAlert}
    />
</LayoutAdmin>);
}

export default EditarUsuario;