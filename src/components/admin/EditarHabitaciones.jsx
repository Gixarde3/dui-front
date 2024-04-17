
import LayoutAdmin from "../LayoutAdmin";
import useHabitacion from "../hooks/useHabitacion";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import { useEffect, useState } from "react";
import Alert from "../Alert";
function EditarHabitaciones() {
    const {id} = useParams();
    const {habitacion, reload} = useHabitacion(id);
    const [titulo, setTitulo] = useState(habitacion.titulo);
    const [descripcion, setDescripcion] = useState(habitacion.descripcion);
    const [cantidad, setCantidad] = useState(habitacion.cantidad);
    const [precio, setPrecio] = useState(habitacion.precio);
    const [image, setImage] = useState(habitacion.imagen);
    const [imageFile, setImageFile] = useState(null);
    const [alert, setAlert] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        setTitulo(habitacion.titulo);
        setDescripcion(habitacion.descripcion);
        setCantidad(habitacion.cantidad);
        setPrecio(habitacion.precio);
        setImage(`${config.endpointImage}/${habitacion.imagen}`);
    }, [habitacion]);
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const handleImageUpload = (e) => {
        try{
            const selectedImage = e.target.files[0];
            setImageFile(e.target.files[0]);
            setImage(URL.createObjectURL(selectedImage));
        }catch(error){
            openAlert("Error al subir la imagen", "Ocurrió un error inesperado al subir la imagen", "error", null);
        }
    };
    const editarHabitacion = async () => {
        try {
            openAlert("Editando habitación", "Espere un momento por favor", "loading", null);
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('cantidad', cantidad);
            formData.append('precio', precio);
            imagenFile && formData.append('imagen', imageFile);
            const response = await axios.post(`${config.endpoint}/habitacion/editar/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            });
            if(response.data.success === true){
                openAlert("Habitación editada", "La habitación se ha editado correctamente", "success", "/admin/habitaciones");
            }else{
                openAlert("Error al editar la habitación", "No se pudo editar la habitación", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Error al editar la habitación", "No se pudo editar la habitación", "error", null);
            }else if(error.response !== undefined && error.response.status === 403){
                console.log(error);
                openAlert("Error al editar la habitación", "No se pudo editar la habitación", "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
                console.log(error);
            }
        }
    }
    return (
        <LayoutAdmin frase="Editar habitación">
            <form action="">
            <h2 className="subtitulo">Editar habitación</h2>
            <label htmlFor="titulo">Título</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            <label htmlFor="descripcion">Descripción</label>
            <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            <label htmlFor="cantidad">Cantidad</label>
            <input type="number" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
            <label htmlFor="precio">Precio</label>
            <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
            {
                image && <img src={`${image}`} alt="Preview" style={{ maxWidth: '90%' }} />
            }
            <label htmlFor="fileAdjuntPublication" id="btnArchivo" className="ver-mas">Cambiar imagen</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file" id="fileAdjuntPublication"/>
            <button type="button" className="ver-mas" onClick={()=>editarHabitacion()}>Editar habitacion</button>
        </form>
        <Alert 
            isOpen={alertOpen} 
            title={alert ? alert.title : ""} 
            message={alert ? alert.message : ""} 
            kind={alert ? alert.kind : ""} 
            closeAlert={closeAlert} 
            redirectRoute={alert ? alert.redirectRoute : ""}
        />
        </LayoutAdmin>
    );
}

export default EditarHabitaciones;