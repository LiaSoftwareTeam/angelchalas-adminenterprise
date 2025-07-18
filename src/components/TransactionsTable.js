import React from 'react';
import styles from './TransactionsTable.module.css';

const TransactionsTable = ({ transactions, data, title = "Últimas Transacciones" }) => {
  // Usar data si transactions no está definido
  const items = transactions || data || [];
  
  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>{title}</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Creado por</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td className={styles.description}>
                  {transaction.description.length > 15 
                    ? `${transaction.description.substring(0, 15)}...` 
                    : transaction.description}
                </td>
                <td>{transaction.createdBy}</td>
                <td>{transaction.date}</td>
                <td>
                  <button className={styles.actionButton} title="Ver detalles">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className={styles.actionButton} title="Editar">
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

export default TransactionsTable;