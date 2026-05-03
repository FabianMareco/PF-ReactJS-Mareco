import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import packsData from "../data/packs.json";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useCart } from "../context/CartContext";

const cardsData = [
  { title: "DANZA JAZZ", description: "Explora diversos estilos de la danza Jazz: Modern Jazz, Lyrical Jazz, Theatre Jazz, Contemporary Jazz. No importa si eres principiante o avanzado, hay una clase disponible para que empieces a aprender.", colorClass: "card-green-1" },
  { title: "DANZA CLÁSICA", description: "Descubre nuestras clases de danza clásica diseñadas para todos los niveles. Mejora tu técnica, flexibilidad y expresión artística, guiado por profesionales que te acompañarán en cada paso hacia el dominio del ballet.", colorClass: "card-green-2" },
  { title: "DANZA CONTEMPORÁNEA", description: "Las clases de danza contemporánea están abiertas a todos los niveles, ofreciendo una mezcla de técnica, improvisación y expresión creativa. Mejora tu flexibilidad y fuerza mientras exploras nuevas formas de moverte.", colorClass: "card-green-3" },
  { title: "YOGA", description: "Realiza nuestras clases de yoga accesibles para todos los niveles. Mejora tu flexibilidad, fuerza y bienestar mental, guiado por profesionales. ¡Conéctate desde cualquier lugar y muévete!", colorClass: "card-yellow-1" },
  { title: "TANGO", description: "Vive la pasión del tango con nuestras clases online para todos los niveles. Aprende desde casa, con instructores expertos, a bailar y disfrutar de este hermoso arte. ¡Únete y siente el ritmo!", colorClass: "card-yellow-2" },
  { title: "ESTILOS URBANOS", description: "Aprende el ritmo y la energía de los estilos urbanos con nuestras clases en línea. Aprende a bailar hip hop, street dance y más, guiado por profesionales. ¡Mejora tus movimientos desde casa, a tu ritmo!", colorClass: "card-yellow-3" },
  { title: "FLEXIBILIDAD Y ELONGACIÓN", description: "Mejora tu elasticidad y bienestar en las clases de elongación y flexibilidad. Los ejercicios están guiados para aumentar tu rango de movimiento, reducir tensiones musculares y mejorar tu postura desde casa.", colorClass: "card-blue-1" },
  { title: "EXPRESIÓN CORPORAL", description: "Descubre en las clases de expresión corporal infinitas posibilidades del movimiento. Mejora tu coordinación, creatividad y conciencia corporal con ejercicios dinámicos y divertidos. ¡Conéctate desde cualquier lugar del mundo!", colorClass: "card-blue-2" },
  { title: "DANZAS FOLCLÓRICAS DEL MUNDO", description: "Viaja a países como Argentina, Paraguay o Ucrania en las clases del folclore del mundo. Aprende los pasos típicos, coreografías y más. ¡Empieza una clase ahora!", colorClass: "card-blue-3" },
  { title: "PILATES MAT", description: "Clases de Pilates Mat personalizadas para todos los niveles. Mejora tu flexibilidad, fuerza y bienestar en un ambiente motivador. ¡Únete a nuestra comunidad hoy!", colorClass: "card-purple-1" },
  { title: "FLAMENCO", description: "Aprender Flamenco en línea nunca fué tan fácil como ahora. Explora la guitarra, el baile y el cante desde la comodidad de tu hogar. ¡Vive la pasión del arte flamenco y descubre a tu bailaor/a interior! ¡Olé!", colorClass: "card-purple-2" },
  { title: "MOVILIDAD ARTICULAR PARA TODOS", description: "Cada día necesitamos acondicionar el cuerpo y trabajar la movilidad articular para mantener una salud física óptima, no importa tu profesión, esta clase es indispensable para todos.", colorClass: "card-purple-3" },
  { title: "DANZA PARA NIÑOS", description: "Nuestras clases están preparadas especialmente para la diversión y el aprendizaje de los más pequeños. Guiadas por profesionales con experiencia en el aprendizaje de tempranas edades. ¡Todos los niños son bienvenidos!", colorClass: "card-orange-1" },
  { title: "IMPROVISACIÓN", description: "La improvisación es una disciplina que se entrena, explora lugares desconocidos por el movimiento propio, invita a la reflexión y el descubrimiento constante. Cada clase es una invitación a jugar y aprender ¡Aprende a improvisar y llena tu danza de vida!", colorClass: "card-orange-2" },
  { title: "NUTRICIÓN PARA EL MOVIMIENTO Y EL BIENESTAR", description: "Somos el resultado de cómo nos alimentamos. Aprende como adquirir una correcta alimentación con los nutrientes necesarios para poder dar tu mejor versión cada día. Este curso te brindará las herramientas necesarias para llevar tu alimentación al siguiente nivel.", colorClass: "card-orange-3" }
];

const Clases = () => {
  const [movimientoPacks, setMovimientoPacks] = useState([]);
  const [nutricionPacks, setNutricionPacks] = useState([]);
  const [showMovimiento, setShowMovimiento] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setMovimientoPacks(packsData.filter(p => p.categoria === "clases"));
    setNutricionPacks(packsData.filter(p => p.categoria === "nutricion"));
  }, []);

  const scrollToPacks = () => {
    const packsSection = document.getElementById("packs-section");
    if (packsSection) packsSection.scrollIntoView({ behavior: "smooth" });
  };

  const abrirModalCompra = (pack) => {
    Swal.fire({
      title: `💃 ${pack.nombre}`,
      html: `<input id="cantidad" type="number" min="1" max="10" value="1" class="swal2-input" style="margin:10px auto"><div style="margin-top:10px"><label><input type="checkbox" id="esRegalo"> 🎁 Es un regalo</label></div>`,
      showCancelButton: true,
      confirmButtonText: "Agregar al carrito",
      preConfirm: () => {
        const cantidad = parseInt(document.getElementById("cantidad").value);
        if (isNaN(cantidad) || cantidad < 1) return Swal.showValidationMessage("Cantidad inválida");
        return { cantidad, esRegalo: document.getElementById("esRegalo").checked };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const { cantidad, esRegalo } = result.value;
        addItem({ id: pack.id, name: pack.nombre, price: pack.precio, type: "pack", category: pack.categoria, esRegalo }, cantidad);
        Toastify({ text: `✅ ${pack.nombre} agregado`, duration: 2000, gravity: "bottom", position: "right", style: { background: "linear-gradient(to right, #00b09b, #96c93d)" } }).showToast();
      }
    });
  };

  return (
    <><br />
      <div data-aos="fade-up"><h3>Clases</h3></div>
      <br />
      <div className="container-fluid d-flex flex-wrap">
        <div className="row">
          {[21, 22, 11].map((num, idx) => (
            <div key={num} className="col-xs-12 col-lg-4 col-sm-12 col-md-12" data-aos="fade-left" data-aos-delay={idx * 200}>
              <img className="img-clases img-fluid rounded-4" src={`/multimedia/${num}.png`} alt="" style={{ borderRadius: "20px" }} />
            </div>
          ))}
        </div>
      </div>
      <div data-aos="fade-up"><p className="texto-contenido">En las clases de MUEVETE encontrarás una experiencia única que combina diversidad y accesibilidad. Con múltiples opciones que abarcan desde el ballet y danza contemporánea hasta yoga y stretching, la plataforma en línea de MUEVETE está diseñada para todos los niveles, ya seas principiante o avanzado. Cada lección es impartida por profesionales altamente capacitados, que guían a los alumnos a través de técnicas, ejercicios y prácticas creativas. Los beneficios incluyen una mejora en la flexibilidad, la fuerza, y la conexión mente-cuerpo, así como la posibilidad de aprender a tu propio ritmo, desde cualquier lugar con acceso a internet. La variedad de estilos asegura que siempre encuentres una clase que se adapte a tus objetivos y preferencias, haciéndote sentir en plenitud y motivación.</p></div>
      <br />

      {/* 15 cards con degradados y texto completo */}
      <div className="container my-4">
        <h3 className="text-center mb-4">Nuestras disciplinas</h3>
        <div className="products-grid">
          {cardsData.map((card, idx) => (
  <div key={idx} className={`card h-100 shadow-sm ${card.colorClass}`} data-aos="fade-up" data-aos-delay={idx * 50}>
    <div className="d-flex justify-content-center align-items-center p-0" style={{ height: "220px", overflow: "hidden", background: "rgba(255,255,240,0.3)" }}>
      <img src={`/multimedia/clases${idx + 1}.png`} className="img-fluid w-100 h-100" alt={card.title} style={{ objectFit: "cover" }} />
    </div>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title text-center">{card.title}</h5>
      <p className="card-text small">{card.description}</p>
      <button className="btn btn-danger mt-auto" onClick={scrollToPacks}>IR A UNA CLASE</button>
    </div>
  </div>
))}
        </div>
      </div>


{/* Sección de packs */}
<section className="packs-section" id="packs-section">
  <div data-aos="fade-up"><h3>✨ Elige tu pack ✨</h3></div>
  <div className="text-center mb-3">
    <p className="small" style={{ background: "rgba(255,255,200,0.9)", display: "inline-block", padding: "8px 15px", borderRadius: "20px" }}>
      ⚡ Los packs de <strong>CLASES PARA MOVERSE</strong> (clases sueltas, packs, pase mensual/anual) no incluyen cursos ni asesorías de nutrición, y viceversa.
    </p>
  </div>
  <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
    <button className={`btn btn-danger btn-lg ${showMovimiento ? "active" : ""}`} onClick={() => setShowMovimiento(true)}>
      💃 COMPRAR CLASES PARA MOVERSE
    </button>
    <button className={`btn btn-warning btn-lg ${!showMovimiento ? "active" : ""}`} onClick={() => setShowMovimiento(false)}>
      🥗 COMPRAR CURSOS O ASESORÍAS
    </button>
  </div>

  {/* Packs de Movimiento */}
  <div className="packs-container" style={{ display: showMovimiento ? "block" : "none" }}>
    {/* Clases sueltas, pack 4, pack 8 - tamaño normal */}
    <div className="packs-row-normal">
      {movimientoPacks.filter(p => p.id !== 4 && p.id !== 11).map(pack => (
        <div key={pack.id} className="pack-card">
          <h5>💃 {pack.nombre}</h5>
          <p>{pack.descripcion}</p>
          <div className="pack-price">💰 ${pack.precio.toLocaleString()}</div>
          <button className="btn btn-success" onClick={() => abrirModalCompra(pack)}>🛒 Comprar</button>
        </div>
      ))}
    </div>
    
    {/* Pase Mensual y Anual - destacados al 80% */}
    <div className="packs-row-highlight">
      {movimientoPacks.filter(p => p.id === 4 || p.id === 11).map(pack => (
        <div key={pack.id} className="pack-card-highlight">
          <h5>⭐ {pack.nombre} ⭐</h5>
          <p>{pack.descripcion}</p>
          <div className="pack-price">💰 ${pack.precio.toLocaleString()}</div>
          <button className="btn btn-warning btn-lg" onClick={() => abrirModalCompra(pack)}>🛒 Comprar ahora</button>
        </div>
      ))}
    </div>
  </div>

  {/* Packs de Nutrición */}
  <div className="packs-container" style={{ display: !showMovimiento ? "block" : "none" }}>
    <div className="packs-row-normal">
      {nutricionPacks.filter(p => p.id !== 8 && p.id !== 10).map(pack => (
        <div key={pack.id} className="pack-card">
          <h5>🥗 {pack.nombre}</h5>
          <p>{pack.descripcion}</p>
          <div className="pack-price">💰 ${pack.precio.toLocaleString()}</div>
          <button className="btn btn-success" onClick={() => abrirModalCompra(pack)}>🛒 Comprar</button>
        </div>
      ))}
    </div>
    <div className="packs-row-highlight">
      {nutricionPacks.filter(p => p.id === 8 || p.id === 10).map(pack => (
        <div key={pack.id} className="pack-card-highlight">
          <h5>⭐ {pack.nombre} ⭐</h5>
          <p>{pack.descripcion}</p>
          <div className="pack-price">💰 ${pack.precio.toLocaleString()}</div>
          <button className="btn btn-warning btn-lg" onClick={() => abrirModalCompra(pack)}>🛒 Comprar ahora</button>
        </div>
      ))}
    </div>
  </div>
</section>

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

export default Clases;