import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config.json";
function useReservacion(idReservacion) {
    const [reservacion, setReservacion] = useState({});
    const getReservacion = useCallback( async (idReservacion) => {
        const response = await axios.get(`${config.endpoint}/reservacion/${idReservacion}`);
        if(response.data.success){
            setReservacion(response.data.reservacion);
        }else{
            setReservacion({});
        }
    }, []);
    useEffect(() => {
        getReservacion(idReservacion);
    }, [getReservacion]);
    return {reservacion, reload: getReservacion};
}

export default useReservacion;