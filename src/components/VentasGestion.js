import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import VentasList from './VentasList';
import VentasForm from './VentasForm';
import Chart from './Chart';
import styles from './Dashboard.module.css';

// Datos simulados para la página de ventas
const ventasData = [
  {
    id: 1,
    name: 'Producto A',
    description: 'Software de gestión empresarial',
    createdBy: 'Empresa XYZ',
    date: '15/11/2023',
    amount: '$25,450.00',
    type: 'income'
  },
  {
    id: 2,
    name: 'Producto B',
    description: 'Servicio de consultoría',
    createdBy: 'Corporación ABC',
    date: '12/11/2023',
    amount: '$18,700.00',
    type: 'income'
  },
  {
    id: 3,
    name: 'Producto C',
    description: 'Licencias de software',
    createdBy: 'Empresa 123',
    date: '10/11/2023',
    amount: '$14,300.00',
    type: 'income'
  },
  {
    id: 4,
    name: 'Producto D',
    description: 'Servicios de soporte técnico',
    createdBy: 'Compañía DEF',
    date: '08/11/2023',
    amount: '$11,200.00',
    type: 'income'
  },
  {
    id: 5,
    name: 'Otros productos',
    description: 'Varios productos y servicios',
    createdBy: 'Cliente Minorista',
    date: '05/11/2023',
    amount: '$8,800.00',
    type: 'income'
  }
];

// Datos para el gráfico de ventas por producto
const ventasPorProductoOptions = {
  title: {
    text: 'Ventas por producto (mes actual)',
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
    name: 'Ventas por producto',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [
      { value: 25450, name: 'Producto A' },
      { value: 18700, name: 'Producto B' },
      { value: 14300, name: 'Producto C' },
      { value: 11200, name: 'Producto D' },
      { value: 8800, name: 'Otros' }
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
        const colorList = ['#1976d2', '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb'];
        return colorList[params.dataIndex];
      }
    }
  }]
};

const VentasGestion = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [ventas, setVentas] = useState(ventasData);
  const [showChart, setShowChart] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAddClick = () => {
    setCurrentVenta(null); // Resetear la venta actual para crear una nueva
    setShowForm(true);
    setShowChart(false);
  };

  const handleEditClick = (venta) => {
    setCurrentVenta(venta);
    setShowForm(true);
    setShowChart(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentVenta(null);
  };

  const handleFormSubmit = (ventaData) => {
    if (currentVenta) {
      // Actualizar venta existente
      setVentas(ventas.map(v => v.id === ventaData.id ? ventaData : v));
    } else {
      // Agregar nueva venta
      setVentas([ventaData, ...ventas]);
    }
    setShowForm(false);
    setCurrentVenta(null);
  };

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (showForm) setShowForm(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`${styles.mainContent} ${sidebarExpanded ? styles.contentWithExpandedSidebar : ''}`}>
        <Toolbar />
        <div className={styles.contentWrapper}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ color: 'var(--text-color)' }}>Gestión de Ventas</h1>
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
                title="Ventas por producto" 
                type="pie" 
                options={ventasPorProductoOptions} 
              />
            </div>
          )}
          
          {showForm ? (
            <VentasForm 
              venta={currentVenta} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
            />
          ) : (
            <VentasList 
              ventas={ventas} 
              onAddClick={handleAddClick} 
              onEditClick={handleEditClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VentasGestion;