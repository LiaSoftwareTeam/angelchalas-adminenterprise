import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import styles from './Dashboard.module.css';
import Chart from './Chart';

// Datos simulados para la gestión de unidades de negocio
const unidadesData = [
  {
    id: 1,
    nombre: 'Desarrollo Web',
    descripcion: 'Servicios de desarrollo de sitios y aplicaciones web',
    responsable: 'Carlos Méndez',
    ingresos: '$45,000.00',
    gastos: '$28,000.00',
    rentabilidad: '37.8%',
    estado: 'Activa'
  },
  {
    id: 2,
    nombre: 'Consultoría IT',
    descripcion: 'Servicios de asesoría en tecnología e implementación',
    responsable: 'María Rodríguez',
    ingresos: '$38,500.00',
    gastos: '$22,000.00',
    rentabilidad: '42.9%',
    estado: 'Activa'
  },
  {
    id: 3,
    nombre: 'Marketing Digital',
    descripcion: 'Servicios de marketing en redes sociales y SEO',
    responsable: 'Juan Pérez',
    ingresos: '$32,000.00',
    gastos: '$19,500.00',
    rentabilidad: '39.1%',
    estado: 'Activa'
  },
  {
    id: 4,
    nombre: 'Soporte Técnico',
    descripcion: 'Servicios de soporte y mantenimiento de sistemas',
    responsable: 'Ana Gómez',
    ingresos: '$28,500.00',
    gastos: '$18,000.00',
    rentabilidad: '36.8%',
    estado: 'Activa'
  },
  {
    id: 5,
    nombre: 'Desarrollo Móvil',
    descripcion: 'Desarrollo de aplicaciones para iOS y Android',
    responsable: 'Roberto Sánchez',
    ingresos: '$42,000.00',
    gastos: '$25,000.00',
    rentabilidad: '40.5%',
    estado: 'Activa'
  }
];

// Datos para el gráfico de rentabilidad por unidad
const rentabilidadUnidadesOptions = {
  title: {
    text: 'Rentabilidad por Unidad de Negocio',
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
    formatter: '{b}: {c}%'
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
    data: ['Desarrollo Web', 'Consultoría IT', 'Marketing Digital', 'Soporte Técnico', 'Desarrollo Móvil'],
    axisLabel: {
      interval: 0,
      rotate: 30
    },
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
      formatter: '{value}%'
    }
  },
  series: [{
    name: 'Rentabilidad',
    type: 'bar',
    data: [37.8, 42.9, 39.1, 36.8, 40.5],
    itemStyle: {
      color: function(params) {
        const colorList = ['#4ade80', '#60a5fa', '#fbbf24', '#a78bfa', '#f87171'];
        return colorList[params.dataIndex];
      }
    },
    label: {
      show: true,
      position: 'top',
      formatter: '{c}%'
    }
  }]
};

const UnidadesGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentUnidad, setCurrentUnidad] = useState(null);
  const [unidades, setUnidades] = useState(unidadesData);
  const [showChart, setShowChart] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAddClick = () => {
    setCurrentUnidad(null);
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (unidad) => {
    setCurrentUnidad(unidad);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentUnidad(null);
  };

  const handleFormSubmit = (unidadData) => {
    if (currentUnidad) {
      // Actualizar unidad existente
      setUnidades(unidades.map(u => u.id === unidadData.id ? unidadData : u));
    } else {
      // Agregar nueva unidad
      setUnidades([unidadData, ...unidades]);
    }
    setShowForm(false);
    setCurrentUnidad(null);
  };

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (showForm) setShowForm(false);
  };

  // Calcular la rentabilidad basada en ingresos y gastos
  const calcularRentabilidad = (ingresos, gastos) => {
    const ingresosNum = parseFloat(ingresos.replace(/[^0-9.-]+/g, ''));
    const gastosNum = parseFloat(gastos.replace(/[^0-9.-]+/g, ''));
    
    if (ingresosNum === 0) return '0.0%';
    
    const rentabilidad = ((ingresosNum - gastosNum) / ingresosNum) * 100;
    return rentabilidad.toFixed(1) + '%';
  };

  const UnidadForm = ({ unidad, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      responsable: '',
      ingresos: '',
      gastos: '',
      rentabilidad: '',
      estado: 'Activa'
    });

    React.useEffect(() => {
      if (unidad) {
        setFormData({
          id: unidad.id,
          nombre: unidad.nombre || '',
          descripcion: unidad.descripcion || '',
          responsable: unidad.responsable || '',
          ingresos: unidad.ingresos ? unidad.ingresos.replace('$', '').replace(',', '') : '',
          gastos: unidad.gastos ? unidad.gastos.replace('$', '').replace(',', '') : '',
          rentabilidad: unidad.rentabilidad || '',
          estado: unidad.estado || 'Activa'
        });
      }
    }, [unidad]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Formatear los montos
      const formattedIngresos = parseFloat(formData.ingresos).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      const formattedGastos = parseFloat(formData.gastos).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      // Calcular rentabilidad
      const rentabilidad = calcularRentabilidad(formattedIngresos, formattedGastos);
      
      const unidadData = {
        ...formData,
        ingresos: formattedIngresos,
        gastos: formattedGastos,
        rentabilidad: rentabilidad,
        id: unidad ? unidad.id : Date.now()
      };
      
      onSubmit(unidadData);
    };

    return (
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{unidad ? 'Editar Unidad de Negocio' : 'Registrar Nueva Unidad de Negocio'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Nombre de la unidad"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="responsable">Responsable</label>
              <input
                type="text"
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Nombre del responsable"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="ingresos">Ingresos</label>
              <input
                type="number"
                id="ingresos"
                name="ingresos"
                value={formData.ingresos}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="gastos">Gastos</label>
              <input
                type="number"
                id="gastos"
                name="gastos"
                value={formData.gastos}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="0.00"
                step="0.01"
                min="0"
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
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="En desarrollo">En desarrollo</option>
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
                placeholder="Descripción detallada de la unidad de negocio"
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
              {unidad ? 'Actualizar Unidad' : 'Guardar Unidad'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const UnidadesList = ({ unidades, onAddClick, onEditClick }) => {
    return (
      <div className={styles.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className={styles.tableTitle}>Unidades de Negocio</h3>
          <button 
            className={styles.addButton}
            onClick={onAddClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nueva Unidad
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Responsable</th>
                <th>Ingresos</th>
                <th>Gastos</th>
                <th>Rentabilidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {unidades.map((unidad) => (
                <tr key={unidad.id}>
                  <td>{unidad.nombre}</td>
                  <td className={styles.description}>
                    {unidad.descripcion.length > 15 
                      ? `${unidad.descripcion.substring(0, 15)}...` 
                      : unidad.descripcion}
                  </td>
                  <td>{unidad.responsable}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>{unidad.ingresos}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}>{unidad.gastos}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{unidad.rentabilidad}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${unidad.estado === 'Activa' ? 'Pagada' : unidad.estado === 'Inactiva' ? 'Vencida' : 'Pendiente'}`]}`}>
                      {unidad.estado}
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
                      onClick={() => onEditClick(unidad)}
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
            <h1 style={{ color: 'var(--text-color)' }}>Gestión de Unidades de Negocio</h1>
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
                title="Rentabilidad por Unidad de Negocio" 
                type="bar" 
                options={rentabilidadUnidadesOptions} 
              />
            </div>
          )}
          
          {showForm ? (
            <UnidadForm 
              unidad={currentUnidad} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <UnidadesList 
              unidades={unidades} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnidadesGestion;