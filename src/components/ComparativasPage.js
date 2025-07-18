import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de comparativas
const comparativasSummaryData = [
  {
    id: 1,
    title: 'Crecimiento mensual',
    value: '8.5%',
    trend: 'up',
    trendValue: '1.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Crecimiento trimestral',
    value: '15.2%',
    trend: 'up',
    trendValue: '3.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Crecimiento anual',
    value: '24.7%',
    trend: 'up',
    trendValue: '5.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Rentabilidad',
    value: '18.3%',
    trend: 'up',
    trendValue: '2.5%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    )
  }
];

// Datos para el gráfico de comparativa mensual
const comparativaMensualOptions = {
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
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}<br/>{a2}: ${c2}'
  },
  legend: {
    data: ['Ingresos', 'Egresos', 'Neto'],
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
      max: 150000,
      interval: 30000,
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
      name: 'Ingresos',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [85000, 92000, 88000, 95000, 100000, 98000, 105000, 110000, 108000, 115000, 120000, 125000]
    },
    {
      name: 'Egresos',
      type: 'bar',
      itemStyle: {
        color: '#64b5f6'
      },
      data: [65000, 68000, 70000, 72000, 75000, 73000, 78000, 80000, 82000, 85000, 88000, 90000]
    },
    {
      name: 'Neto',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#0d47a1'
      },
      data: [20000, 24000, 18000, 23000, 25000, 25000, 27000, 30000, 26000, 30000, 32000, 35000]
    }
  ]
};

// Datos para el gráfico de comparativa trimestral
const comparativaTrimestreOptions = {
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
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}<br/>{a2}: ${c2}'
  },
  legend: {
    data: ['Ingresos', 'Egresos', 'Neto'],
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
      data: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
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
      max: 400000,
      interval: 80000,
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
      name: 'Ingresos',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [220000, 235000, 245000, 260000, 265000, 280000, 295000, 310000]
    },
    {
      name: 'Egresos',
      type: 'bar',
      itemStyle: {
        color: '#64b5f6'
      },
      data: [180000, 190000, 195000, 205000, 210000, 220000, 230000, 240000]
    },
    {
      name: 'Neto',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#0d47a1'
      },
      data: [40000, 45000, 50000, 55000, 55000, 60000, 65000, 70000]
    }
  ]
};

// Datos para el gráfico de comparativa anual
const comparativaAnualOptions = {
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
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}<br/>{a2}: ${c2}'
  },
  legend: {
    data: ['Ingresos', 'Egresos', 'Neto'],
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
      data: ['2018', '2019', '2020', '2021', '2022', '2023'],
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
      max: 1500000,
      interval: 300000,
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
      name: 'Ingresos',
      type: 'bar',
      itemStyle: {
        color: '#1976d2'
      },
      data: [750000, 820000, 780000, 880000, 950000, 1150000]
    },
    {
      name: 'Egresos',
      type: 'bar',
      itemStyle: {
        color: '#64b5f6'
      },
      data: [620000, 680000, 670000, 730000, 780000, 920000]
    },
    {
      name: 'Neto',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#0d47a1'
      },
      data: [130000, 140000, 110000, 150000, 170000, 230000]
    }
  ]
};

// Datos para la tabla de indicadores comparativos
const indicadoresComparativosData = [
  {
    id: 1,
    name: 'Margen bruto',
    description: 'Comparativa anual',
    createdBy: 'Sistema',
    date: '31/12/2023',
    amount: '32.5%',
    previousAmount: '30.2%',
    change: '+2.3%',
    type: 'indicator'
  },
  {
    id: 2,
    name: 'Margen operativo',
    description: 'Comparativa anual',
    createdBy: 'Sistema',
    date: '31/12/2023',
    amount: '24.8%',
    previousAmount: '22.5%',
    change: '+2.3%',
    type: 'indicator'
  },
  {
    id: 3,
    name: 'ROI',
    description: 'Comparativa anual',
    createdBy: 'Sistema',
    date: '31/12/2023',
    amount: '18.3%',
    previousAmount: '15.8%',
    change: '+2.5%',
    type: 'indicator'
  },
  {
    id: 4,
    name: 'Rotación de inventario',
    description: 'Comparativa anual',
    createdBy: 'Sistema',
    date: '31/12/2023',
    amount: '8.5',
    previousAmount: '7.2',
    change: '+1.3',
    type: 'indicator'
  },
  {
    id: 5,
    name: 'Ratio de endeudamiento',
    description: 'Comparativa anual',
    createdBy: 'Sistema',
    date: '31/12/2023',
    amount: '42.5%',
    previousAmount: '45.8%',
    change: '-3.3%',
    type: 'indicator'
  }
];

const ComparativasPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const router = useRouter();

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };
  
  const navigateToGestion = () => {
    router.push('/comparativas/gestion');
  };

  // Componente personalizado para la tabla de indicadores comparativos
  const IndicadoresTable = ({ data, title }) => {
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>{title}</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Valor actual</th>
                <th>Valor anterior</th>
                <th>Cambio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className={styles.description}>{item.description}</td>
                  <td>{item.date}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.amount}</td>
                  <td>{item.previousAmount}</td>
                  <td style={{ 
                    color: item.change.startsWith('+') ? 'var(--success-color)' : 'var(--danger-color)',
                    fontWeight: 'bold'
                  }}>
                    {item.change}
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
            <h1 style={{ color: 'var(--text-color)' }}>Comparativas Históricas</h1>
            <button 
              onClick={navigateToGestion}
              style={{
                padding: '0.75rem 1.25rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Gestionar Comparativas
            </button>
          </div>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {comparativasSummaryData.map((card) => (
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
                title="Comparativa mensual: Ingresos vs Egresos" 
                type="mixed" 
                options={comparativaMensualOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Comparativa trimestral: Ingresos vs Egresos" 
                type="mixed" 
                options={comparativaTrimestreOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Comparativa anual: Ingresos vs Egresos" 
                type="mixed" 
                options={comparativaAnualOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de indicadores comparativos */}
          <IndicadoresTable data={indicadoresComparativosData} title="Indicadores comparativos" />
        </div>
      </div>
    </div>
  );
};

export default ComparativasPage;