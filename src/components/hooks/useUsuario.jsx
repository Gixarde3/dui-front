import { useState, useEffect, useCallback } from 'react';
import config from '../config.json';
import axios from 'axios';
function useUsuario(idUsuario) {
    const [usuario, setUsuario] = useState(null);
    const getUsuarios = useCallback(async () => {
        const response = await axios.get(`${config.endpoint}/usuario/${idUsuario}`);
        if(response.data.success){
            setUsuario(response.data.usuario);
        }else{
            setUsuario(null);
        }
    }, [])
    useEffect(() => {
        getUsuarios()
    }, [getUsuarios])
    return {usuario, reload: getUsuarios};
}

export default useUsuario;