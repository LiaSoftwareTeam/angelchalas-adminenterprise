'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Cobros con carga dinámica para evitar problemas con SSR
const CobrosPage = dynamic(() => import('../../components/CobrosPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de cobros...
    </div>
  )
});

export default function Cobros() {
  return <CobrosPage />;
}