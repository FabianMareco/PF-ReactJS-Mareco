import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const IngresoPlataforma = () => {
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);
  const handleIngreso = (e) => {
    e.preventDefault();
    const email = e.target.usuario.value.trim();
    const password = e.target.password.value.trim();
    if (!email || !password) return alert("Completa usuario y contraseña.");
    if (!email.includes('@')) return alert("Email inválido.");
    alert("Funcionalidad de ingreso en desarrollo");
  };
  return (
    <>
      <div className="ingreso"><div data-aos="fade-up"><h3>Ingreso a la plataforma</h3></div><form className="form-ingreso" onSubmit={handleIngreso} data-aos="fade-down"><div className="item-contacto"><label htmlFor="usuario">USUARIO</label><input type="email" name="usuario" className="form-control" required /></div><div className="item-contacto"><label htmlFor="password">CONTRASEÑA</label><input type="password" name="password" className="form-control" required /></div><div className="form-check d-flex justify-content-center mb-3"><input className="form-check-input me-2" type="checkbox" id="recordar" /><label className="form-check-label" htmlFor="recordar">Recordarme la contraseña</label></div><div className="item-contacto"><button type="submit" className="btn btn-success w-100">INGRESAR</button><br /><br /><button type="button" className="btn btn-danger w-100">OLVIDÉ MI USUARIO/CONTRASEÑA</button><br /><br /><button type="button" className="btn btn-warning w-100">NUEVO USUARIO</button></div></form></div>
      <footer className="footer-edit bg-danger mt-5"><p className="texto-footer">Seguinos en nuestras redes sociales</p><div className="redes"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a><a href="https://www.tiktok.com/es/" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a><a href="https://es-la.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a></div><p className="texto-footer">todos los derechos reservados por copyright</p></footer>
    </>
  );
};

export default IngresoPlataforma;