import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const Contactanos = () => {
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre  = e.target.nombre.value.trim();
    const email   = e.target.email.value.trim();
    const mensaje = e.target.mensaje.value.trim();
    if (!nombre || !email || !mensaje) {
      Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Por favor completá todos los campos.", confirmButtonColor: "#dc3545" });
      return;
    }
    if (!email.includes("@")) {
      Swal.fire({ icon: "error", title: "Email inválido", text: "Ingresá un email válido.", confirmButtonColor: "#dc3545" });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado! 💌",
      html: `<p>Gracias <strong>${nombre}</strong>, recibimos tu mensaje.</p><p>Te responderemos a <strong>${email}</strong> a la brevedad.</p>`,
      confirmButtonColor: "#28a745",
      confirmButtonText: "¡Perfecto!",
    });
    e.target.reset();
  };

  return (
    <>
      <div data-aos="fade-up" className="text-center mt-4"><h3>Contactanos</h3></div>
      <div className="contacto-container">
        <div className="row w-100 justify-content-center" data-aos="fade-down">
          <div className="col-md-5 mb-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="link-prefooter">Estamos para ayudarte</h4>
              <p>Si tenés dudas sobre nuestras clases, packs o cualquier consulta, escribinos y te responderemos a la brevedad.</p>
              <p><i className="fas fa-map-marker-alt"></i> Buenos Aires, Argentina</p>
              <p><i className="fas fa-envelope"></i> info@muevete.com</p>
              <p><i className="fas fa-phone"></i> +54 11 1234 5678</p>
            </div>
          </div>
          <div className="col-md-5">
            <form onSubmit={handleSubmit} className="form-contacto">
              <div className="item-contacto">
                <label htmlFor="nombre">Nombre completo</label>
                <input type="text" className="form-control" id="nombre" required />
              </div>
              <div className="item-contacto">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="item-contacto">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea className="form-control" id="mensaje" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-danger w-100">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer-edit bg-danger mt-5">
        <p className="texto-footer">Seguinos en nuestras redes sociales</p>
        <div className="redes">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.tiktok.com/es/" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a>
          <a href="https://es-la.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
        </div>
        <p className="texto-footer">todos los derechos reservados por copyright</p>
      </footer>
    </>
  );
};

export default Contactanos;
