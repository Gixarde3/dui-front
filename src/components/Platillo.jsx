import config from './config.json';
function Platillo({titulo, descripcion, imagen, precio}) {
    return (
    <>
        <div class="descripcion-comida">
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <p>Precio: ${precio}</p>
        </div>
        <img src={`${config.endpointImage}/${imagen}`} alt="Tipo de comida 3"/>
    </>);
}

export default Platillo;