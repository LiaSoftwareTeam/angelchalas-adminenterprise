import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import styles from './Dashboard.module.css';
import Chart from './Chart';

// Datos simulados para la gestión de comparativas
const comparativasData = [
  {
    id: 1,
    periodo: 'Enero 2023',
    tipo: 'Mensual',
    ingresos: '$42,500.00',
    gastos: '$28,000.00',
    utilidad: '$14,500.00',
    margen: '34.1%',
    comparacion: '+12.5%'
  },
  {
    id: 2,
    periodo: 'Febrero 2023',
    tipo: 'Mensual',
    ingresos: '$45,000.00',
    gastos: '$29,500.00',
    utilidad: '$15,500.00',
    margen: '34.4%',
    comparacion: '+6.9%'
  },
  {
    id: 3,
    periodo: 'Marzo 2023',
    tipo: 'Mensual',
    ingresos: '$48,200.00',
    gastos: '$31,000.00',
    utilidad: '$17,200.00',
    margen: '35.7%',
    comparacion: '+11.0%'
  },
  {
    id: 4,
    periodo: 'Q1 2023',
    tipo: 'Trimestral',
    ingresos: '$135,700.00',
    gastos: '$88,500.00',
    utilidad: '$47,200.00',
    margen: '34.8%',
    comparacion: '+9.8%'
  },
  {
    id: 5,
    periodo: 'Año 2022',
    tipo: 'Anual',
    ingresos: '$520,000.00',
    gastos: '$345,000.00',
    utilidad: '$175,000.00',
    margen: '33.7%',
    comparacion: '+15.2%'
  }
];

// Datos para el gráfico de comparativa de ingresos vs gastos
const comparativaIngresosGastosOptions = {
  title: {
    text: 'Comparativa de Ingresos vs Gastos',
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
    data: ['Ingresos', 'Gastos', 'Utilidad'],
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
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
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
      data: [42500, 45000, 48200, 46800, 49500, 52000],
      itemStyle: {
        color: '#4ade80'
      }
    },
    {
      name: 'Gastos',
      type: 'bar',
      data: [28000, 29500, 31000, 30500, 32000, 33500],
      itemStyle: {
        color: '#f87171'
      }
    },
    {
      name: 'Utilidad',
      type: 'line',
      data: [14500, 15500, 17200, 16300, 17500, 18500],
      itemStyle: {
        color: '#60a5fa'
      }
    }
  ]
};

const ComparativasGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentComparativa, setCurrentComparativa] = useState(null);
  const [comparativas, setComparativas] = useState(comparativasData);
  const [showChart, setShowChart] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAddClick = () => {
    setCurrentComparativa(null);
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (comparativa) => {
    setCurrentComparativa(comparativa);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentComparativa(null);
  };

  const handleFormSubmit = (comparativaData) => {
    if (currentComparativa) {
      // Actualizar comparativa existente
      setComparativas(comparativas.map(c => c.id === comparativaData.id ? comparativaData : c));
    } else {
      // Agregar nueva comparativa
      setComparativas([comparativaData, ...comparativas]);
    }
    setShowForm(false);
    setCurrentComparativa(null);
  };

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (showForm) setShowForm(false);
  };

  // Calcular la utilidad y el margen basados en ingresos y gastos
  const calcularUtilidad = (ingresos, gastos) => {
    const ingresosNum = parseFloat(ingresos.replace(/[^0-9.-]+/g, ''));
    const gastosNum = parseFloat(gastos.replace(/[^0-9.-]+/g, ''));
    
    return (ingresosNum - gastosNum).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calcularMargen = (ingresos, gastos) => {
    const ingresosNum = parseFloat(ingresos.replace(/[^0-9.-]+/g, ''));
    const gastosNum = parseFloat(gastos.replace(/[^0-9.-]+/g, ''));
    
    if (ingresosNum === 0) return '0.0%';
    
    const margen = ((ingresosNum - gastosNum) / ingresosNum) * 100;
    return margen.toFixed(1) + '%';
  };

  const ComparativaForm = ({ comparativa, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      periodo: '',
      tipo: 'Mensual',
      ingresos: '',
      gastos: '',
      utilidad: '',
      margen: '',
      comparacion: ''
    });

    React.useEffect(() => {
      if (comparativa) {
        setFormData({
          id: comparativa.id,
          periodo: comparativa.periodo || '',
          tipo: comparativa.tipo || 'Mensual',
          ingresos: comparativa.ingresos ? comparativa.ingresos.replace('$', '').replace(',', '') : '',
          gastos: comparativa.gastos ? comparativa.gastos.replace('$', '').replace(',', '') : '',
          utilidad: comparativa.utilidad || '',
          margen: comparativa.margen || '',
          comparacion: comparativa.comparacion || ''
        });
      }
    }, [comparativa]);

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
      
      // Calcular utilidad y margen
      const utilidad = calcularUtilidad(formattedIngresos, formattedGastos);
      const margen = calcularMargen(formattedIngresos, formattedGastos);
      
      const comparativaData = {
        ...formData,
        ingresos: formattedIngresos,
        gastos: formattedGastos,
        utilidad: utilidad,
        margen: margen,
        id: comparativa ? comparativa.id : Date.now()
      };
      
      onSubmit(comparativaData);
    };

    return (
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{comparativa ? 'Editar Comparativa' : 'Registrar Nueva Comparativa'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="periodo">Periodo</label>
              <input
                type="text"
                id="periodo"
                name="periodo"
                value={formData.periodo}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Ej: Enero 2023, Q1 2023"
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
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Anual">Anual</option>
              </select>
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
              <label className={styles.formLabel} htmlFor="comparacion">Comparación</label>
              <input
                type="text"
                id="comparacion"
                name="comparacion"
                value={formData.comparacion}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Ej: +10.5%, -5.2%"
                required
              />
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
              {comparativa ? 'Actualizar Comparativa' : 'Guardar Comparativa'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ComparativasList = ({ comparativas, onAddClick, onEditClick }) => {
    return (
      <div className={styles.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className={styles.tableTitle}>Comparativas Financieras</h3>
          <button 
            className={styles.addButton}
            onClick={onAddClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nueva Comparativa
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Tipo</th>
                <th>Ingresos</th>
                <th>Gastos</th>
                <th>Utilidad</th>
                <th>Margen</th>
                <th>Comparación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comparativas.map((comparativa) => (
                <tr key={comparativa.id}>
                  <td>{comparativa.periodo}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${comparativa.tipo === 'Mensual' ? 'Pendiente' : comparativa.tipo === 'Trimestral' ? 'Pagada' : 'Vencida'}`]}`}>
                      {comparativa.tipo}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>{comparativa.ingresos}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}>{comparativa.gastos}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{comparativa.utilidad}</td>
                  <td>{comparativa.margen}</td>
                  <td style={{ 
                    fontWeight: 'bold', 
                    color: comparativa.comparacion.startsWith('+') ? 'var(--success-color)' : 'var(--danger-color)' 
                  }}>
                    {comparativa.comparacion}
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
                      onClick={() => onEditClick(comparativa)}
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
            <h1 style={{ color: 'var(--text-color)' }}>Gestión de Comparativas</h1>
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
                title="Comparativa de Ingresos vs Gastos" 
                type="bar" 
                options={comparativaIngresosGastosOptions} 
              />
            </div>
          )}
          
          {showForm ? (
            <ComparativaForm 
              comparativa={currentComparativa} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <ComparativasList 
              comparativas={comparativas} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparativasGestion;