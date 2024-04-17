import NavAdmin from "./NavAdmin";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "./css/reset.css";
import "./css/app.css";
import "./css/forms.css"
import "./css/admin.css"
function LayoutAdmin(props) {
    return (
        <>
            <NavAdmin frase={props.frase}/>
            <main>
                {props.children}
            </main>
            <Tooltip id="tooltip"></Tooltip>
            <Footer esHome={props.esHome}/>
        </>
    )}

export default LayoutAdmin;