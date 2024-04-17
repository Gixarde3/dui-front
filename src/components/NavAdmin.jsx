import config from './config.json';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function NavAdmin({frase}) {
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove("sesion");
        Cookies.remove("username");
        Cookies.remove("tipoUsuario");
        navigate("/login");
    }
    if(!Cookies.get("sesion") || Cookies.get("tipoUsuario") != "2"){
        navigate("/login");
    }
    return (
    <>
        <header>
        <div id="logo">
            <img src={config.endpointLocal + `/img/logo.jpeg`} alt="Logo de DUI"/>
        </div>
        <nav>
            <Link to="/">DUI</Link>
            <Link to="/admin/habitaciones">Habitaciones</Link>
            <Link to="/admin/cocina">Cocina</Link>
            <Link to="/admin/usuarios">Usuarios</Link>
            {Cookies.get("username")  ? <Link onClick={() => logout()}>{Cookies.get("username")} -  logout</Link> : <Link to="/login">Inicio de sesión</Link> }
        </nav>
    </header>
    <article className={`img-principal`} id={`admin-img`}>
            <h2 id="frase">{frase}</h2>
    </article>
    </>);
}

export default NavAdmin;