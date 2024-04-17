import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import config from "../config.json";
export default function useReservaciones(idHabitacion) {
    const [reservaciones, setReservaciones] = useState([]);
    const getReservaciones = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/reservaciones/${idHabitacion}`);
        console.log(`${config.endpoint}/reservaciones/${idHabitacion}`);
        console.log(response.data);
        if(response.data.success){
            setReservaciones(response.data.reservaciones);
        }else{
            setReservaciones([]);
        }
    }, []);
    useEffect(() => {
        getReservaciones();
    }, [getReservaciones]);
    return {reservaciones, reload: getReservaciones};
}