import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Personales() {
    const [personas, setPersonas] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroApellido, setFiltroApellido] = useState('');
    const [filtroDocumento, setFiltroDocumento] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevoApellido, setNuevoApellido] = useState('');
    const [nuevoDocumento, setNuevoDocumento] = useState('');
    const [paises, setPaises] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState('');
    const [ciudades, setCiudades] = useState([]);
    const [barrios, setBarrios] = useState([]);
    const [profesiones, setProfesiones] = useState([]);
    const [estadosCiviles, setEstadosCiviles] = useState([]);

    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
    const [barrioSeleccionado, setBarrioSeleccionado] = useState('');
    const [profesionSeleccionada, setProfesionSeleccionada] = useState('');
    const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState('');


    useEffect(() => {
        cargarPersonas();
    }, []);

    const cargarPersonas = () => {
        axios.post('http://201.222.48.126:9023/nomina/persona', { todo: true })
            .then(res => setPersonas(res.data))
            .catch(err => console.error("Error al traer personales:", err));
    };


    const cargarCiudades = () => {
        axios.post('http://201.222.48.126:9023/nomina/ciudad', { todo: true })
            .then(res => setCiudades(res.data));
    };
    const cargarBarrios = () => {
        axios.post('http://201.222.48.126:9023/nomina/barrio', { todo: true })
            .then(res => setBarrios(res.data));
    };
    const cargarProfesiones = () => {
        axios.post('http://201.222.48.126:9023/nomina/profesion', { todo: true })
            .then(res => setProfesiones(res.data));
    };
    const cargarEstadosCiviles = () => {
        axios.post('http://201.222.48.126:9023/nomina/estadocivil', { todo: true })
            .then(res => setEstadosCiviles(res.data));
    };

    const cargarPaises = () => {
        axios.post('http://201.222.48.126:9023/nomina/pais', { todo: true })
            .then(res => setPaises(res.data))
            .catch(err => console.error("Error al cargar países:", err));
    };

    const personasFiltradas = personas.filter((p: any) => {
        const coincideNombre = p.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        const coincideApellido = p.apellido.toLowerCase().includes(filtroApellido.toLowerCase());
        const coincideDocumento = (p.documento || '').includes(filtroDocumento);
        return coincideNombre && coincideApellido && coincideDocumento;
    });

    const handleGuardar = async () => {
        try {
            await axios.post('http://201.222.48.126:9023/nomina/persona/modificar', {
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                documento: nuevoDocumento,
                idtipodocumento: 1,
                fecha_nacimiento: "1994-10-15",
                idciudad_nacimiento: 31,
                idpais_nacimiento: parseInt(paisSeleccionado),
                direccion: "TENIENTE ETTIENE CASI BEJARANO",
                idciudad: parseInt(ciudadSeleccionada),
                idbarrio: parseInt(barrioSeleccionado),
                telefono: "0994341656",
                celular: "0982770952",
                email: null,
                sexo: "0",
                idprofesion: parseInt(profesionSeleccionada),
                idestadocivil: parseInt(estadoCivilSeleccionado),
                fecha_ingreso: "2015-08-05",
                alta_seguro: null,
                estado: 1,
                id_anterior: null,
                doc_ext: null,
                idestudio: 2,
                ruc: null,
                fecha_baja: null,
                idmotivo_baja: null
            });
            setModalAbierto(false);
            setNuevoNombre('');
            setNuevoApellido('');
            setNuevoDocumento('');
            setPaisSeleccionado('');
            cargarPersonas();
        } catch (err) {
            console.error("Error al agregar persona:", err);
        }
    };

    const abrirModal = () => {
        setModalAbierto(true);
        cargarPaises(); cargarCiudades(); cargarBarrios(); cargarProfesiones(); cargarEstadosCiviles();
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, marginBottom: 16 }}>Listado de Personales</h1>

            <div style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
                <input placeholder="Nombre" value={filtroNombre} onChange={e => setFiltroNombre(e.target.value)} style={{ padding: 6 }} />
                <input placeholder="Apellido" value={filtroApellido} onChange={e => setFiltroApellido(e.target.value)} style={{ padding: 6 }} />
                <input placeholder="Documento" value={filtroDocumento} onChange={e => setFiltroDocumento(e.target.value)} style={{ padding: 6 }} />
                <button onClick={abrirModal} style={{ padding: '6px 12px' }}>➕ Agregar</button>
            </div>

            <div style={{ overflowX: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
                <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9' }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Nombre</th>
                            <th style={thStyle}>Apellido</th>
                            <th style={thStyle}>Documento</th>
                            <th style={thStyle}>País</th>
                            <th style={thStyle}>Ciudad</th>
                            <th style={thStyle}>Barrio</th>
                            <th style={thStyle}>Departamento</th>
                            <th style={thStyle}>Profesión</th>
                            <th style={thStyle}>Estado Civil</th>
                            <th style={thStyle}>Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personasFiltradas.map((p: any) => (
                            <tr key={p.idpersona}>
                                <td style={tdStyle}>{p.idpersona}</td>
                                <td style={tdStyle}>{p.nombre}</td>
                                <td style={tdStyle}>{p.apellido}</td>
                                <td style={tdStyle}>{p.documento}</td>
                                <td style={tdStyle}>{p.pais || '-'}</td>
                                <td style={tdStyle}>{p.ciudad || '-'}</td>
                                <td style={tdStyle}>{p.barrio || '-'}</td>
                                <td style={tdStyle}>{p.departamento || '-'}</td>
                                <td style={tdStyle}>{p.profesion || '-'}</td>
                                <td style={tdStyle}>{p.estadocivil || '-'}</td>
                                <td style={tdStyle}>{p.pais || '-'}</td>
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
                        <h2 style={{ marginBottom: 12 }}>Agregar Persona</h2>

                        <input placeholder="Nombre" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }} />
                        <input placeholder="Apellido" value={nuevoApellido} onChange={e => setNuevoApellido(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }} />
                        <input placeholder="Documento" value={nuevoDocumento} onChange={e => setNuevoDocumento(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }} />

                        <select value={paisSeleccionado} onChange={e => setPaisSeleccionado(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }}>
                            <option value="">Seleccione un país</option>
                            {paises.map((pais: any) => (
                                <option key={pais.idpais} value={pais.idpais}>{pais.descripcion}</option>
                            ))}
                        </select>

                        <select value={ciudadSeleccionada} onChange={e => setCiudadSeleccionada(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }}>
                            <option value="">Seleccione una ciudad</option>
                            {ciudades.map((ciudad: any) => (
                                <option key={ciudad.idciudad} value={ciudad.idciudad}>{ciudad.descripcion}</option>
                            ))}
                        </select>

                        <select value={barrioSeleccionado} onChange={e => setBarrioSeleccionado(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }}>
                            <option value="">Seleccione un barrio</option>
                            {barrios.map((barrio: any) => (
                                <option key={barrio.idbarrio} value={barrio.idbarrio}>{barrio.descripcion}</option>
                            ))}
                        </select>

                        <select value={profesionSeleccionada} onChange={e => setProfesionSeleccionada(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 8, padding: 6 }}>
                            <option value="">Seleccione una profesión</option>
                            {profesiones.map((prof: any) => (
                                <option key={prof.idprofesion} value={prof.idprofesion}>{prof.descripcion}</option>
                            ))}
                        </select>

                        <select value={estadoCivilSeleccionado} onChange={e => setEstadoCivilSeleccionado(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 16, padding: 6 }}>
                            <option value="">Seleccione estado civil</option>
                            {estadosCiviles.map((estado: any) => (
                                <option key={estado.idestadocivil} value={estado.idestadocivil}>{estado.descripcion}</option>
                            ))}
                        </select>

                        <button onClick={handleGuardar} style={{ marginRight: 8 }}>💾 Guardar</button>
                        <button onClick={() => setModalAbierto(false)}>❌ Cancelar</button>
                    </div>
                </div>
            )}

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