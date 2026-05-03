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
          <p className="texto-contenido">En MUEVETE, estamos convencidos de que el movimiento es para todos. No importa quién seas, dónde estés o cuál sea tu experiencia: queremos que descubras lo increíble que es conectar con tu cuerpo y disfrutar de una vida más activa. Nuestra misión es simple: crear un espacio virtual accesible y motivador donde cualquiera con conexión a internet pueda participar en clases de danza, yoga, stretching y muchas otras formas de movimiento. Queremos que las barreras desaparezcan, que te sientas libre de expresarte y que disfrutes todos los beneficios que trae mover el cuerpo. En nuestra plataforma, encontrarás un ambiente inclusivo y lleno de energía. Cada clase está liderada por profesionales apasionados que no solo conocen su disciplina a fondo, sino que también se dedican a acompañarte en tu camino, respetando tu ritmo y tus objetivos personales. ¿Quieres ser más flexible, fortalecer tu cuerpo, descubrir una nueva forma de expresarte o simplemente mantenerte activo? Estamos aquí para ayudarte en cada paso del camino. Sabemos que la constancia y la motivación pueden ser un desafío, por eso hemos construido una comunidad que estará ahí para impulsarte, inspirarte y recordarte que cada pequeño esfuerzo cuenta. Ya sea que estés dando tus primeros pasos en el movimiento o que tengas años de experiencia, este es un espacio hecho para ti. Aquí encontrarás la guía y el apoyo que necesitas para que tu práctica sea placentera y significativa. No necesitas más que tus ganas, una conexión a internet y un momento para dedicarte a ti. Nosotros nos encargamos del resto. ¡El primer paso hacia una vida más activa y plena está a un clic de distancia!</p>
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