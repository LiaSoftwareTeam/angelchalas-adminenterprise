import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de unidades de negocio
const unidadesSummaryData = [
  {
    id: 1,
    title: 'Unidad A: Ingresos',
    value: '$58,450.00',
    trend: 'up',
    trendValue: '12.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Unidad B: Ingresos',
    value: '$42,780.00',
    trend: 'up',
    trendValue: '8.5%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Unidad C: Ingresos',
    value: '$35,320.00',
    trend: 'down',
    trendValue: '3.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
        <polyline points="17 18 23 18 23 12"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Unidad D: Ingresos',
    value: '$28,650.00',
    trend: 'up',
    trendValue: '5.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  }
];

// Datos para el gráfico de ingresos por unidad de negocio
const ingresosPorUnidadOptions = {
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
      type: 'shadow'
    },
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}<br/>{a2}: ${c2}<br/>{a3}: ${c3}'
  },
  legend: {
    data: ['Unidad A', 'Unidad B', 'Unidad C', 'Unidad D'],
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
      name: 'Unidad A',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#1976d2'
      },
      data: [35000, 38000, 40000, 42000, 45000, 48000, 50000, 52000, 54000, 56000, 58000, 58450]
    },
    {
      name: 'Unidad B',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#42a5f5'
      },
      data: [28000, 30000, 32000, 34000, 36000, 37000, 38000, 39000, 40000, 41000, 42000, 42780]
    },
    {
      name: 'Unidad C',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#64b5f6'
      },
      data: [38000, 37000, 36000, 35000, 36000, 35000, 34000, 35000, 34000, 35000, 36000, 35320]
    },
    {
      name: 'Unidad D',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#90caf9'
      },
      data: [22000, 23000, 24000, 25000, 26000, 26500, 27000, 27500, 28000, 28500, 28000, 28650]
    }
  ]
};

// Datos para el gráfico de rentabilidad por unidad de negocio
const rentabilidadPorUnidadOptions = {
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
  legend: {
    data: ['Unidad A', 'Unidad B', 'Unidad C', 'Unidad D'],
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
    min: 0,
    max: 40,
    interval: 10,
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
  series: [
    {
      name: 'Unidad A',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#1976d2'
      },
      data: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    },
    {
      name: 'Unidad B',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#42a5f5'
      },
      data: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
    },
    {
      name: 'Unidad C',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#64b5f6'
      },
      data: [15, 14, 13, 14, 15, 14, 13, 14, 15, 16, 15, 14]
    },
    {
      name: 'Unidad D',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#90caf9'
      },
      data: [20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 26, 25]
    }
  ]
};

// Datos para el gráfico de distribución de ingresos por unidad
const distribucionIngresosOptions = {
  title: {
    text: '',
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
    name: 'Ingresos por unidad',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 2
    },
    color: ['#1976d2', '#42a5f5', '#64b5f6', '#90caf9'],
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '14',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: [
      { value: 58450, name: 'Unidad A' },
      { value: 42780, name: 'Unidad B' },
      { value: 35320, name: 'Unidad C' },
      { value: 28650, name: 'Unidad D' }
    ]
  }]
};

// Datos para la tabla de indicadores por unidad de negocio
const indicadoresUnidadesData = [
  {
    id: 1,
    name: 'Unidad A',
    description: 'Desarrollo de software',
    ingresos: '$58,450.00',
    egresos: '$39,250.00',
    margen: '32.8%',
    roi: '28.5%',
    tendencia: 'up'
  },
  {
    id: 2,
    name: 'Unidad B',
    description: 'Consultoría',
    ingresos: '$42,780.00',
    egresos: '$30,350.00',
    margen: '29.1%',
    roi: '25.2%',
    tendencia: 'up'
  },
  {
    id: 3,
    name: 'Unidad C',
    description: 'Infraestructura',
    ingresos: '$35,320.00',
    egresos: '$30,450.00',
    margen: '13.8%',
    roi: '11.5%',
    tendencia: 'down'
  },
  {
    id: 4,
    name: 'Unidad D',
    description: 'Marketing digital',
    ingresos: '$28,650.00',
    egresos: '$21,480.00',
    margen: '25.0%',
    roi: '22.3%',
    tendencia: 'up'
  }
];

const UnidadesPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  // Componente personalizado para la tabla de indicadores por unidad
  const IndicadoresUnidadesTable = ({ data, title }) => {
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>{title}</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Descripción</th>
                <th>Ingresos</th>
                <th>Egresos</th>
                <th>Margen</th>
                <th>ROI</th>
                <th>Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                  <td className={styles.description}>{item.description}</td>
                  <td>{item.ingresos}</td>
                  <td>{item.egresos}</td>
                  <td>{item.margen}</td>
                  <td>{item.roi}</td>
                  <td>
                    {item.tendencia === 'up' ? (
                      <span style={{ color: 'var(--success-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </span>
                    ) : (
                      <span style={{ color: 'var(--danger-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    )}
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
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Indicadores por Unidad de Negocio</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {unidadesSummaryData.map((card) => (
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
                title="Ingresos por unidad de negocio" 
                type="bar" 
                options={ingresosPorUnidadOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Rentabilidad por unidad de negocio" 
                type="line" 
                options={rentabilidadPorUnidadOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Distribución de ingresos por unidad" 
                type="pie" 
                options={distribucionIngresosOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de indicadores por unidad */}
          <IndicadoresUnidadesTable data={indicadoresUnidadesData} title="Indicadores por unidad de negocio" />
        </div>
      </div>
    </div>
  );
};

export default UnidadesPage;