'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Ventas con carga dinámica para evitar problemas con SSR
const VentasPage = dynamic(() => import('../../components/VentasPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de ventas...
    </div>
  )
});

export default function Ventas() {
  return <VentasPage />;
}