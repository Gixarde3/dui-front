import Nav from "./Nav";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "./css/reset.css";
import "./css/app.css";
import "./css/forms.css"
function LayoutPrincipal(props) {
    return (
        <>
            <Nav titulo={props.titulo} frase={props.frase}/>
            <main>
                {props.children}
            </main>
            <Tooltip id="tooltip"></Tooltip>
            <Footer esHome={props.esHome}/>
        </>
    )}

export default LayoutPrincipal;