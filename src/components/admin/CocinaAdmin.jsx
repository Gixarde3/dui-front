import LayoutAdmin from "../LayoutAdmin";
import usePlatillos from "../hooks/usePlatillos";
import { useState, useEffect } from "react";
import config from "../config.json";
import axios from "axios";
import Alert from "../Alert";
import Resultado from "./Resultado";
import { Link } from "react-router-dom";
function CocinaAdmin() {
    const { platillos, reload } = usePlatillos();
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState();
    const [imagenFile, setImagenFile] = useState(null);

    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute });
        setAlertOpen(true);
    };
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const crearPlatillo = async () => {
        try {
            openAlert("Creando platillo", "Espere un momento por favor", "loading", null);
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('imagen', imagenFile);
            const response = await axios.post(`${config.endpoint}/platillo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if(response.data.success === true){
                openAlert("Platillo creado", "El platillo se ha creado correctamente", "success", null);
                reload();
            }else{
                openAlert("Error al crear el platillo", "No se pudo crear el platillo", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Error al crear el platillo", "No se pudo crear el platillo", "error", null);
            }else{
                openAlert("Error al crear el platillo", "Ocurrió un error inesperado al crear el platillo", "error", null);
            }
        }
    }
    const handleImageUpload = (e) => {
        try{
            const selectedImage = e.target.files[0];
            setImagenFile(e.target.files[0]);
            setImagen(URL.createObjectURL(selectedImage));
        }catch(error){
            openAlert("Error al subir la imagen", "Ocurrió un error inesperado al subir la imagen", "error", null);
            console.log(error);
        }
    };

    return (
        <LayoutAdmin frase="Gestión de platillos">
            <div className="results">
                <h2 className="subtitulo">Platillos creados</h2>
                {
                    platillos.map((platillo, index) => {
                        console.log(platillo);
                        return (
                            <Resultado
                                key={index}
                                titulo={platillo.titulo}
                                contenido={
                                    <>
                                        <p>Descripción: {platillo.descripcion}</p>
                                        <p>Precio: ${platillo.precio}</p>
                                        <img src={`${config.endpointImage}/${platillo.imagen}`} alt={platillo.titulo} />
                                    </>
                                }
                                tipo="platillo"
                                id={platillo._id}
                                reload={reload}
                            />
                        )
                    })
                }
            </div>
            <form action="">
                <h2 className="subtitulo">Crear platillo</h2>
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <label htmlFor="precio">Precio</label>
                <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                {
                    imagen && <img src={imagen} alt="Preview" style={{ maxWidth: '90%' }} />
                }
                <label htmlFor="fileAdjuntPublication" id="btnArchivo" className="ver-mas">{imagen ? 'Cambiar' : 'Seleccionar'} imagen</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="file" id="fileAdjuntPublication" />
                <button type="button" className="ver-mas" onClick={() => crearPlatillo()}>Crear platillo</button>
            </form>
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
        </LayoutAdmin>
    );
}

export default CocinaAdmin;