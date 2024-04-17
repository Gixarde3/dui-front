import config from "./config.json";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import axios from "axios";
function Habitacion({titulo, descripcion, imagen, cantidad, precio,  id, reload}) {
    const [fecha_inicio, setFechaInicio] = useState();
    const [fecha_fin, setFechaFin] = useState();

    const [alert, setAlert] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        console.log(fecha_inicio);
        console.log(fecha_fin);
    }, [fecha_inicio, fecha_fin]);
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const reservar = (id) => async () => {
        openAlert("Reservando habitación", "Espere un momento por favor", "loading", null);
        const response = await axios.post(`${config.endpoint}/reservacion`,{
            habitacion_id: id,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            sesion: Cookies.get("sesion")
        });
        if(response.data.success){
            console.log(response.data);
            openAlert("Reservación exitosa", "La habitación ha sido reservada correctamente", "success", null);
            reload();
        }else{
            openAlert("Error al reservar", "No se pudo reservar la habitación" + response.data.message, "error", null);
            console.log(response.data)
        }
    }
    return (
        <>
            <aside className="descripcion">
                <h3>{titulo}</h3>
                <p>
                    {descripcion}
                </p>
                <div className="buttons">
                    <button className="ver-mas"
                        onClick = {
                            () => {
                                openAlert("Ver información de la habitación", 
                                    <>
                                    <h3>{titulo}</h3>
                                        <p>{descripcion}</p>
                                        <p>Cantidad: {cantidad}</p>
                                        <p>Precio ${precio}</p>
                                        <img src={`${config.endpointImage}/${imagen}`} alt={`Habitación ${titulo}`} />
                                    </>
                                , "success", null, false, null);
                            }
                        }
                    >Ver más</button>
                    <button className="reservar" onClick = {
                        () => {
                            openAlert("Reservar habitación", 
                                <form>
                                    <label htmlFor="fecha_inicio">Fecha de inicio</label>
                                    <input type="date" id="fecha_inicio" name="fecha_inicio" value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)} />
                                    <label htmlFor="fecha_fin">Fecha de fin</label>
                                    <input type="date" id="fecha_fin" name="fecha_fin" value={fecha_fin} onChange={(e) => setFechaFin(e.target.value)} />
                                </form>
                            , "question", null, true, reservar(id));
                        }
                    }>Reservar</button>
                </div>
            </aside>
            <img src={`${config.endpointImage}/${imagen}`} alt="Habitación 6"/>
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
        </>
    );
}

export default Habitacion;