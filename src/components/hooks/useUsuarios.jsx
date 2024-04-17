import { useState, useEffect, useCallback } from 'react';
import config from '../config.json';
import axios from 'axios';
function useUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const getUsuarios = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/usuarios`);
        if(response.data.success){
            setUsuarios(response.data.usuarios);
        }else{
            setUsuarios([]);
        }
    }, [])
    useEffect(() => {
        getUsuarios()
    }, [getUsuarios])
    return {usuarios, reload: getUsuarios};
}

export default useUsuarios;