'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importación dinámica del componente ComparativasGestion con SSR desactivado
const ComparativasGestion = dynamic(() => import('@/components/ComparativasGestion'), {
  ssr: false,
});

export default function Gestion() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComparativasGestion />
    </Suspense>
  );
}