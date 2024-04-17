
import LayoutAdmin from "../LayoutAdmin";
import usePlatillo from "../hooks/usePlatillo";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import { useEffect, useState } from "react";
import Alert from "../Alert";

function EditarPlatillo() {
    const { id } = useParams();
    const { platillo, reload } = usePlatillo(id);
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

    const editarPlatillo = async () => {
        try {
            openAlert("Creando platillo", "Espere un momento por favor", "loading", null);
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            imagenFile && formData.append('imagen', imagenFile);
            const response = await axios.post(`${config.endpoint}/platillo/editar/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if(response.data.success === true){
                openAlert("Platillo editado", "El platillo se ha editado correctamente", "success", null);
                reload();
            }else{
                openAlert("Error al editar el platillo", "No se pudo editar el platillo", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Error al editar el platillo", "No se pudo editar el platillo", "error", null);
            }else{
                openAlert("Error al editar el platillo", "Ocurrió un error inesperado al editar el platillo", "error", null);
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

    useEffect(() => {
        if(platillo){
            setTitulo(platillo.titulo);
            setDescripcion(platillo.descripcion);
            setPrecio(platillo.precio);
            setImagen(`${config.endpointImage}/${platillo.imagen}`);
        }
    }, [platillo]);
    return (
        <LayoutAdmin frase="Editar platillo">
            <form action="">
                <h2 className="subtitulo">Editar platillo</h2>
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <label htmlFor="precio">Precio</label>
                <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                {
                    imagen && <img src={imagen} alt="Preview" style={{ maxWidth: '90%' }} />
                }
                <label htmlFor="fileAdjuntPublication" id="btnArchivo" className="ver-mas">Cambiar imagen</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="file" id="fileAdjuntPublication" />
                <button type="button" className="ver-mas" onClick={() => editarPlatillo()}>Editar platillo</button>
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

export default EditarPlatillo;