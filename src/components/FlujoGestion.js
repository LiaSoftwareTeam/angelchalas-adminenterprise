import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import styles from './Dashboard.module.css';
import Chart from './Chart';

// Datos simulados para la gestión de flujo de caja
const flujoData = [
  {
    id: 1,
    concepto: 'Pago de clientes',
    descripcion: 'Cobro de facturas pendientes',
    tipo: 'Ingreso',
    fecha: '15/11/2023',
    monto: '$15,500.00',
    categoria: 'Ventas'
  },
  {
    id: 2,
    concepto: 'Pago de nómina',
    descripcion: 'Salarios del personal',
    tipo: 'Egreso',
    fecha: '10/11/2023',
    monto: '$8,200.00',
    categoria: 'Nómina'
  },
  {
    id: 3,
    concepto: 'Servicios públicos',
    descripcion: 'Pago de electricidad y agua',
    tipo: 'Egreso',
    fecha: '05/11/2023',
    monto: '$1,200.00',
    categoria: 'Servicios'
  },
  {
    id: 4,
    concepto: 'Venta de productos',
    descripcion: 'Ingresos por ventas del mes',
    tipo: 'Ingreso',
    fecha: '30/10/2023',
    monto: '$22,000.00',
    categoria: 'Ventas'
  },
  {
    id: 5,
    concepto: 'Pago de impuestos',
    descripcion: 'Impuestos trimestrales',
    tipo: 'Egreso',
    fecha: '25/10/2023',
    monto: '$5,800.00',
    categoria: 'Impuestos'
  }
];

// Datos para el gráfico de ingresos vs egresos
const ingresosEgresosOptions = {
  title: {
    text: 'Ingresos vs Egresos',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}: ${c}'
  },
  legend: {
    data: ['Ingresos', 'Egresos'],
    top: 'bottom',
    textStyle: {
      color: '#0a2463'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'],
    axisLine: {
      lineStyle: {
        color: '#0a2463'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#0a2463'
      }
    },
    axisLabel: {
      formatter: '${value}'
    }
  },
  series: [
    {
      name: 'Ingresos',
      type: 'bar',
      data: [37500, 42000, 45000, 39000, 41500, 48000],
      itemStyle: {
        color: '#4ade80'
      }
    },
    {
      name: 'Egresos',
      type: 'bar',
      data: [25000, 28000, 32000, 26500, 29000, 31000],
      itemStyle: {
        color: '#f87171'
      }
    }
  ]
};

const FlujoGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentFlujo, setCurrentFlujo] = useState(null);
  const [flujos, setFlujos] = useState(flujoData);
  const [showChart, setShowChart] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAddClick = () => {
    setCurrentFlujo(null);
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (flujo) => {
    setCurrentFlujo(flujo);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentFlujo(null);
  };

  const handleFormSubmit = (flujoData) => {
    if (currentFlujo) {
      // Actualizar flujo existente
      setFlujos(flujos.map(f => f.id === flujoData.id ? flujoData : f));
    } else {
      // Agregar nuevo flujo
      setFlujos([flujoData, ...flujos]);
    }
    setShowForm(false);
    setCurrentFlujo(null);
  };

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (showForm) setShowForm(false);
  };

  const FlujoForm = ({ flujo, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      concepto: '',
      descripcion: '',
      tipo: 'Ingreso',
      fecha: '',
      monto: '',
      categoria: ''
    });

    React.useEffect(() => {
      if (flujo) {
        setFormData({
          id: flujo.id,
          concepto: flujo.concepto || '',
          descripcion: flujo.descripcion || '',
          tipo: flujo.tipo || 'Ingreso',
          fecha: flujo.fecha || '',
          monto: flujo.monto ? flujo.monto.replace('$', '').replace(',', '') : '',
          categoria: flujo.categoria || ''
        });
      }
    }, [flujo]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Formatear el monto
      const formattedMonto = parseFloat(formData.monto).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      const flujoData = {
        ...formData,
        monto: formattedMonto,
        id: flujo ? flujo.id : Date.now()
      };
      
      onSubmit(flujoData);
    };

    // Obtener la fecha actual en formato YYYY-MM-DD para el input date
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Convertir formato de fecha DD/MM/YYYY a YYYY-MM-DD para el input date
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    };

    return (
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{flujo ? 'Editar Movimiento' : 'Registrar Nuevo Movimiento'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="concepto">Concepto</label>
              <input
                type="text"
                id="concepto"
                name="concepto"
                value={formData.concepto}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Concepto del movimiento"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="tipo">Tipo</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className={styles.formInput}
                required
              >
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="categoria">Categoría</label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Categoría del movimiento"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formatDateForInput(formData.fecha)}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="monto">Monto</label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Descripción detallada del movimiento"
                required
              ></textarea>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              {flujo ? 'Actualizar Movimiento' : 'Guardar Movimiento'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const FlujoList = ({ flujos, onAddClick, onEditClick }) => {
    return (
      <div className={styles.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className={styles.tableTitle}>Movimientos de Flujo de Caja</h3>
          <button 
            className={styles.addButton}
            onClick={onAddClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Movimiento
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {flujos.map((flujo) => (
                <tr key={flujo.id}>
                  <td>{flujo.concepto}</td>
                  <td className={styles.description}>
                    {flujo.descripcion.length > 15 
                      ? `${flujo.descripcion.substring(0, 15)}...` 
                      : flujo.descripcion}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${flujo.tipo === 'Ingreso' ? styles.statusPagada : styles.statusVencida}`}>
                      {flujo.tipo}
                    </span>
                  </td>
                  <td>{flujo.categoria}</td>
                  <td>{flujo.fecha}</td>
                  <td style={{ 
                    fontWeight: 'bold', 
                    color: flujo.tipo === 'Ingreso' ? 'var(--success-color)' : 'var(--danger-color)' 
                  }}>
                    {flujo.monto}
                  </td>
                  <td>
                    <button className={styles.actionButton} title="Ver detalles">
                      <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button 
                      className={styles.actionButton} 
                      title="Editar"
                      onClick={() => onEditClick(flujo)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className={styles.actionButton} title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`${styles.mainContent} ${sidebarExpanded ? styles.contentWithExpandedSidebar : ''}`}>
        <Toolbar />
        <div className={styles.contentWrapper}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ color: 'var(--text-color)' }}>Gestión de Flujo de Caja</h1>
            <div>
              <button 
                onClick={handleShowChart}
                style={{
                  padding: '0.75rem 1.25rem',
                  marginRight: '1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: showChart ? 'var(--accent-color)' : 'transparent',
                  color: showChart ? 'white' : 'var(--text-secondary)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                {showChart ? 'Ocultar Gráfico' : 'Ver Gráfico'}
              </button>
            </div>
          </div>
          
          {showChart && (
            <div className={styles.chartItem} style={{ marginBottom: '1.5rem' }}>
              <Chart 
                title="Ingresos vs Egresos" 
                type="bar" 
                options={ingresosEgresosOptions} 
              />
            </div>
          )}
          
          {showForm ? (
            <FlujoForm 
              flujo={currentFlujo} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <FlujoList 
              flujos={flujos} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlujoGestion;