import LayoutAdmin from "../LayoutAdmin";
import useHabitaciones from "../hooks/useHabitaciones";
import { useState, useEffect } from "react";
import config from "../config.json";
import axios from "axios";
import Alert from "../Alert";
import Resultado from "./Resultado";
import { Link } from "react-router-dom";
function HabitacionesAdmin() {
    const [alert, setAlert] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [image, setImage] = useState('');
    const {habitaciones, reload} = useHabitaciones();
    useEffect(() => {
        console.log(habitaciones);
    }, [habitaciones]);
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
    const [imageFile, setImageFile] = useState(null); // Variable para almacenar el archivo de imagen
    const crearHabitacion = async () => {
        try {
            openAlert("Creando habitación", "Espere un momento por favor", "loading", null);
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('cantidad', cantidad);
            formData.append('precio', precio);
            formData.append('imagen', imageFile);
            const response = await axios.post(`${config.endpoint}/habitacion`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            });
            if(response.data.success === true){
                openAlert("Habitación creada", "La habitación se ha creado correctamente", "success", null);
                reload();
            }else{
                openAlert("Error al crear la habitación", "No se pudo crear la habitación", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Error al crear la habitación", "No se pudo crear la habitación", "error", null);
            }else if(error.response !== undefined && error.response.status === 403){
                console.log(error);
                openAlert("Error al crear la habitación", "No se pudo crear la habitación", "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
                console.log(error);
            }
        }
    }
    return (
    <LayoutAdmin frase="Administración de las habitaciones">
        <div className="resultados">
            <h2 className="subtitulo">Habitaciones creadas</h2>
            {
                habitaciones.map((habitacion, index) => (
                    <Resultado  titulo={habitacion.titulo} 
                    contenido={
                        <>
                            <p>{habitacion.descripcion}</p>
                            <p>Cantidad: {habitacion.cantidad}</p>
                            <p>Precio ${habitacion.precio}</p>
                            <img src={`${config.endpointImage}/${habitacion.imagen}`} alt="" />
                            <Link to={`reservaciones/${habitacion._id}`} className="ver-mas">Ver reservaciones</Link>
                        </>
                    } tipo="habitacion" id={habitacion._id} reload={()=>reload()}
                    key={index}
                    />
                ))
            }
        </div>
        <form action="">
            <h2 className="subtitulo">Crear habitación</h2>
            <label htmlFor="titulo">Título</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            <label htmlFor="descripcion">Descripción</label>
            <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            <label htmlFor="cantidad">Cantidad</label>
            <input type="number" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
            <label htmlFor="precio">Precio</label>
            <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
            {
                image && <img src={image} alt="Preview" style={{ maxWidth: '90%' }} />
            }
            <label htmlFor="fileAdjuntPublication" id="btnArchivo" className="ver-mas">{imageFile ? 'Cambiar':'Seleccionar'} imagen</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file" id="fileAdjuntPublication"/>
            <button type="button" className="ver-mas" onClick={()=>crearHabitacion()}>Crear habitacion</button>
        </form>
        <Alert 
            isOpen={alertOpen} 
            title={alert ? alert.title : ""} 
            message={alert ? alert.message : ""} 
            kind={alert ? alert.kind : ""} 
            closeAlert={closeAlert} 
            redirectRoute={alert ? alert.redirectRoute : ""}
        />
    </LayoutAdmin>);
}

export default HabitacionesAdmin;