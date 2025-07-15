import React, { useState, useEffect } from 'react';
import styles from './VentasForm.module.css';

const VentasForm = ({ venta, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    createdBy: '',
    date: '',
    amount: '',
    type: 'income'
  });

  useEffect(() => {
    if (venta) {
      // Si se está editando una venta existente, llenar el formulario con sus datos
      setFormData({
        name: venta.name || '',
        description: venta.description || '',
        createdBy: venta.createdBy || '',
        date: venta.date || '',
        amount: venta.amount ? venta.amount.toString().replace('$', '').replace(',', '') : '',
        type: venta.type || 'income'
      });
    }
  }, [venta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formatear el monto para que tenga el formato correcto
    const formattedAmount = parseFloat(formData.amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    // Crear objeto de venta con los datos del formulario
    const ventaData = {
      ...formData,
      amount: formattedAmount,
      id: venta ? venta.id : Date.now() // Usar ID existente o generar uno nuevo
    };
    
    onSubmit(ventaData);
  };

  // Obtener la fecha actual en formato YYYY-MM-DD para el input de tipo date
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convertir formato de fecha DD/MM/YYYY a YYYY-MM-DD para el input de tipo date
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{venta ? 'Editar Venta' : 'Registrar Nueva Venta'}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Nombre del producto"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="createdBy">Cliente</label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Nombre del cliente"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="date">Fecha</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date ? formatDateForInput(formData.date) : getCurrentDate()}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.formLabel} htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.formTextarea}
              placeholder="Descripción detallada del producto o servicio"
              required
            ></textarea>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            {venta ? 'Actualizar Venta' : 'Guardar Venta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VentasForm;