import useReservaciones from "../hooks/useReservaciones";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../config.json";
import axios from "axios";
import Alert from "../Alert";
import Resultado from "./Resultado";
import { Link } from "react-router-dom";
import LayoutAdmin from "../LayoutAdmin";
function Reservaciones() {
    const { id } = useParams();
    const { reservaciones, reload } = useReservaciones(id);
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
        console.log(reservaciones);
    }, [reservaciones]);
    return (
        <LayoutAdmin frase="Reservaciones de habitación">
            {
                reservaciones.map((reservacion, index) => {
                    return (
                        <Resultado
                            key={index}
                            titulo={`${reservacion.habitacion.titulo} - ${reservacion.fecha_inicio} - ${reservacion.fecha_fin}`}
                            contenido={
                                <div>
                                    <p>Fecha de inicio: {reservacion.fecha_inicio}</p>
                                    <p>Fecha de finalización: {reservacion.fecha_fin}</p>
                                    <p>Hecha por: {reservacion.usuario.username}</p>
                                    <p>Habitación: {reservacion.habitacion.titulo}</p>
                                </div>
                            }
                            tipo="reservacion"
                            id={reservacion.id}
                            reload={reload}
                        />
                    )
                })
            }
            <Alert 
                isOpen={alertOpen} 
                title={alert ? alert.title : ""} 
                message={alert ? alert.message : ""} 
                kind={alert ? alert.kind : ""} 
                closeAlert={closeAlert} 
                redirectRoute={alert ? alert.redirectRoute : ""}
            />
        </LayoutAdmin>
    );
}

export default Reservaciones;