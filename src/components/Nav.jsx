import config from './config.json';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function Nav({titulo, frase}) {
    const logout = () => {
        Cookies.remove("sesion");
        Cookies.remove("username");
        Cookies.remove("tipoUsuario");
        navigate("/");
    }
    return (
    <>
        <header>
        <div id="logo">
            <img src={config.endpointLocal + `/img/logo.jpeg`} alt="Logo de DUI"/>
        </div>
        <nav>
            <Link to="/">DUI</Link>
            <Link to="/habitaciones">Habitaciones</Link>
            <Link to="/cocina">Cocina</Link>
            <Link to="/spa">Spá</Link>
            {Cookies.get("tipoUsuario") == "2" ? <Link to="/admin">Admin</Link> : ""}
            {Cookies.get("username")  ? <Link onClick={() => logout()}>{Cookies.get("username")} -  logout</Link> : <Link to="/login">Inicio de sesión</Link> }
        </nav>
    </header>
    <article className={`img-principal`} id={`${titulo}-img`}>
            <h2 id="frase">{frase}</h2>
    </article>
    </>);
}

export default Nav;