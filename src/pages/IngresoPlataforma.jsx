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
  const [authReady, setAuthReady]   = useState(false);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setAuthReady(true);
    });
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
      Swal.fire({ icon: "success", title: "Email enviado 📧", text: `Revisá tu bandeja en ${email}.`, confirmButtonColor: "#28a745" });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo enviar el email.", confirmButtonColor: "#dc3545" });
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

  const formStyle = {
    background: "linear-gradient(135deg, rgba(220,53,69,0.92), rgba(176,42,55,0.95))",
    borderRadius: "1.2rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    color: "white",
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "white",
    borderRadius: "8px",
  };

  // Mientras Firebase verifica si hay sesión activa
  if (!authReady) {
    return (
      <div style={pageStyle}>
        <div className="ingreso">
          <div style={{ ...formStyle, textAlign: "center" }}>
            <p style={{ color: "gold", fontSize: "1.2rem" }}>⏳ Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  // Usuario logueado
  if (user) {
    return (
      <div style={pageStyle}>
        <div className="ingreso" data-aos="fade-up">
          <div style={{ ...formStyle, textAlign: "center" }}>
            {user.photoURL && (
              <img src={user.photoURL} alt="avatar" className="rounded-circle mb-3"
                width="80" style={{ border: "3px solid gold" }} />
            )}
            <h4 className="fw-bold mb-1" style={{ color: "gold" }}>¡Bienvenido/a! 🎉</h4>
            <p className="fw-bold fs-5 mb-1" style={{ color: "white" }}>
              {user.displayName || user.email.split("@")[0]}
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)" }} className="mb-3">{user.email}</p>
            <div className="mb-3 p-2 rounded" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              💃 Tenés acceso completo a la plataforma MUEVETE
            </div>
            <button className="btn w-100 fw-bold"
              style={{ background: "gold", color: "#b02a37", fontSize: "1rem" }}
              onClick={handleLogout}>
              Cerrar sesión
            </button>
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

  // Formulario login / registro
  return (
    <div style={pageStyle}>
      <div className="ingreso">
        <div data-aos="fade-down" style={formStyle}>
          <h3 className="text-center fw-bold mb-4" style={{ color: "gold", letterSpacing: "1px" }}>
            {isRegister ? "✨ Crear cuenta" : "🔐 Ingreso a la plataforma"}
          </h3>
          <form onSubmit={handleEmailAuth}>
            <div className="mb-3">
              <label className="fw-bold mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>EMAIL</label>
              <input type="email" className="form-control" style={inputStyle}
                placeholder="tu@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="fw-bold mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>CONTRASEÑA</label>
              <input type="password" className="form-control" style={inputStyle}
                placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}
              className="btn w-100 fw-bold mb-2"
              style={{ background: "gold", color: "#b02a37", fontSize: "1rem" }}>
              {loading ? "⏳ Procesando..." : isRegister ? "CREAR CUENTA" : "INGRESAR"}
            </button>
          </form>

          <div className="d-flex align-items-center my-2">
            <hr style={{ flex: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            <span style={{ color: "rgba(255,255,255,0.6)", padding: "0 10px", fontSize: "0.85rem" }}>o</span>
            <hr style={{ flex: 1, borderColor: "rgba(255,255,255,0.3)" }} />
          </div>

          <button type="button" onClick={handleGoogle}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold mb-3"
            style={{ background: "white", color: "#444", fontSize: "0.95rem" }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="text-center">
            <button type="button" className="btn btn-link p-0 mb-2"
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem" }}
              onClick={handleReset}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />
          <p className="text-center mb-0" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
            {isRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}
            <button type="button" className="btn btn-link p-0 ms-1 fw-bold"
              style={{ color: "gold", fontSize: "0.9rem" }}
              onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Iniciá sesión" : "Registrate"}
            </button>
          </p>
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
    </div>
  );
};

export default IngresoPlataforma;
