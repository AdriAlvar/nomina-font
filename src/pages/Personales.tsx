import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Personales() {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        axios.post('http://201.222.48.126:9023/nomina/persona', { todo: true })
            .then(res => {
                setPersonas(res.data);
            })
            .catch(err => {
                console.error("Error al traer personales:", err);
            });
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: 24, marginBottom: 16 }}>Listado de Personales</h1>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Apellido</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((p: any) => (
                        <tr key={p.idpersona}>
                            <td style={tdStyle}>{p.idpersona}</td>
                            <td style={tdStyle}>{p.nombre}</td>
                            <td style={tdStyle}>{p.apellido}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #ccc',
    textAlign: 'left'
};

const tdStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #eee'
};
