import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config.json';
function usePlatillos() {
    const [platillos, setPlatillos] = useState([]);
    
    const getPlatillos = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/platillos`);
        if(response.data.success){
            console.log(response.data.platillos);
            setPlatillos(response.data.platillos);
        }else{
            setPlatillos([]);
        }
    }, [])
    useEffect(() => {
        getPlatillos()
    }, [getPlatillos])
    return {platillos, reload: getPlatillos};
}

export default usePlatillos;