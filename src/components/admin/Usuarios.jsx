import useUsuarios from "../hooks/useUsuarios";
import { useState, useEffect } from "react";
import config from "../config.json";
import axios from "axios";
import Alert from "../Alert";
import Resultado from "./Resultado";
import LayoutAdmin from "../LayoutAdmin";
function Usuarios() {
    const {usuarios, reload} = useUsuarios();
    const [alert, setAlert] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute });
        setAlertOpen(true);
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const changeRole = async (id) => {
        openAlert("Cambiando rol", "Espere un momento por favor", "loading", null);
        const response = await axios.post(`${config.endpoint}/usuario/cambiar-rol/${id}`);
        if(response.data.success){
            openAlert("Rol cambiado", "El rol ha sido cambiado correctamente", "success", null);
            reload();
        }else{
            openAlert("Error al cambiar rol", "No se pudo cambiar el rol", "error", null);
        }
    }
    return (
    <LayoutAdmin frase="Usuarios">
        <div className="resultados">
        {
            usuarios.map((usuario, index) => {
                return (
                    <Resultado
                        key={index}
                        titulo={usuario.username}
                        contenido={
                            <>
                                <p>Nombre: {usuario.username}</p>
                                <p>Correo: {usuario.email}</p>
                                <p>Rol: {usuario.tipoUsuario == "2" ? "Administrador" : "Usuario común"}</p>
                                <button className="ver-mas" onClick={()=>changeRole(usuario._id)}>Cambiar rol</button>
                            </>
                        }
                        tipo="usuario"
                        id={usuario._id}
                        reload={reload}
                    />
                )
            })
        }
        </div>
        
        <Alert 
            isOpen={alertOpen} 
            title={alert ? alert.title : ""} 
            message={alert ? alert.message : ""} 
            kind={alert ? alert.kind : ""} 
            closeAlert={closeAlert} 
            redirectRoute={alert ? alert.redirectRoute : ""}
        />    
    </LayoutAdmin>);
}

export default Usuarios;