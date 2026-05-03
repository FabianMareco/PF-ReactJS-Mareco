import { Link } from "react-router-dom";
// src/pages/Home.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const images = [1, 2, 3, 4, 6, 7, 8, 9];

  return (
    <>
      <aside>
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, i) => (
              <button key={i} type="button" data-bs-target="#demo" data-bs-slide-to={i} className={i === 0 ? "active" : ""}></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((num, idx) => (
              <div key={num} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                <img src={`/multimedia/${num}.png`} alt={`bailando${num}`} className="d-block w-100" />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
        <br />
        <main>
          <div data-aos="fade-up"><h3>La importancia de moverse y sentirse vivo</h3></div>
          <div data-aos="fade-down">
            <p className="texto-contenido">El movimiento es vida, y queremos compartirlo contigo. En MUEVETE, nuestra plataforma de e-learning, te invitamos a redescubrir la alegría, la libertad y los beneficios de mover tu cuerpo. Ya sea a través de la danza, el yoga, el stretching o cualquier otra disciplina, aquí encontrarás un espacio pensado para ti, sin importar si estás empezando o si ya llevas tiempo en este camino. Sabemos que cada persona vive el movimiento de forma única. Por eso, hemos creado una experiencia que combina el aprendizaje en línea con la práctica activa, adaptada a tus necesidades y ritmo de vida. El movimiento no solo nos mantiene en forma, también transforma nuestra mente, nuestras emociones y nuestra salud. En nuestras clases de danza –desde el ballet clásico hasta el jazz o la improvisación contemporánea– descubrirás cómo conectar con tu creatividad y expresión personal mientras mejoras tu coordinación y flexibilidad. Nuestras sesiones de yoga y stretching son mucho más que ejercicios: son un regalo para tu cuerpo y tu mente. Te ayudarán a liberar tensiones, fortalecer tu postura y encontrar ese equilibrio que tantas veces necesitamos en el día a día. Aquí, cada movimiento cuenta. ¿Listo para empezar tu viaje con nosotros?</p>
          </div>
          <div data-aos="fade-up"><h3>Nuestras clases</h3></div>
          <div data-aos="fade-down">
            <p className="texto-contenido">En nuestra plataforma, todos son bienvenidos. No importa tu edad, condición física o experiencia previa: este espacio está diseñado para ti. Solo necesitas suscribirte y dar el primer paso hacia un estilo de vida más saludable, dinámico y lleno de energía. Te ofrecemos una amplia variedad de clases, tanto en vivo como grabadas, para que puedas elegir lo que mejor se adapte a tu ritmo y horario. Cada sesión está guiada por profesionales apasionados que estarán contigo en cada momento, ayudándote a moverte, aprender y sentirte mejor. ¿Estás listo para descubrir todo lo que el movimiento puede hacer por ti? ¡Únete hoy y transforma tu vida, un paso a la vez!</p>
          </div>
        </main>
        <br />
        <div data-aos="fade-down">
          <h4 className="link-prefooter">Aprender nunca fue tan fácil como ahora en ¡MUEVETE!</h4>
          <h4 className="link-prefooter">Hay una clase preparada para que puedas empezar a aprender <Link to="/ingreso">¡YA!</Link></h4>
        </div>
      </aside>
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

export default Home;