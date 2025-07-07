import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de cobros
const cobrosSummaryData = [
  {
    id: 1,
    title: 'Cobros recibidos',
    value: '$98,750.00',
    trend: 'up',
    trendValue: '8.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Cobros pendientes',
    value: '$45,320.00',
    trend: 'down',
    trendValue: '4.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Tasa de cobro',
    value: '68.5%',
    trend: 'up',
    trendValue: '2.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Tiempo promedio de cobro',
    value: '28 días',
    trend: 'down',
    trendValue: '3 días',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  }
];

// Datos para el gráfico de cobros recibidos vs pendientes
const cobrosComparativaOptions = {
  title: {
    text: '',
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
    data: ['Cobros recibidos', 'Cobros pendientes'],
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
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
      max: 100000,
      interval: 20000,
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
      name: 'Cobros recibidos',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [35000, 42000, 38000, 45000, 50000, 48000, 55000, 60000, 58000, 65000, 70000, 75000]
    },
    {
      name: 'Cobros pendientes',
      type: 'bar',
      itemStyle: {
        color: '#64b5f6'
      },
      data: [25000, 22000, 28000, 24000, 20000, 25000, 22000, 18000, 24000, 20000, 15000, 18000]
    }
  ]
};

// Datos para el gráfico de tendencia de cobros
const tendenciaCobrosOptions = {
  title: {
    text: '',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>{a0}: ${c0}'
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
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
    data: [35000, 42000, 38000, 45000, 50000, 48000, 55000, 60000, 58000, 65000, 70000, 75000],
    type: 'line',
    smooth: true,
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
    }
  }],
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: ${c}'
  }
};

// Datos para el gráfico de eficiencia de cobros
const eficienciaCobrosOptions = {
  title: {
    text: '',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
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
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
    min: 0,
    max: 100,
    interval: 20,
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc',
      formatter: '{value}%'
    },
    splitLine: {
      lineStyle: {
        color: '#e6f0fa'
      }
    }
  },
  series: [{
    data: [58, 65, 57, 65, 71, 66, 71, 77, 71, 76, 82, 81],
    type: 'bar',
    itemStyle: {
      color: function(params) {
        // Colores basados en el valor (rojo para bajo, amarillo para medio, verde para alto)
        if (params.value < 60) {
          return '#f87171'; // Rojo claro
        } else if (params.value < 75) {
          return '#fbbf24'; // Amarillo
        } else {
          return '#4ade80'; // Verde
        }
      }
    },
    label: {
      show: true,
      position: 'top',
      formatter: '{c}%',
      fontSize: 12,
      color: '#0a2463'
    }
  }]
};

// Datos para la tabla de cobros pendientes
const cobrosPendientesData = [
  {
    id: 1,
    name: 'Factura #2345',
    description: 'Servicios de consultoría',
    createdBy: 'Sistema',
    date: '15/11/2023',
    amount: 12500.00,
    type: 'income',
    status: 'Pendiente',
    daysOverdue: 0
  },
  {
    id: 2,
    name: 'Factura #2340',
    description: 'Desarrollo de software',
    createdBy: 'Sistema',
    date: '05/11/2023',
    amount: 18000.00,
    type: 'income',
    status: 'Pendiente',
    daysOverdue: 10
  },
  {
    id: 3,
    name: 'Factura #2335',
    description: 'Mantenimiento mensual',
    createdBy: 'Sistema',
    date: '28/10/2023',
    amount: 5500.00,
    type: 'income',
    status: 'Pendiente',
    daysOverdue: 18
  },
  {
    id: 4,
    name: 'Factura #2330',
    description: 'Servicios de marketing',
    createdBy: 'Sistema',
    date: '15/10/2023',
    amount: 8500.00,
    type: 'income',
    status: 'Pendiente',
    daysOverdue: 31
  },
  {
    id: 5,
    name: 'Factura #2325',
    description: 'Implementación de sistema',
    createdBy: 'Sistema',
    date: '01/10/2023',
    amount: 22000.00,
    type: 'income',
    status: 'Pendiente',
    daysOverdue: 45
  }
];

const CobrosPage = () => {
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
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Cobros Recibidos vs Pendientes</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {cobrosSummaryData.map((card) => (
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
                title="Cobros recibidos vs pendientes" 
                type="bar" 
                options={cobrosComparativaOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Tendencia de cobros en el tiempo" 
                type="line" 
                options={tendenciaCobrosOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Eficiencia de cobros por mes" 
                type="bar" 
                options={eficienciaCobrosOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de cobros pendientes */}
          <TransactionsTable transactions={cobrosPendientesData} title="Cobros pendientes" />
        </div>
      </div>
    </div>
  );
};

export default CobrosPage;