import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de flujo de caja
const flujoSummaryData = [
  {
    id: 1,
    title: 'Flujo neto actual',
    value: '$45,780.00',
    trend: 'up',
    trendValue: '7.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Pronóstico a 30 días',
    value: '$52,450.00',
    trend: 'up',
    trendValue: '14.6%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Pronóstico a 90 días',
    value: '$68,320.00',
    trend: 'up',
    trendValue: '49.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Índice de liquidez',
    value: '1.85',
    trend: 'up',
    trendValue: '0.12',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

// Datos para el gráfico de pronóstico de flujo de caja
const pronosticoFlujoOptions = {
  title: {
    text: 'Pronóstico de flujo de caja a 90 días',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>{a0}: ${c0}'
  },
  legend: {
    data: ['Flujo de caja proyectado'],
    bottom: '0%',
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
    data: [
      'Hoy', 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 
      'Semana 7', 'Semana 8', 'Semana 9', 'Semana 10', 'Semana 11', 'Semana 12'
    ],
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc',
      rotate: 45,
      interval: 0
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc',
      formatter: '${value}'
    },
    splitLine: {
      lineStyle: {
        color: '#e6f0fa'
      }
    }
  },
  series: [{
    name: 'Flujo de caja proyectado',
    type: 'line',
    smooth: true,
    data: [45780, 48200, 50100, 49500, 52450, 54800, 56200, 58500, 60800, 63200, 65500, 67800, 68320],
    itemStyle: {
      color: '#1976d2'
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(25, 118, 210, 0.5)'
        }, {
          offset: 1,
          color: 'rgba(25, 118, 210, 0.05)'
        }]
      }
    },
    markPoint: {
      data: [
        { type: 'max', name: 'Máximo' },
        { type: 'min', name: 'Mínimo' }
      ]
    },
    markLine: {
      data: [
        { type: 'average', name: 'Promedio' }
      ]
    }
  }]
};

// Datos para el gráfico de ingresos vs egresos proyectados
const ingresosEgresosProyectadosOptions = {
  title: {
    text: 'Ingresos vs Egresos proyectados',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}'
  },
  legend: {
    data: ['Ingresos proyectados', 'Egresos proyectados'],
    bottom: '0%',
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
  xAxis: [
    {
      type: 'category',
      data: ['Dic', 'Ene', 'Feb', 'Mar'],
      axisPointer: {
        type: 'shadow'
      },
      axisLine: {
        lineStyle: {
          color: '#d6e4f0'
        }
      },
      axisLabel: {
        color: '#3e92cc'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Monto',
      min: 0,
      max: 200000,
      interval: 40000,
      axisLabel: {
        formatter: '${value}',
        color: '#3e92cc'
      },
      axisLine: {
        lineStyle: {
          color: '#d6e4f0'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#e6f0fa'
        }
      }
    }
  ],
  series: [
    {
      name: 'Ingresos proyectados',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [125000, 135000, 145000, 155000]
    },
    {
      name: 'Egresos proyectados',
      type: 'bar',
      itemStyle: {
        color: '#64b5f6'
      },
      data: [80000, 82000, 85000, 87000]
    }
  ]
};

// Datos para el gráfico de índice de liquidez proyectado
const indiceLiquidezOptions = {
  title: {
    text: 'Índice de liquidez proyectado',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}'
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
    data: ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc'
    }
  },
  yAxis: {
    type: 'value',
    min: 1,
    max: 2.5,
    interval: 0.3,
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc'
    },
    splitLine: {
      lineStyle: {
        color: '#e6f0fa'
      }
    }
  },
  series: [{
    data: [1.56, 1.65, 1.72, 1.85, 1.92, 2.05, 2.18],
    type: 'line',
    smooth: true,
    itemStyle: {
      color: '#1976d2'
    },
    markLine: {
      silent: true,
      lineStyle: {
        color: '#f87171'
      },
      data: [{
        yAxis: 1.5,
        name: 'Nivel óptimo'
      }]
    }
  }]
};

// Datos para la tabla de transacciones proyectadas
const transaccionesProyectadasData = [
  {
    id: 1,
    name: 'Factura #2350',
    description: 'Servicios de consultoría',
    createdBy: 'Proyección',
    date: '15/12/2023',
    amount: 15000.00,
    type: 'income',
    status: 'Proyectado'
  },
  {
    id: 2,
    name: 'Factura #2355',
    description: 'Desarrollo de software',
    createdBy: 'Proyección',
    date: '20/12/2023',
    amount: 22000.00,
    type: 'income',
    status: 'Proyectado'
  },
  {
    id: 3,
    name: 'Pago de nómina',
    description: 'Nómina de diciembre',
    createdBy: 'Proyección',
    date: '28/12/2023',
    amount: -32000.00,
    type: 'expense',
    status: 'Proyectado'
  },
  {
    id: 4,
    name: 'Factura #2360',
    description: 'Servicios de mantenimiento',
    createdBy: 'Proyección',
    date: '05/01/2024',
    amount: 8500.00,
    type: 'income',
    status: 'Proyectado'
  },
  {
    id: 5,
    name: 'Pago de impuestos',
    description: 'Impuestos trimestrales',
    createdBy: 'Proyección',
    date: '15/01/2024',
    amount: -18500.00,
    type: 'expense',
    status: 'Proyectado'
  }
];

const FlujoPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`${styles.mainContent} ${sidebarExpanded ? styles.contentWithExpandedSidebar : ''}`}>
        <Toolbar />
        <div className={styles.contentWrapper}>
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Pronóstico de Flujo de Caja</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {flujoSummaryData.map((card) => (
              <SummaryCard 
                key={card.id}
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
                trendValue={card.trendValue}
              />
            ))}
          </div>
          
          {/* Gráficos */}
          <div className={styles.chartsContainer}>
            <div className={styles.chartItem}>
              <Chart 
                title="Pronóstico de flujo de caja a 90 días" 
                type="line" 
                options={pronosticoFlujoOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Ingresos vs Egresos proyectados" 
                type="bar" 
                options={ingresosEgresosProyectadosOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Índice de liquidez proyectado" 
                type="line" 
                options={indiceLiquidezOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de transacciones proyectadas */}
          <TransactionsTable transactions={transaccionesProyectadasData} title="Transacciones proyectadas" />
        </div>
      </div>
    </div>
  );
};

export default FlujoPage;