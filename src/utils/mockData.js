// Datos simulados para el dashboard

// Datos para las tarjetas de resumen
export const summaryData = [
  {
    id: 1,
    title: 'Ingresos totales',
    value: '$125,430.00',
    trend: 'up',
    trendValue: '12.5%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Egresos totales',
    value: '$78,250.00',
    trend: 'down',
    trendValue: '5.3%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Flujo de caja neto',
    value: '$47,180.00',
    trend: 'up',
    trendValue: '8.2%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Margen bruto',
    value: '37.6%',
    trend: 'up',
    trendValue: '2.1%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

// Datos para el gráfico de ventas por mes (ingresos por producto/servicio)
export const ventasPorMesOptions = {
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
    data: ['Software', 'Consultoría', 'Soporte', 'Capacitación'],
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
      name: 'Software',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#1976d2'
      },
      data: [8500, 10200, 9300, 11500, 13200, 12100, 13800, 14900, 14200, 15500, 16800, 18500]
    },
    {
      name: 'Consultoría',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#42a5f5'
      },
      data: [5200, 6300, 5800, 6900, 7800, 7200, 8100, 8700, 8300, 9100, 9800, 10500]
    },
    {
      name: 'Soporte',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#64b5f6'
      },
      data: [3100, 3800, 3400, 4100, 4700, 4300, 4900, 5300, 5100, 5600, 6100, 6500]
    },
    {
      name: 'Capacitación',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: '#90caf9'
      },
      data: [1700, 2100, 1900, 2300, 2600, 2400, 2700, 2900, 2800, 3100, 3400, 3700]
    }
  ]
};

// Alias para compatibilidad con código existente
export const incomeChartOptions = ventasPorMesOptions;

// Datos para el gráfico de egresos por departamento o categoría
export const egresosPorDepartamentoOptions = {
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
    name: 'Egresos por categoría',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 2
    },
    color: ['#f44336', '#ff7043', '#ffab91', '#ffd54f', '#aed581'],
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
      { value: 32500, name: 'Personal' },
      { value: 18700, name: 'Equipos' },
      { value: 15200, name: 'Servicios' },
      { value: 8900, name: 'Transporte' },
      { value: 6800, name: 'Otros' }
    ]
  }]
};

// Datos para la comparativa mensual de ingresos vs egresos
export const comparativaIngresosEgresosOptions = {
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
    formatter: '{b}<br/>{a0}: ${c0}<br/>{a1}: ${c1}<br/>Balance: ${c2}'
  },
  legend: {
    data: ['Ingresos', 'Egresos', 'Balance'],
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
      name: 'Ingresos',
      type: 'bar',
      barWidth: '25%',
      itemStyle: {
        color: '#4caf50'
      },
      data: [18500, 22430, 19890, 24100, 27800, 25600, 28900, 31200, 29800, 32500, 35100, 38500]
    },
    {
      name: 'Egresos',
      type: 'bar',
      barWidth: '25%',
      itemStyle: {
        color: '#f44336'
      },
      data: [12300, 14500, 13200, 15800, 16900, 15400, 17200, 18500, 17800, 19200, 20500, 22800]
    },
    {
      name: 'Balance',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#1976d2'
      },
      lineStyle: {
        width: 3
      },
      data: [6200, 7930, 6690, 8300, 10900, 10200, 11700, 12700, 12000, 13300, 14600, 15700]
    }
  ]
};

// Alias para compatibilidad con código existente
export const expensesChartOptions = egresosPorDepartamentoOptions;

// Datos para el gráfico de gastos por categoría
export const expensesByCategoryOptions = {
  title: {
    text: 'Gastos por categoría',
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
    name: 'Gastos por categoría',
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
      { value: 32500, name: 'Personal' },
      { value: 18700, name: 'Equipos' },
      { value: 15200, name: 'Servicios' },
      { value: 8900, name: 'Transporte' },
      { value: 6800, name: 'Otros' }
    ]
  }]
};

// Datos para la tabla de transacciones
export const transactionsData = [
  {
    id: 1,
    name: 'Pago de nómina',
    description: 'Pago de nómina correspondiente al mes de octubre',
    createdBy: 'Admin',
    date: '05/11/2023',
    amount: -15200.00,
    type: 'expense'
  },
  {
    id: 2,
    name: 'Factura #1234',
    description: 'Pago de cliente por servicios de consultoría',
    createdBy: 'Sistema',
    date: '03/11/2023',
    amount: 8500.00,
    type: 'income'
  },
  {
    id: 3,
    name: 'Compra de equipos',
    description: 'Adquisición de nuevos equipos informáticos',
    createdBy: 'Carlos M.',
    date: '01/11/2023',
    amount: -3200.00,
    type: 'expense'
  },
  {
    id: 4,
    name: 'Factura #1235',
    description: 'Pago de cliente por desarrollo de software',
    createdBy: 'Sistema',
    date: '29/10/2023',
    amount: 12000.00,
    type: 'income'
  },
  {
    id: 5,
    name: 'Servicios públicos',
    description: 'Pago de servicios de electricidad y agua',
    createdBy: 'Admin',
    date: '28/10/2023',
    amount: -850.00,
    type: 'expense'
  },
  {
    id: 6,
    name: 'Factura #1236',
    description: 'Pago de cliente por mantenimiento',
    createdBy: 'Sistema',
    date: '25/10/2023',
    amount: 4500.00,
    type: 'income'
  },
  {
    id: 7,
    name: 'Transporte',
    description: 'Reembolso de gastos de transporte',
    createdBy: 'Laura S.',
    date: '22/10/2023',
    amount: -320.00,
    type: 'expense'
  }
];