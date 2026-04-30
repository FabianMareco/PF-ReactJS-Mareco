import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import "../styles/global.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-danger bg-danger flex-wrap flex-row container-fluid">
      <div className="container-fluid d-flex justify-content-sm-center">
        <Link className="navbar-brand" to="/">MUEVETE <p id="subdescripcion-logo">educacion del movimiento sin limites</p></Link>
        <img className="img-logo img-fluid" src="/multimedia/K.png" alt="logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">INICIO</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">NOSOTROS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/clases">CLASES</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contactanos">CONTACTANOS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/merchandising">MERCHANDISING</Link></li>
            <li className="nav-item"><Link className="btn btn-success" to="/ingreso">INGRESO A PLATAFORMA</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;