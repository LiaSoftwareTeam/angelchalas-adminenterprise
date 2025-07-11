'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el Dashboard con carga dinámica para evitar problemas con SSR y ECharts
const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando dashboard...
    </div>
  )
});

export default function Home() {
  return <Dashboard />;
}
