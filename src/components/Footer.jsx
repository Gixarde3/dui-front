import config from './config.json';
import axios from 'axios';
import { useState } from 'react';
import Alert from './Alert';
function Footer({esHome}) {
    const [sugerencia, setSugerencia] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };
    const crearSugerencia = async () => {
        openAlert("Enviando sugerencia", "Espere un momento por favor", "loading", null);
        const response = await axios.post(`${config.endpoint}/sugerencia`, {
            nombre,
            email:correo,
            telefono,
            sugerencia
        });
        if(response.data.success){
            openAlert("Sugerencia enviada", "Gracias por tu sugerencia, la tomaremos en cuenta para mejorar nuestros servicios", "success", null);
        }
    }
    return (
        <footer>
            {esHome &&  
            <form style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <h2>Contáctanos</h2>
                <div className="data-labels">
                <textarea name="" id="" cols="30" rows="10" onChange={(event) => setSugerencia(event.target.value)}></textarea>
                    <div className="data">
                        <p>Ninguna de esta información se hará pública en ningún momento</p>
                        <input type="text" placeholder="Nombre" onChange={(event) => setNombre(event.target.value)}/>
                        <input type="text" placeholder="Correo" onChange={(event) => setCorreo(event.target.value)}/>
                        <input type="text" placeholder="Teléfono" onChange={(event) => setTelefono(event.target.value)}/>
                        <button type="button" value="Enviar" className="ver-mas" onClick={() => crearSugerencia()}> Enviar sugerencia</button>
                    </div>
                </div>
            </form>}
            <div id="social">
                <a href="https://www.facebook.com/dui" target="_blank"><img src={`${config.endpointLocal}/img/facebook.svg`} alt="Facebook"/></a>
                <a href="https://www.instagram.com/dui" target="_blank"><img src={`${config.endpointLocal}/img/whatsapp.svg`} alt="Instagram"/></a>
                <a href="https://www.twitter.com/dui" target="_blank"><img src={`${config.endpointLocal}/img/twitter.svg`} alt="Twitter"/></a>
            </div>
            <Alert 
                isOpen={alertOpen} 
                title={alert ? alert.title : ""} 
                message={alert ? alert.message : ""} 
                kind={alert ? alert.kind : ""} 
                closeAlert={closeAlert} 
                redirectRoute={alert ? alert.redirectRoute : ""}
            />
        </footer>
    );
}

export default Footer;