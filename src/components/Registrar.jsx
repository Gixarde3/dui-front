import React from 'react';
import LayoutPrincipal from './LayoutPrincipal';
import axios from 'axios';
import config from './config.json';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert';
function Registrar() {
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email
        }
        try {
            openAlert("Registrando usuario", "Espere un momento por favor", "loading", null);
            const response = await axios.post(`${endpoint}/usuario`, data);
            if(response.data.success === true){
                openAlert("Registro exitoso", "El usuario se ha registrado correctamente", "success", "/login");
            }else{
                openAlert("Registro fallido", "No se pudo registrar el usuario", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Registro fallido", "No se pudo registrar el usuario", "error", null);
            }else if(error.response !== undefined && error.response.status === 403){
                console.log(error);
                openAlert("Registro fallido", "No se pudo registrar el usuario", "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
                console.log(error);
            }
        }
    }
    return (
        <LayoutPrincipal titulo="login" frase="Registrarse">
            <form onSubmit={handleSubmit}>
                <div className={"inputForm "}>
                    <label htmlFor="username"><img src="/img/user.png" alt="Icono de usuario" /></label>
                    <input type="username" name="username" id="username" placeholder="Ingresa tu nombre de usuario" onChange={(event)=>(setUsername(event.target.value))} required/>
                </div>
                <div className={"inputForm "}>
                    <label htmlFor="email"><img src="/img/user.png" alt="Icono de usuario" /></label>
                    <input type="email" name="email" id="email" placeholder="Ingresa tu correo electrónico" onChange={(event)=>(setEmail(event.target.value))} required/>
                </div>
                <div className={"inputForm "}>
                    <label htmlFor="username"><img src="/img/icon_pass.png" alt="Icono de contraseña" /></label>
                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder="Ingresa tu contraseña" onChange={(event)=>(setPassword(event.target.value))}required/>
                    <button type="button" onClick={() => (setShowPassword(!showPassword))}><img src={`/img/${showPassword ? "ver.png" : "no_ver.png"}`} alt="Icono para cambiar visibilidad" /></button>
                </div>
                <button className="login">Registrarse</button>
            </form>
            <Alert 
                isOpen={alertOpen} 
                title={alert ? alert.title : ""} 
                message={alert ? alert.message : ""} 
                kind={alert ? alert.kind : ""} 
                closeAlert={closeAlert}
            />
        </LayoutPrincipal>
    );
}

export default Registrar;