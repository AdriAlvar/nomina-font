import { useEffect, useState } from 'react';
import axios from 'axios';
import type { CSSProperties } from 'react';

type Rubro = {
    idrubro: number;
    descripcion: string;
    tipo: 'credito' | 'debito';
    monto: number;
    afecta_ips: boolean;
    considera_aguinaldo: boolean;
    recurrente: boolean;
};

export default function Rubros() {
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState<'credito' | 'debito'>('credito');
    const [monto, setMonto] = useState('');
    const [afectaIPS, setAfectaIPS] = useState(true);
    const [aguinaldo, setAguinaldo] = useState(true);
    const [recurrente, setRecurrente] = useState(true);

    const cargarRubros = () => {
        axios.post('http://201.222.48.126:9023/nomina/rubro', { todo: true })
            .then(res => setRubros(res.data))
            .catch(err => console.error(err));
    };

    const handleGuardar = async () => {
        await axios.post('http://201.222.48.126:9023/nomina/rubro/modificar', {
            descripcion,
            tipo,
            monto: parseFloat(monto),
            afecta_ips: afectaIPS,
            considera_aguinaldo: aguinaldo,
            recurrente,
            estado: 1
        });

        setDescripcion('');
        setTipo('credito');
        setMonto('');
        setAfectaIPS(true);
        setAguinaldo(true);
        setRecurrente(true);
        setModalAbierto(false);
        cargarRubros();
    };

    useEffect(() => {
        cargarRubros();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 12 }}>Conceptos de Liquidación (Rubros)</h2>
            <button onClick={() => setModalAbierto(true)} style={{ marginBottom: 16 }}>➕ Agregar</button>

            <div style={{ overflowX: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
                <table style={{ minWidth: 800, width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9' }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Descripción</th>
                            <th style={thStyle}>Tipo</th>
                            <th style={thStyle}>Monto</th>
                            <th style={thStyle}>Afecta IPS</th>
                            <th style={thStyle}>Aguinaldo</th>
                            <th style={thStyle}>Recurrente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rubros.map((r) => (
                            <tr key={r.idrubro}>
                                <td style={tdStyle}>{r.idrubro}</td>
                                <td style={tdStyle}>{r.descripcion}</td>
                                <td style={tdStyle}>{r.tipo}</td>
                                <td style={tdStyle}>{r.monto}</td>
                                <td style={tdStyle}>{r.afecta_ips ? '✅' : '❌'}</td>
                                <td style={tdStyle}>{r.considera_aguinaldo ? '✅' : '❌'}</td>
                                <td style={tdStyle}>{r.recurrente ? '✅' : '❌'}</td>
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
                        <h3 style={{ marginBottom: 12 }}>Agregar Rubro</h3>
                        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={inputStyle} />
                        <select value={tipo} onChange={e => setTipo(e.target.value as 'credito' | 'debito')} style={inputStyle}>
                            <option value="credito">Crédito</option>
                            <option value="debito">Débito</option>
                        </select>
                        <input placeholder="Monto" value={monto} onChange={e => setMonto(e.target.value)} style={inputStyle} type="number" />
                        <label><input type="checkbox" checked={afectaIPS} onChange={e => setAfectaIPS(e.target.checked)} /> Afecta IPS</label><br />
                        <label><input type="checkbox" checked={aguinaldo} onChange={e => setAguinaldo(e.target.checked)} /> Considera Aguinaldo</label><br />
                        <label><input type="checkbox" checked={recurrente} onChange={e => setRecurrente(e.target.checked)} /> Recurrente</label><br />
                        <div style={{ marginTop: 12 }}>
                            <button onClick={handleGuardar} style={{ marginRight: 8 }}>💾 Guardar</button>
                            <button onClick={() => setModalAbierto(false)}>❌ Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const thStyle: CSSProperties = {
    border: '1px solid #ccc',
    padding: 8,
    textAlign: 'left' as const,
};

const tdStyle: CSSProperties = {
    border: '1px solid #ccc',
    padding: 8,
};

const inputStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    marginBottom: 8,
    padding: 6,
};
