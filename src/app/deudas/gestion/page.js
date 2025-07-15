'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Importar el componente de forma dinámica para evitar problemas de SSR
const DeudasGestion = dynamic(() => import('@/components/DeudasGestion'), {
  ssr: false,
  loading: () => <p>Cargando...</p>
});

export default function DeudasGestionPage() {
  return <DeudasGestion />;
}