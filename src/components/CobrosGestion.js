import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import styles from './Dashboard.module.css';
import Chart from './Chart';

// Datos simulados para la gestión de cobros
const cobrosData = [
  {
    id: 1,
    factura: 'Factura #2345',
    descripcion: 'Servicios de consultoría',
    cliente: 'Empresa ABC',
    fechaEmision: '15/11/2023',
    fechaVencimiento: '15/12/2023',
    monto: '$12,500.00',
    estado: 'Pendiente'
  },
  {
    id: 2,
    factura: 'Factura #2340',
    descripcion: 'Desarrollo de software',
    cliente: 'Corporación XYZ',
    fechaEmision: '05/11/2023',
    fechaVencimiento: '05/12/2023',
    monto: '$18,000.00',
    estado: 'Pendiente'
  },
  {
    id: 3,
    factura: 'Factura #2335',
    descripcion: 'Mantenimiento mensual',
    cliente: 'Industrias Globales',
    fechaEmision: '28/10/2023',
    fechaVencimiento: '28/11/2023',
    monto: '$5,500.00',
    estado: 'Vencida'
  },
  {
    id: 4,
    factura: 'Factura #2330',
    descripcion: 'Servicios de marketing',
    cliente: 'Compañía DEF',
    fechaEmision: '15/10/2023',
    fechaVencimiento: '15/11/2023',
    monto: '$8,500.00',
    estado: 'Vencida'
  },
  {
    id: 5,
    factura: 'Factura #2325',
    descripcion: 'Implementación de sistema',
    cliente: 'Distribuidora Norte',
    fechaEmision: '01/10/2023',
    fechaVencimiento: '01/11/2023',
    monto: '$22,000.00',
    estado: 'Vencida'
  }
];

// Datos para el gráfico de estado de cobros
const estadoCobrosOptions = {
  title: {
    text: 'Estado de cobros',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: ${c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'middle',
    textStyle: {
      color: '#0a2463'
    }
  },
  series: [{
    name: 'Estado de cobros',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [
      { value: 98750, name: 'Cobrados' },
      { value: 18000, name: 'Pendientes' },
      { value: 36000, name: 'Vencidos' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    itemStyle: {
      color: function(params) {
        const colorList = ['#4ade80', '#fbbf24', '#f87171'];
        return colorList[params.dataIndex];
      }
    }
  }]
};

const CobrosGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentCobro, setCurrentCobro] = useState(null);
  const [cobros, setCobros] = useState(cobrosData);
  const [showChart, setShowChart] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAddClick = () => {
    setCurrentCobro(null);
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (cobro) => {
    setCurrentCobro(cobro);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentCobro(null);
  };

  const handleFormSubmit = (cobroData) => {
    if (currentCobro) {
      // Actualizar cobro existente
      setCobros(cobros.map(c => c.id === cobroData.id ? cobroData : c));
    } else {
      // Agregar nuevo cobro
      setCobros([cobroData, ...cobros]);
    }
    setShowForm(false);
    setCurrentCobro(null);
  };

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (showForm) setShowForm(false);
  };

  const CobrosForm = ({ cobro, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      factura: '',
      descripcion: '',
      cliente: '',
      fechaEmision: '',
      fechaVencimiento: '',
      monto: '',
      estado: 'Pendiente'
    });

    React.useEffect(() => {
      if (cobro) {
        setFormData({
          id: cobro.id,
          factura: cobro.factura || '',
          descripcion: cobro.descripcion || '',
          cliente: cobro.cliente || '',
          fechaEmision: cobro.fechaEmision || '',
          fechaVencimiento: cobro.fechaVencimiento || '',
          monto: cobro.monto ? cobro.monto.replace('$', '').replace(',', '') : '',
          estado: cobro.estado || 'Pendiente'
        });
      }
    }, [cobro]);

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
      
      const cobroData = {
        ...formData,
        monto: formattedMonto,
        id: cobro ? cobro.id : Date.now()
      };
      
      onSubmit(cobroData);
    };

    return (
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{cobro ? 'Editar Cobro' : 'Registrar Nuevo Cobro'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="factura">Factura</label>
              <input
                type="text"
                id="factura"
                name="factura"
                value={formData.factura}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Número de factura"
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
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cliente">Cliente</label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Nombre del cliente"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="fechaEmision">Fecha de Emisión</label>
              <input
                type="date"
                id="fechaEmision"
                name="fechaEmision"
                value={formData.fechaEmision}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
              <input
                type="date"
                id="fechaVencimiento"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={styles.formInput}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
                <option value="Vencida">Vencida</option>
              </select>
            </div>
            
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Descripción detallada del cobro"
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
              {cobro ? 'Actualizar Cobro' : 'Guardar Cobro'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const CobrosList = ({ cobros, onAddClick, onEditClick }) => {
    return (
      <div className={styles.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className={styles.tableTitle}>Listado de Cobros</h3>
          <button 
            className={styles.addButton}
            onClick={onAddClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Cobro
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Factura</th>
                <th>Descripción</th>
                <th>Cliente</th>
                <th>Fecha Emisión</th>
                <th>Fecha Vencimiento</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cobros.map((cobro) => (
                <tr key={cobro.id}>
                  <td>{cobro.factura}</td>
                  <td className={styles.description}>
                    {cobro.descripcion.length > 15 
                      ? `${cobro.descripcion.substring(0, 15)}...` 
                      : cobro.descripcion}
                  </td>
                  <td>{cobro.cliente}</td>
                  <td>{cobro.fechaEmision}</td>
                  <td>{cobro.fechaVencimiento}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>{cobro.monto}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${cobro.estado}`]}`}>
                      {cobro.estado}
                    </span>
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
                      onClick={() => onEditClick(cobro)}
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
            <h1 style={{ color: 'var(--text-color)' }}>Gestión de Cobros</h1>
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
                title="Estado de cobros" 
                type="pie" 
                options={estadoCobrosOptions} 
              />
            </div>
          )}
          
          {showForm ? (
            <CobrosForm 
              cobro={currentCobro} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <CobrosList 
              cobros={cobros} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CobrosGestion;