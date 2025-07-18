'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importación dinámica del componente CobrosGestion con SSR desactivado
const CobrosGestion = dynamic(() => import('@/components/CobrosGestion'), {
  ssr: false,
});

export default function Gestion() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CobrosGestion />
    </Suspense>
  );
}