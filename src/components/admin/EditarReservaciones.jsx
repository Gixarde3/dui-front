
import LayoutAdmin from "../LayoutAdmin";
import useReservacion from "../hooks/useReservacion";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import Cookies from "js-cookie";
function EditarReservacion() {
    const {id} = useParams();
    const {reservacion, reload} = useReservacion(id);
    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("");
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
    useEffect(() => {
        if(reservacion.fecha_inicio){
            setFechaInicio(reservacion.fecha_inicio);
        }
        if(reservacion.fecha_fin){
            setFechaFin(reservacion.fecha_fin);
        }
    }, [reservacion]);

    const editarReservacion = async () => {
        openAlert("Editando reservación", "Espere un momento por favor", "loading", null);
        const response = await axios.post(`${config.endpoint}/reservacion/editar/${id}`, {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            habitacion_id: reservacion.habitacion_id,
            sesion: Cookies.get("sesion")
        });
        if(response.data.success){
            openAlert("Reservación editada", "La reservación ha sido editada correctamente", "success", "/admin/habitaciones");
            
        }else{
            openAlert("Error al editar", response.data.message, "error", null);
        }
    };
    return (
        <LayoutAdmin frase="Editar reservación">
            <form>
                <label htmlFor="fecha_inicio">Fecha de inicio</label>
                <input type="date" id="fecha_inicio" name="fecha_inicio" value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <label htmlFor="fecha_fin">Fecha de fin</label>
                <input type="date" id="fecha_fin" name="fecha_fin" value={fecha_fin} onChange={(e) => setFechaFin(e.target.value)} />
                <button type="button" className="ver-mas" onClick={() => editarReservacion()}>Editar reservacion</button>
            </form>
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
        </LayoutAdmin>
    );
}

export default EditarReservacion;