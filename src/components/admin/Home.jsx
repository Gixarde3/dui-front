import LayoutAdmin from "../LayoutAdmin";

function HomeAdmin() {
    return (
        <LayoutAdmin frase="Bienvenido a la administración de la tienda">
            <h1>Panel de administración</h1>
            <p>Desde aquí puedes gestionar los productos de la tienda</p>
        </LayoutAdmin>
    );
}

export default HomeAdmin;