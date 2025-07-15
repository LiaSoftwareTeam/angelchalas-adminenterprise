import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import DeudasList from './DeudasList';
import DeudasForm from './DeudasForm';
import Chart from './Chart';
import styles from './Dashboard.module.css';

const DeudasGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentDeuda, setCurrentDeuda] = useState(null);
  const [showChart, setShowChart] = useState(false);
  
  // Datos simulados de cuentas por pagar
  const [deudas, setDeudas] = useState([
    {
      id: 1,
      proveedor: 'Suministros Técnicos',
      descripcion: 'Compra de equipos informáticos',
      fechaEmision: '10/05/2023',
      fechaVencimiento: '10/06/2023',
      monto: '$3,200.00',
      estado: 'Pagada'
    },
    {
      id: 2,
      proveedor: 'Servicios Digitales S.A.',
      descripcion: 'Licencias de software',
      fechaEmision: '15/05/2023',
      fechaVencimiento: '15/06/2023',
      monto: '$1,800.00',
      estado: 'Pendiente'
    },
    {
      id: 3,
      proveedor: 'Oficina Moderna',
      descripcion: 'Mobiliario de oficina',
      fechaEmision: '01/06/2023',
      fechaVencimiento: '01/07/2023',
      monto: '$4,500.00',
      estado: 'Vencida'
    },
    {
      id: 4,
      proveedor: 'Consultores Asociados',
      descripcion: 'Servicios de consultoría',
      fechaEmision: '20/06/2023',
      fechaVencimiento: '20/07/2023',
      monto: '$2,800.00',
      estado: 'Parcial'
    },
    {
      id: 5,
      proveedor: 'Distribuidora Nacional',
      descripcion: 'Materiales de oficina',
      fechaEmision: '05/07/2023',
      fechaVencimiento: '05/08/2023',
      monto: '$950.00',
      estado: 'Pendiente'
    }
  ]);

  // Configuración para el gráfico de cuentas por pagar por estado
  const deudasPorEstadoOptions = {
    title: {
      text: 'Cuentas por Pagar por Estado',
      left: 'center',
      textStyle: {
        color: '#0a2463',
        fontWeight: 'normal',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      show: true,
      textStyle: {
        color: '#0a2463'
      }
    },
    series: [
      {
        name: 'Estado',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
          color: '#0a2463'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        color: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
        data: [
          { value: 1, name: 'Pagada' },
          { value: 2, name: 'Pendiente' },
          { value: 1, name: 'Vencida' },
          { value: 1, name: 'Parcial' }
        ]
      }
    ]
  };

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleAddClick = () => {
    setCurrentDeuda(null);
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (deuda) => {
    setCurrentDeuda(deuda);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormSubmit = (deudaData) => {
    if (currentDeuda) {
      // Actualizar deuda existente
      setDeudas(deudas.map(d => d.id === deudaData.id ? deudaData : d));
    } else {
      // Agregar nueva deuda
      setDeudas([...deudas, deudaData]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleToggleChart = () => {
    setShowChart(!showChart);
    if (!showChart) {
      setShowForm(false);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar expanded={sidebarExpanded} onToggle={handleToggleSidebar} />
      <div className={styles.mainContent}>
        <Toolbar title="Gestión de Cuentas por Pagar" />
        
        <div className={styles.contentWrapper}>
          <div className={styles.actionButtons} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleToggleChart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: showChart ? 'var(--primary-color)' : 'var(--background-color)',
                color: showChart ? 'white' : 'var(--text-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
              {showChart ? 'Ocultar Gráfico' : 'Mostrar Gráfico'}
            </button>
          </div>
          
          {showChart && (
            <div className={styles.chartRow}>
              <div className={styles.chartWrapper} style={{ width: '100%', height: '400px' }}>
                <Chart type="pie" options={deudasPorEstadoOptions} />
              </div>
            </div>
          )}
          
          {showForm ? (
            <DeudasForm 
              deuda={currentDeuda} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <DeudasList 
              deudas={deudas} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeudasGestion;