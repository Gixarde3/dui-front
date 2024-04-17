import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config.json";
function useHabitacion(idHabitacion) {
    const [habitacion, setHabitacion] = useState({});
    const getHabitacion = useCallback( async (idHabitacion) => {
        const response = await axios.get(`${config.endpoint}/habitacion/${idHabitacion}`);
        if(response.data.success){
            setHabitacion(response.data.habitacion);
        }else{
            setHabitacion({});
        }
    }, []);
    useEffect(() => {
        getHabitacion(idHabitacion);
    }, [getHabitacion]);
    return {habitacion, reload: getHabitacion};
}

export default useHabitacion;