'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Importar el componente de forma dinámica para evitar problemas de SSR
const CuentasGestion = dynamic(() => import('@/components/CuentasGestion'), {
  ssr: false,
  loading: () => <p>Cargando...</p>
});

export default function CuentasGestionPage() {
  return <CuentasGestion />;
}