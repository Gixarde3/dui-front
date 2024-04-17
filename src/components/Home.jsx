import LayoutPrincipal from "./LayoutPrincipal";
import config from './config.json';
function Home() {
    return (
        <LayoutPrincipal titulo="principal" frase="Tu oásis de tranquilidad" esHome={true}>
            <article id="somos">
                <img src={`${config.endpointLocal}/img/spa_cuadro.png`} alt="Imagen del cuarto de Spá"/>
                <aside>
                    <h1>DUI</h1>
                    <p>Imagínate ante la puerta de DUI Spá</p>
                    <p>¿Qué secretos se guardarán tras ella?</p>
                    <p>Caminas entre árboles centenarios que abrazan a DUI Spá, pronto un refugio inolvidable de tu experiencia. Cruzas el umbral, revelando exuberantes jardines, una paleta de verdes entre la flora y las flores, tejiendo un oásis de bienestar</p>
                </aside>
            </article>
            <article id="slider">
                <ul className="slider">
                    <li id="slide1">
                    <img src={`${config.endpointLocal}/img/slider-1.png`} alt="Slider imagen 1"/>
                    </li>
                    <li id="slide2">
                        <img src={`${config.endpointLocal}/img/slider-2.png`} alt="Slider imagen 2"/>
                    </li>
                    <li id="slide3">
                        <img src={`${config.endpointLocal}/img/slider-3.png`} alt="Slider imagen 3"/>
                    </li>
                    <li id="slide4">
                        <img src={`${config.endpointLocal}/img/slider-4.png`} alt="Slider imagen "/>
                    </li>
                </ul>
                <ul className="menu">
                    <li>
                        <a href="#slide1">1</a>
                    </li>
                    <li>
                        <a href="#slide2">2</a>
                    </li>
                    <li>
                        <a href="#slide3">3</a>
                    </li>
                    <li>
                        <a href="#slide4">4</a>
                    </li>
                </ul>
            </article>
            <article id="spa">
                <h2>SPÁ</h2>
                <img src={`${config.endpointLocal}/img/spa-bottom.png`} alt="Imagen del spá"/>
            </article>
        </LayoutPrincipal>
    );
}

export default Home;