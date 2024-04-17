import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Habitaciones from "./components/Habitaciones";
import Cocina from "./components/Cocina";
import Spa from "./components/Spa";
import Login from "./components/Login";
import HomeAdmin from "./components/admin/Home";
import Registrar from "./components/Registrar";
import HabitacionesAdmin from "./components/admin/HabitacionesAdmin";
import EditarHabitaciones from "./components/admin/EditarHabitaciones";
import Reservaciones from "./components/admin/Reservaciones";
import EditarReservacion from "./components/admin/EditarReservaciones";
import Usuarios from "./components/admin/Usuarios";
import EditarUsuario from "./components/admin/EditarUsuario";
import CocinaAdmin from "./components/admin/CocinaAdmin";
import EditarPlatillo from "./components/admin/EditarPlatillo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="habitaciones" element={<Habitaciones/>}/>
          <Route path="registrarse" element={
            <Registrar/>  
          }/>
          <Route path="cocina" element={<Cocina/>}/>
          <Route path="spa" element={<Spa/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="admin">
            <Route index element={<HomeAdmin/>}/>
            <Route path="habitaciones">
              <Route index element={<HabitacionesAdmin/>}/>
              <Route path="reservaciones/:id">
                <Route index element={<Reservaciones />}/>
                <Route path="editar/:id" element={<EditarReservacion/>}/>
              </Route>
              <Route path="editar/:id" element={<EditarHabitaciones/>}/>
            </Route>
            <Route path="cocina">
              <Route index element={<CocinaAdmin/>}/>
              <Route path="editar/:id" element={<EditarPlatillo/>}/>
            </Route>
            <Route path="usuarios">
              <Route index element={<Usuarios/>}/>
              <Route path="editar/:id" element={<EditarUsuario/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
