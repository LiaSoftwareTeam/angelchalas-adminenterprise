'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importación dinámica del componente UnidadesGestion con SSR desactivado
const UnidadesGestion = dynamic(() => import('@/components/UnidadesGestion'), {
  ssr: false,
});

export default function Gestion() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <UnidadesGestion />
    </Suspense>
  );
}