import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState('');
    const [clave, setClave] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje('');

        try {
            const res = await fetch('http://201.222.48.126:9023/nomina/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, clave, token: true }),
            });

            const data = await res.json();

            if (data.estado === 1) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard/');
            } else {
                setMensaje(data.mensaje || 'Credenciales incorrectas');
            }
        } catch (err) {
            setMensaje('Error de conexión con el servidor');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} style={{ padding: 80, border: '1px solid #ccc', borderRadius: 6, width: 300 }}>
                <h2>Iniciar Sesión</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoFocus
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
                <input
                    type="password"
                    placeholder="Clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
                <button type="submit" style={{ width: '100%', padding: 10 }}>Ingresar</button>
                {mensaje && <p style={{ marginTop: 10 }}>{mensaje}</p>}
            </form>
        </div>
    );
}
