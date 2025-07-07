'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importar el componente de Cuentas con carga dinámica para evitar problemas con SSR
const CuentasPage = dynamic(() => import('../../components/CuentasPage'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'var(--text-color)'
    }}>
      Cargando página de cuentas...
    </div>
  )
});

export default function Cuentas() {
  return <CuentasPage />;
}