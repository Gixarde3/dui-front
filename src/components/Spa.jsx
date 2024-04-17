import LayoutPrincipal from "./LayoutPrincipal";
function Spa() {
    return (
        <LayoutPrincipal titulo="spa" frase="Tu oásis de tranquilidad">
            <div class="horizontal">
                <div class="ritual">
                    <p>Durante décadas, Tepoztlán ha sido un polo magnético para el desarrollo espiritual y la conciencia. Muchos consideran que la energía de este pueblo mágico de Morelos se debe a las características de su subsuelo, así como a las imponentes montañas de la cordillera de El Tepozteco, que invitan a la introspección y al descubrimiento.</p>
                    <img src="/img/img-ritual-1.png" alt="Ritual 1"/>
                </div>
                <div class="ritual">
                    <p>La vitalidad de la tierra sobre la que se construyó este hotel spa en Tepoztlán contribuye a que nuestros invitados regeneren su energía. Nuestras terapias, ceremonias, baños, limpias, temazcales, clases de yoga y de artes energéticas te llevarán a sentir los beneficios energéticos de este lugar místico. 🌿🌅🌟</p>
                    <img src="/img/img-ritual-2.png" alt="Ritual 2"/>
                </div>
            </div>
            <h2 class="subtitulo">Masajes y rituales</h2>
            <div class="ritual">
                <p>Deja que tu espíritu sea el guía de tu cuerpo al elegir un tratamiento en nuestro spa en Tepoztlán. El ritual empieza al pisar el hermoso camino empedrado, escondido entre la exuberante vegetación, hasta llegar a nuestras cabinas, que están integradas a la naturaleza y junto a una corriente de agua. 🌿💧🌸</p>
                <img src="/img/img-ritual-3.png" alt="Ritual 3"/>
                <button class="ver-mas">Ver más</button>
            </div>
            <h2 class="subtitulo">Temazcal</h2>
            <div class="ritual">
                <p>Deja que tu espíritu sea el guía de tu cuerpo al elegir un tratamiento en nuestro spa en Tepoztlán. El ritual empieza al pisar el hermoso camino empedrado, escondido entre la exuberante vegetación, hasta llegar a nuestras cabinas, que están integradas a la naturaleza y junto a una corriente de agua. 🌿💧🌸</p>
                <img src="/img/img-ritual-4.png" alt="Ritual 4"/>
                <button class="ver-mas">Ver más</button>
            </div>
            <h2 class="subtitulo">Contamos con</h2>
            <div class="ritual" id="contamos-con">
                <ul>
                    <li>
                        <strong>Cabinas de tratamiento individual</strong> para terapias físicas, de cosmiatría y rituales tepoztecos.
                    </li> 
                    <li><strong>Cabina para exfoliaciones y envolventes</strong>.
                    </li> <li><strong>Temazcal de inspiración prehispánica</strong>.</li> 
                    <li><strong>Área de regaderas</strong>.</li> <li><strong>Vapor</strong>.</li> 
                    <li><strong>Jacuzzi</strong>.</li> 
                </ul> 
                <p class="bold">ADEMÁS, AMOMOXTLI CUENTA CON:</p> 
                <ul> 
                    <li><strong>Mandala para disciplinas de yoga y artes energéticas</strong>.</li> 
                    <li><strong>Tapetes</strong>.</li> <li><strong>Actualización sobre COVID-19</strong>.</li> 
                </ul>
            </div>
        </LayoutPrincipal>
    );
}

export default Spa;