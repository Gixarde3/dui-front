import Habitacion from "./Habitacion";
import LayoutPrincipal from "./LayoutPrincipal";
import useHabitaciones from "./hooks/useHabitaciones";
function Habitaciones() {
    const {habitaciones, reload} = useHabitaciones();
    return (
    <LayoutPrincipal titulo="habitaciones" frase="Habitaciones" esHome={false}>
        <p className="bold">
            DUI, un encantador hotel boutique en Tepoztlán, fusiona la tradición local con el lujo contemporáneo. Cada habitación está diseñada para inspirar descanso y renovación. En DUI, la magia de Tepoztlán te espera en cada momento.
        </p>
        <h2 className="subtitulo">Premium</h2>
        <p>Tras los hermosos arcos, un bello jardín privado te conduce a tu habitación en DUI, donde podrás refugiarte para un descanso liberador. Las nuevas suites PREMIUM de DUI son espaciosas y elegantes, con áreas de descanso y decoración contemporánea inspirada en Tepoztlán. Ofrecen vistas parciales a la Sierra del Tepozteco y a los jardines de DUI, ya sea desde el patio o el balcón. 🌿🏞️🌅
        </p>
        <article id="habitaciones">
            <div className="habitacion">
                <h3>Premium King Size con Patio</h3>
                <img src="/img/habitacion-1.png" alt="Habitación 1"/>
            </div>
            <div className="habitacion">
                <h3>Premium King Size con Balcón</h3>
                <img src="/img/habitacion-2.png" alt="Habitación 2"/>
            </div>
            <div className="habitacion">
                <h3>Premium Doble con Patio</h3>
                <img src="/img/habitacion-3.png" alt="Habitación 3"/>
            </div>
            <div className="habitacion">
                <h3>Premium Doble con Patio</h3>
                <img src="/img/habitacion-4.png" alt="Habitación 4"/>
            </div>
            {habitaciones.map(habitacion => (
                <Habitacion titulo={habitacion.titulo} descripcion={habitacion.descripcion} imagen={habitacion.imagen} id={habitacion._id} reload={reload} precio={habitacion.precio} cantidad={habitacion.cantidad}/>
            ))}
        </article>
    </LayoutPrincipal>);
}

export default Habitaciones;