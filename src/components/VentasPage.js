import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Datos simulados para la página de ventas
const ventasSummaryData = [
  {
    id: 1,
    title: 'Ventas diarias',
    value: '$3,850.00',
    trend: 'up',
    trendValue: '8.5%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Ventas mensuales',
    value: '$78,450.00',
    trend: 'up',
    trendValue: '12.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Ticket promedio',
    value: '$125.80',
    trend: 'up',
    trendValue: '3.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Productos vendidos',
    value: '623',
    trend: 'up',
    trendValue: '5.8%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    )
  }
];

// Datos para el gráfico de ventas diarias
const ventasDiariasOptions = {
  title: {
    text: 'Ventas diarias (últimos 30 días)',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>{a}: ${c}'
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
    data: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    axisLine: {
      lineStyle: {
        color: '#d6e4f0'
      }
    },
    axisLabel: {
      color: '#3e92cc',
      rotate: 45,
      interval: 2
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
      name: 'Ventas',
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
      },
      data: [
        3200, 3400, 3100, 3500, 3800, 3600, 3200, 3100, 3300, 3700,
        3900, 4100, 3800, 3600, 3400, 3200, 3500, 3700, 3900, 4200,
        4000, 3800, 3600, 3400, 3700, 3900, 4100, 4300, 4200, 3850
      ]
    }
  ]
};

// Datos para el gráfico de ventas mensuales
const ventasMensualesOptions = {
  title: {
    text: 'Ventas mensuales (último año)',
    left: 'center',
    textStyle: {
      color: '#0a2463'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>{a}: ${c}'
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
      name: 'Ventas',
      type: 'bar',
      barWidth: '60%',
      itemStyle: {
        color: '#1976d2',
        borderRadius: [4, 4, 0, 0]
      },
      data: [62000, 64000, 66000, 68000, 70000, 72000, 74000, 75000, 76000, 77000, 78000, 78450]
    }
  ]
};

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

// Datos para la tabla de ventas por producto
const ventasPorProductoData = [
  {
    id: 1,
    name: 'Producto A',
    description: 'Software de gestión empresarial',
    createdBy: 'Departamento de Ventas',
    date: '15/11/2023',
    amount: '$25,450.00',
    type: 'income'
  },
  {
    id: 2,
    name: 'Producto B',
    description: 'Servicio de consultoría',
    createdBy: 'Departamento de Ventas',
    date: '12/11/2023',
    amount: '$18,700.00',
    type: 'income'
  },
  {
    id: 3,
    name: 'Producto C',
    description: 'Licencias de software',
    createdBy: 'Departamento de Ventas',
    date: '10/11/2023',
    amount: '$14,300.00',
    type: 'income'
  },
  {
    id: 4,
    name: 'Producto D',
    description: 'Servicios de soporte técnico',
    createdBy: 'Departamento de Ventas',
    date: '08/11/2023',
    amount: '$11,200.00',
    type: 'income'
  },
  {
    id: 5,
    name: 'Otros productos',
    description: 'Varios productos y servicios',
    createdBy: 'Departamento de Ventas',
    date: '05/11/2023',
    amount: '$8,800.00',
    type: 'income'
  }
];

const VentasPage = () => {
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
          <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Análisis de Ventas</h1>
          
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {ventasSummaryData.map((card) => (
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
                title="Ventas diarias" 
                type="line" 
                options={ventasDiariasOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Ventas mensuales" 
                type="bar" 
                options={ventasMensualesOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Ventas por producto" 
                type="pie" 
                options={ventasPorProductoOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de ventas por producto */}
          <TransactionsTable 
            data={ventasPorProductoData} 
            title="Ventas por producto (mes actual)" 
          />
        </div>
      </div>
    </div>
  );
};

export default VentasPage;