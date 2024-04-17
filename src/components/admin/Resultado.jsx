
import { Tooltip } from "react-tooltip";
import Alert from "../Alert";
import { useState } from "react";
import axios from "axios";
import config from "../config.json";
import "../css/resultado.css";
import { useNavigate } from "react-router-dom";
function Resultado({titulo, contenido, tipo, id, reload}) {
    const endpointLocal = config.endpointLocal;
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const askDelete = () => {
        openAlert("Eliminar publicación", "¿Está seguro que desea eliminar este resultado?", "question", null, true, deleteResult);
    }
    const deleteResult = async() => {
        openAlert("Eliminando publicación", "Espere un momento por favor", "loading", null);
        const response = await axios.delete(`${config.endpoint}/${tipo}/eliminar/${id}`);
        if(response.data.success){
            openAlert("Publicación eliminada", "El resultado ha sido eliminado correctamente", "success", null, false, null);
            reload();
            
        }else{
            openAlert("Error al eliminar", "No se pudo eliminar el resultado", "error", null);
        }
    }
    return (
        <div className="resultado">
            <div className="buttons">
            <button type="button" className="btn-admin editar" onClick={()=>{navigate(`editar/${id}`)}}
                    data-tooltip-id="tooltip-res"
                    data-tooltip-content="Editar resultado"
                    data-tooltip-place="top"
                >
                    <img src={`${endpointLocal}/img/edit.png`} alt="Icono editar" />
                </button>
                <button type="button" className="btn-admin eliminar"
                    data-tooltip-id="tooltip-res"
                    data-tooltip-content="Eliminar resultado"
                    data-tooltip-place="top"
                    onClick={()=>askDelete()}
                >
                    <img src={`${endpointLocal}/img/close.webp`} alt="Icono eliminar" />
                </button>
            </div>
            <h3>{titulo}</h3>
            <div className="res">
                {contenido}
            </div>
            <Tooltip id="tooltip-res"></Tooltip>
            <Alert
                isOpen={alertOpen}
                closeAlert={closeAlert}
                title={alert ? alert.title : ''}
                message={alert ? alert.message : ''}
                kind = {alert ? alert.kind : ''}
                redirectRoute={alert ? alert.redirectRoute : ''}
                asking = {alert ? alert.asking : ''}
                onAccept={alert ? () => alert.onAccept() : () => console.log('')}
            />
        </div>
    );
}

export default Resultado;