'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Comparativas con carga dinámica para evitar problemas con SSR
const ComparativasPage = dynamic(() => import('../../components/ComparativasPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de comparativas...
    </div>
  )
});

export default function Comparativas() {
  return <ComparativasPage />;
}