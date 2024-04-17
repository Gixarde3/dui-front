import { useState, useEffect, useCallback } from 'react';
import config from '../config.json';
import axios from 'axios';
function useHabitaciones(){
    const [habitaciones, setHabitaciones] = useState([]);
    const getHabitaciones = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/habitaciones`);
        if(response.data.success){
            setHabitaciones(response.data.habitaciones);
        }else{
            setHabitaciones([]);
        }
    }, [])
    
    useEffect(() => {
        getHabitaciones()
    }, [getHabitaciones])

    return {habitaciones, reload: getHabitaciones};
}

export default useHabitaciones;