'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Unidades de Negocio con carga dinámica para evitar problemas con SSR
const UnidadesPage = dynamic(() => import('../../components/UnidadesPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de unidades de negocio...
    </div>
  )
});

export default function Unidades() {
  return <UnidadesPage />;
}