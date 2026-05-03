import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

const IngresoPlataforma = () => {
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);
  const [user, setUser]             = useState(null);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire({ icon: "success", title: "¡Cuenta creada!", text: "Ya podés acceder a la plataforma.", confirmButtonColor: "#28a745" });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const msgs = {
        "auth/user-not-found":       "No existe una cuenta con ese email.",
        "auth/wrong-password":       "Contraseña incorrecta.",
        "auth/email-already-in-use": "Ese email ya está registrado.",
        "auth/weak-password":        "La contraseña debe tener al menos 6 caracteres.",
        "auth/invalid-email":        "Email inválido.",
        "auth/invalid-credential":   "Email o contraseña incorrectos.",
      };
      Swal.fire({ icon: "error", title: "Error", text: msgs[err.code] || err.message, confirmButtonColor: "#dc3545" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error con Google", text: err.message, confirmButtonColor: "#dc3545" });
    }
  };

  const handleReset = async () => {
    if (!email) {
      Swal.fire({ icon: "warning", title: "Escribí tu email", text: "Ingresá tu email arriba para recuperar tu contraseña.", confirmButtonColor: "#dc3545" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({ icon: "success", title: "Email enviado 📧", text: `Revisá tu bandeja de entrada en ${email}.`, confirmButtonColor: "#28a745" });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo enviar el email. Verificá la dirección.", confirmButtonColor: "#dc3545" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail(""); setPassword("");
  };

  const pageStyle = {
    backgroundImage: "url(/multimedia/D.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  if (user) {
    return (
      <div style={pageStyle}>
        <div className="ingreso" data-aos="fade-up">
          <div className="form-ingreso text-center">
            {user.photoURL && <img src={user.photoURL} alt="avatar" className="rounded-circle mb-3" width="80" />}
            <h4 className="mb-1">¡Bienvenido/a! 🎉</h4>
            <p className="fw-bold fs-5 mb-1">{user.displayName || "Usuario"}</p>
            <p className="text-muted mb-3">{user.email}</p>
            <div className="alert alert-success py-2">
              💃 Tenés acceso completo a la plataforma MUEVETE
            </div>
            <button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
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
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div className="ingreso">
        <div data-aos="fade-up" className="text-center mb-2">
          <h3 style={{ color: "white", textShadow: "2px 2px 4px black" }}>
            {isRegister ? "Crear cuenta" : "Ingreso a la plataforma"}
          </h3>
        </div>
        <form className="form-ingreso" onSubmit={handleEmailAuth} data-aos="fade-down">
          <div className="item-contacto">
            <label>EMAIL</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="item-contacto">
            <label>CONTRASEÑA</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="item-contacto d-flex flex-column gap-2 mb-0">
            <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
              {loading ? "⏳ Procesando..." : isRegister ? "CREAR CUENTA" : "INGRESAR"}
            </button>

            <button type="button" onClick={handleGoogle}
              className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 bg-white">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continuar con Google
            </button>

            <button type="button" className="btn btn-link text-danger p-0 text-center" onClick={handleReset}>
              Olvidé mi contraseña
            </button>
            <hr className="my-2"/>
            <p className="text-center mb-0 small">
              {isRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}
              <button type="button" className="btn btn-link text-danger p-0 ms-1 small fw-bold"
                onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Iniciá sesión" : "Registrate"}
              </button>
            </p>
          </div>
        </form>
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
    </div>
  );
};

export default IngresoPlataforma;
