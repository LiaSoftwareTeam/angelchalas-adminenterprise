import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import SummaryCard from './SummaryCard';
import Chart from './Chart';
import TransactionsTable from './TransactionsTable';
import styles from './Dashboard.module.css';

// Importar datos simulados
import { 
  summaryData, 
  ventasPorMesOptions, 
  egresosPorDepartamentoOptions, 
  comparativaIngresosEgresosOptions,
  transactionsData 
} from '../utils/mockData';

const Dashboard = () => {
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
          {/* Tarjetas de resumen */}
          <div className={styles.summaryCards}>
            {summaryData.map((card) => (
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
                title="Ventas por mes" 
                type="bar" 
                options={ventasPorMesOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Egresos por departamento o categoría" 
                type="pie" 
                options={egresosPorDepartamentoOptions} 
              />
            </div>
            <div className={styles.chartItem}>
              <Chart 
                title="Comparativa mensual de ingresos vs egresos" 
                type="bar" 
                options={comparativaIngresosEgresosOptions} 
              />
            </div>
          </div>
          
          {/* Tabla de transacciones */}
          <TransactionsTable transactions={transactionsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;