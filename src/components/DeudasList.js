import React, { useState } from 'react';
import styles from './TransactionsTable.module.css';
import buttonStyles from './VentasForm.module.css';

const DeudasList = ({ deudas, onAddClick, onEditClick }) => {
  return (
    <div className={styles.tableContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className={styles.tableTitle}>Listado de Cuentas por Pagar</h3>
        <button 
          className={buttonStyles.addButton}
          onClick={onAddClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={buttonStyles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nueva Deuda
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Descripción</th>
              <th>Fecha Emisión</th>
              <th>Fecha Vencimiento</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {deudas.map((deuda, index) => (
              <tr key={index}>
                <td>{deuda.proveedor}</td>
                <td className={styles.description}>
                  {deuda.descripcion.length > 15 
                    ? `${deuda.descripcion.substring(0, 15)}...` 
                    : deuda.descripcion}
                </td>
                <td>{deuda.fechaEmision}</td>
                <td>{deuda.fechaVencimiento}</td>
                <td style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}>{deuda.monto}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    backgroundColor: deuda.estado === 'Pagada' ? 'rgba(46, 125, 50, 0.1)' : 
                                    deuda.estado === 'Pendiente' ? 'rgba(249, 168, 37, 0.1)' : 
                                    deuda.estado === 'Vencida' ? 'rgba(198, 40, 40, 0.1)' : 'rgba(2, 136, 209, 0.1)',
                    color: deuda.estado === 'Pagada' ? 'var(--success-color)' : 
                           deuda.estado === 'Pendiente' ? 'var(--warning-color)' : 
                           deuda.estado === 'Vencida' ? 'var(--danger-color)' : 'var(--info-color)'
                  }}>
                    {deuda.estado}
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton} title="Ver detalles">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionButton} 
                    title="Editar"
                    onClick={() => onEditClick(deuda)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className={styles.actionButton} title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeudasList;