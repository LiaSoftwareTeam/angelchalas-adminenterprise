'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Gestión de Ventas con carga dinámica para evitar problemas con SSR
const VentasGestion = dynamic(() => import('../../../components/VentasGestion'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando gestión de ventas...
    </div>
  )
});

export default function GestionVentas() {
  return <VentasGestion />;
}