import LayoutPrincipal from "./LayoutPrincipal";
import Platillo from "./Platillo";
import usePlatillos from "./hooks/usePlatillos";
import { useState } from "react";
function Cocina() {
    const {platillos, reload} = usePlatillos();
    return (
        <LayoutPrincipal titulo="cocina" frase="Descubre los sabores de Tepoztlán">
            <h2 className="subtitulo">Nuestras opciones culinarias</h2>
            <ul>
                <li>MESA DE ORIGEN RESTAURANTE</li>
                <li>PISCINA Y POOL BAR</li>
                <li>ROOM SERVICE</li>
                <li>CENAS ROMÁNTICAS EN EL ESTANQUE</li>
                <li>COCTELES Y CENAS PRIVADAS EN MESA DE HOTEL</li>
            </ul>
            <article id="comidas">
                {platillos.map((platillo, index) => (
                    <Platillo titulo={platillo.titulo} descripcion={platillo.descripcion} imagen={platillo.imagen} precio = {platillo.precio} key={index}/>
                ))}
            </article>
        </LayoutPrincipal>
    )
}

export default Cocina;