import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de cuentas
const cuentasSummaryData = [
  {
    id: 1,
    title: 'Cuentas por cobrar',
    value: '$87,450.00',
    trend: 'up',
    trendValue: '5.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Cuentas por pagar',
    value: '$42,180.00',
    trend: 'down',
    trendValue: '3.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Días promedio de cobro',
    value: '32 días',
    trend: 'down',
    trendValue: '2 días',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Días promedio de pago',
    value: '45 días',
    trend: 'up',
    trendValue: '3 días',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  }
];

// Datos para el gráfico de cuentas por cobrar por antigüedad
const cuentasPorCobrarOptions = {
  title: {
    text: 'Cuentas por cobrar por antigüedad',
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
    data: ['0-30 días', '31-60 días', '61-90 días', '+90 días'],
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
  series: [
    {
      name: '0-30 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#1976d2'
      },
      data: [12000, 15000, 18000, 14000, 16000, 19000, 17000, 20000, 22000, 19000, 23000, 25000]
    },
    {
      name: '31-60 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#64b5f6'
      },
      data: [8000, 9000, 7500, 10000, 8500, 9500, 11000, 9000, 10500, 12000, 11500, 13000]
    },
    {
      name: '61-90 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#bbdefb'
      },
      data: [5000, 4500, 6000, 5500, 7000, 6500, 5800, 7200, 6800, 7500, 8000, 7800]
    },
    {
      name: '+90 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#e3f2fd'
      },
      data: [3000, 3500, 2800, 4000, 3200, 3800, 4200, 3600, 4500, 4800, 4200, 5000]
    }
  ]
};

// Datos para el gráfico de cuentas por pagar por antigüedad
const cuentasPorPagarOptions = {
  title: {
    text: 'Cuentas por pagar por antigüedad',
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
    data: ['0-30 días', '31-60 días', '61-90 días', '+90 días'],
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
  series: [
    {
      name: '0-30 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#0d47a1'
      },
      data: [8000, 9500, 7800, 10200, 9000, 11000, 10500, 12000, 11500, 13000, 12500, 14000]
    },
    {
      name: '31-60 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#1976d2'
      },
      data: [5000, 4800, 5500, 5200, 6000, 5800, 6500, 6200, 7000, 6800, 7500, 7200]
    },
    {
      name: '61-90 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#42a5f5'
      },
      data: [2500, 3000, 2800, 3200, 3000, 3500, 3300, 3800, 3600, 4000, 3800, 4200]
    },
    {
      name: '+90 días',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#90caf9'
      },
      data: [1500, 1800, 1600, 2000, 1800, 2200, 2000, 2400, 2200, 2600, 2400, 2800]
    }
  ]
};

// Datos para el gráfico de comparativa de cuentas por cobrar vs por pagar
const comparativaCuentasOptions = {
  title: {
    text: 'Comparativa: Cuentas por cobrar vs por pagar',
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
    data: ['Cuentas por cobrar', 'Cuentas por pagar'],
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
      name: 'Cuentas por cobrar',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [28000, 32000, 34300, 33500, 34700, 38800, 38000, 39800, 43800, 43300, 46700, 50800]
    },
    {
      name: 'Cuentas por pagar',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#0d47a1'
      },
      data: [17000, 19100, 17700, 20600, 19800, 22500, 22300, 24400, 24300, 26400, 26200, 28200]
    }
  ]
};

// Datos para la tabla de cuentas por cobrar
const cuentasPorCobrarData = [
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

const CuentasPage = () => {
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
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Cuentas por Cobrar y por Pagar</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {cuentasSummaryData.map((card) => (
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
                title="Cuentas por cobrar por antigüedad" 
                type="bar" 
                options={cuentasPorCobrarOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Cuentas por pagar por antigüedad" 
                type="bar" 
                options={cuentasPorPagarOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Comparativa: Cuentas por cobrar vs por pagar" 
                type="mixed" 
                options={comparativaCuentasOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de cuentas por cobrar */}
          <TransactionsTable transactions={cuentasPorCobrarData} title="Cuentas por cobrar pendientes" />
        </div>
      </div>
    </div>
  );
};

export default CuentasPage;