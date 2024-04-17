import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config.json';
function usePlatillo(idPlatillo) {
    const [platillo, setPlatillo] = useState([]);
    
    const getPlatillo = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/platillo/${idPlatillo}`);
        if(response.data.success){
            console.log(response.data.platillo);
            setPlatillo(response.data.platillo);
        }else{
            setPlatillo([]);
        }
    }, [])
    useEffect(() => {
        getPlatillo()
    }, [getPlatillo])
    return {platillo, reload: getPlatillo};
}

export default usePlatillo;