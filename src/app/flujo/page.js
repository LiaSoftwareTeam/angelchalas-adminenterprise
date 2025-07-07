'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Flujo de Caja con carga dinámica para evitar problemas con SSR
const FlujoPage = dynamic(() => import('../../components/FlujoPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de flujo de caja...
    </div>
  )
});

export default function Flujo() {
  return <FlujoPage />;
}