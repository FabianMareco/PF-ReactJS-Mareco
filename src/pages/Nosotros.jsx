import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Nosotros = () => {
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);
  return (
    <>
      <main>
        <br />
        <div data-aos="fade-up"><h3>Nuestra plataforma</h3><br /></div>
        <div data-aos="fade-down">
          <p className="texto-contenido">En MUEVETE, estamos convencidos de que el movimiento es para todos. No importa quién seas, dónde estés o cuál sea tu experiencia: queremos que descubras lo increíble que es conectar con tu cuerpo y disfrutar de una vida más activa.</p>
        </div>
        <br /><br />
        <div style={{ width: "90%", margin: "0 auto" }} data-aos="fade-up">
          <div className="row g-2 justify-content-center">
            {[11,12,13,14,15,16].map(num => (
              <div key={num} className="col-6 col-md-4 col-lg-2">
                <img
                  src={`/multimedia/bailar${num}.png`}
                  alt=""
                  className="img-fluid w-100 rounded"
                  style={{ objectFit: "cover", aspectRatio: "1/1" }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <br /><br />
      <footer className="footer-edit bg-danger">
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

export default Nosotros;
