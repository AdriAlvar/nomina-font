import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function DashboardLayout() {
    const [defOpen, setDefOpen] = useState(false);
    const location = useLocation();

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
            {/* Sidebar */}
            <aside style={{ width: 240, background: '#f9fafb', padding: 20, borderRight: '1px solid #ddd' }}>
                <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Sistema RRHH</h2>

                <nav>
                    <div style={{ marginBottom: 10 }}>
                        <Link to="/dashboard" style={navLink(location.pathname === '/dashboard')}>🏠 Dashboard</Link>
                    </div>

                    <div>
                        <div
                            onClick={() => setDefOpen(!defOpen)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333', marginBottom: 6 }}
                        >
                            ▸ Definiciones
                        </div>

                        {defOpen && (
                            <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <Link to="/dashboard/personales" style={navLink(location.pathname === '/dashboard/personales')}>
                                    👤 Personales
                                </Link>
                                <span style={navLink(false)}>📌 Cargos</span>
                                <span style={navLink(false)}>📋 Rubros</span>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Contenido */}
            <main style={{ flex: 1, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/';
                        }}
                        style={{
                            padding: '6px 12px',
                            background: '#f87171',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }}
                    >
                        🔓 Cerrar sesión
                    </button>
                </div>

                <Outlet />
            </main>
        </div>
    );
}

function navLink(active: boolean): React.CSSProperties {
    return {
        textDecoration: 'none',
        color: active ? '#000' : '#555',
        backgroundColor: active ? '#e5e7eb' : 'transparent',
        padding: '6px 12px',
        borderRadius: 4,
        display: 'block',
    };
}
