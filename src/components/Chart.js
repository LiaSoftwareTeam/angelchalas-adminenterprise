import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './Chart.module.css';

const Chart = ({ title, type, data, options }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Inicializar el gráfico
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      
      // Crear instancia de ECharts
      chartInstance.current = echarts.init(chartRef.current);
      
      // Definir colores para el tema azul
      const blueThemeColors = {
        backgroundColor: '#ffffff',
        textColor: '#0a2463',
        axisLineColor: '#d6e4f0',
        tooltipBgColor: 'rgba(240, 245, 255, 0.9)',
        tooltipBorderColor: '#d6e4f0',
        tooltipTextColor: '#0a2463',
        seriesColors: ['#1976d2', '#3e92cc', '#0d47a1', '#64b5f6', '#bbdefb']
      };
      
      // Configuración base del gráfico con tema azul
      const baseOptions = {
        backgroundColor: blueThemeColors.backgroundColor,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: blueThemeColors.tooltipBgColor,
          borderColor: blueThemeColors.tooltipBorderColor,
          textStyle: {
            color: blueThemeColors.tooltipTextColor
          }
        },
        textStyle: {
          color: blueThemeColors.textColor
        },
        axisLine: {
          lineStyle: {
            color: blueThemeColors.axisLineColor
          }
        },
        color: blueThemeColors.seriesColors,
        ...options
      };
      
      // Configurar y renderizar el gráfico
      chartInstance.current.setOption(baseOptions);
      
      // Manejar el cambio de tamaño
      const handleResize = () => {
        chartInstance.current && chartInstance.current.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current && chartInstance.current.dispose();
      };
    }
  }, [data, options]);

  // Ya no necesitamos detectar cambios de tema, siempre usamos el tema azul
  useEffect(() => {
    // Actualizar el gráfico cuando cambian las opciones
    if (chartInstance.current) {
      chartInstance.current.setOption(options);
    }
  }, [options]);

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div ref={chartRef} className={styles.chart}></div>
    </div>
  );
};

export default Chart;