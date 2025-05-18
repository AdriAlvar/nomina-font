import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function Cargos() {
    const [cargos, setCargos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaBaja, setFechaBaja] = useState('');
    const [idpersona, setIdpersona] = useState('');

    const cargarCargos = () => {
        axios.post('http://201.222.48.126:9023/nomina/cargo', { todo: true })
            .then(res => setCargos(res.data))
            .catch(err => console.error(err));
    };

    const cargarPersonas = () => {
        axios.post('http://201.222.48.126:9023/nomina/persona', { todo: true })
            .then(res => setPersonas(res.data))
            .catch(err => console.error(err));
    };

    const abrirModal = () => {
        cargarPersonas();
        setModalAbierto(true);
    };

    const handleGuardar = async () => {
        await axios.post('http://201.222.48.126:9023/nomina/cargo/modificar', {
            idpersona: parseInt(idpersona),
            fecha_inicio: fechaInicio,
            fecha_baja: fechaBaja || null,
            descripcion,
            tareas,
            estado: 1
        });

        setModalAbierto(false);
        setDescripcion('');
        setTareas('');
        setFechaInicio('');
        setFechaBaja('');
        setIdpersona('');
        cargarCargos();
    };

    useEffect(() => {
        cargarCargos();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 12 }}>Cargos</h2>
            <button onClick={abrirModal} style={{ marginBottom: 16 }}>➕ Agregar</button>

            <div style={{ overflowX: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
                <table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9' }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Persona</th>
                            <th style={thStyle}>Cargo</th>
                            <th style={thStyle}>Tareas</th>
                            <th style={thStyle}>Inicio</th>
                            <th style={thStyle}>Baja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargos.map((c: any) => (
                            <tr key={c.idcargo}>
                                <td style={tdStyle}>{c.idcargo}</td>
                                <td style={tdStyle}>{c.persona}</td>
                                <td style={tdStyle}>{c.descripcion}</td>
                                <td style={tdStyle}>{c.tareas}</td>
                                <td style={tdStyle}>{c.fecha_inicio}</td>
                                <td style={tdStyle}>{c.fecha_baja || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalAbierto && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: '#fff', padding: 24, borderRadius: 6, minWidth: 300 }}>
                        <h3 style={{ marginBottom: 12 }}>Agregar Cargo</h3>

                        <label style={{ marginBottom: 4, display: 'block' }}>Persona</label>
                        <Select
                            options={personas.map(p => ({
                                value: p.idpersona,
                                label: `${p.nombre} ${p.apellido} - ${p.documento}`
                            }))}
                            onChange={(opcion) => setIdpersona(opcion?.value || '')}
                            placeholder="Seleccione una persona..."
                            styles={{ container: base => ({ ...base, marginBottom: 12 }) }}
                        />

                        <input placeholder="Descripción del cargo" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={inputStyle} />
                        <textarea placeholder="Tareas" value={tareas} onChange={e => setTareas(e.target.value)} style={inputStyle} />
                        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} style={inputStyle} />
                        <input type="date" value={fechaBaja} onChange={e => setFechaBaja(e.target.value)} style={inputStyle} />
                        <button onClick={handleGuardar} style={{ marginRight: 8 }}>💾 Guardar</button>
                        <button onClick={() => setModalAbierto(false)}>❌ Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const thStyle = { border: '1px solid #ccc', padding: 8, textAlign: 'left' };
const tdStyle = { border: '1px solid #ccc', padding: 8 };
const inputStyle = { display: 'block', width: '100%', marginBottom: 8, padding: 6 };
