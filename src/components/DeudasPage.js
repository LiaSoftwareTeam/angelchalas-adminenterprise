import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de deudas
const deudasSummaryData = [
  {
    id: 1,
    title: 'Deudas totales',
    value: '$156,780.00',
    trend: 'down',
    trendValue: '3.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Deudas activas',
    value: '$128,450.00',
    trend: 'down',
    trendValue: '5.1%',
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
    id: 3,
    title: 'Deudas vencidas',
    value: '$28,330.00',
    trend: 'up',
    trendValue: '2.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Ratio de endeudamiento',
    value: '42.5%',
    trend: 'down',
    trendValue: '1.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

// Datos para el gráfico de deudas por tipo
const deudasPorTipoOptions = {
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
    name: 'Deudas por tipo',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 2
    },
    color: ['#1976d2', '#3e92cc', '#0d47a1', '#64b5f6', '#bbdefb'],
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
      { value: 68500, name: 'Préstamos bancarios' },
      { value: 42300, name: 'Proveedores' },
      { value: 25800, name: 'Impuestos' },
      { value: 12500, name: 'Nómina' },
      { value: 7680, name: 'Otros' }
    ]
  }]
};

// Datos para el gráfico de deudas activas vs vencidas
const deudasActivasVsVencidasOptions = {
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
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}'
  },
  legend: {
    data: ['Deudas activas', 'Deudas vencidas'],
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
      name: 'Deudas activas',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#1976d2'
      },
      data: [110000, 115000, 120000, 118000, 125000, 122000, 128000, 126000, 130000, 128000, 132000, 128450]
    },
    {
      name: 'Deudas vencidas',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#f87171'
      },
      data: [15000, 18000, 20000, 22000, 25000, 24000, 26000, 25000, 28000, 27000, 29000, 28330]
    }
  ]
};

// Datos para el gráfico de evolución del ratio de endeudamiento
const ratioEndeudamientoOptions = {
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
    min: 30,
    max: 60,
    interval: 5,
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
    data: [48.5, 49.2, 50.1, 49.8, 48.5, 47.2, 46.8, 45.5, 44.8, 43.9, 43.2, 42.5],
    type: 'line',
    smooth: true,
    itemStyle: {
      color: '#1976d2'
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

// Datos para la tabla de deudas vencidas
const deudasVencidasData = [
  {
    id: 1,
    name: 'Préstamo #1234',
    description: 'Cuota mensual préstamo bancario',
    createdBy: 'Sistema',
    date: '15/11/2023',
    amount: -8500.00,
    type: 'expense',
    status: 'Vencido',
    daysOverdue: 5
  },
  {
    id: 2,
    name: 'Factura Proveedor #5678',
    description: 'Materiales de oficina',
    createdBy: 'Sistema',
    date: '05/11/2023',
    amount: -3200.00,
    type: 'expense',
    status: 'Vencido',
    daysOverdue: 15
  },
  {
    id: 3,
    name: 'Impuestos Q3',
    description: 'Pago trimestral de impuestos',
    createdBy: 'Sistema',
    date: '28/10/2023',
    amount: -12500.00,
    type: 'expense',
    status: 'Vencido',
    daysOverdue: 23
  },
  {
    id: 4,
    name: 'Factura Servicios #9012',
    description: 'Servicios de mantenimiento',
    createdBy: 'Sistema',
    date: '15/10/2023',
    amount: -1800.00,
    type: 'expense',
    status: 'Vencido',
    daysOverdue: 36
  },
  {
    id: 5,
    name: 'Alquiler Oficina',
    description: 'Alquiler mensual de oficina',
    createdBy: 'Sistema',
    date: '01/10/2023',
    amount: -4500.00,
    type: 'expense',
    status: 'Vencido',
    daysOverdue: 50
  }
];

const DeudasPage = () => {
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
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Deudas Activas y Vencidas</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {deudasSummaryData.map((card) => (
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
                title="Deudas por tipo" 
                type="pie" 
                options={deudasPorTipoOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Deudas activas vs vencidas" 
                type="bar" 
                options={deudasActivasVsVencidasOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Evolución del ratio de endeudamiento" 
                type="line" 
                options={ratioEndeudamientoOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de deudas vencidas */}
          <TransactionsTable transactions={deudasVencidasData} title="Deudas vencidas" />
        </div>
      </div>
    </div>
  );
};

export default DeudasPage;