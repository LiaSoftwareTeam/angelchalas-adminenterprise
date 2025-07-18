'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importación dinámica del componente FlujoGestion con SSR desactivado
const FlujoGestion = dynamic(() => import('@/components/FlujoGestion'), {
  ssr: false,
});

export default function Gestion() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FlujoGestion />
    </Suspense>
  );
}