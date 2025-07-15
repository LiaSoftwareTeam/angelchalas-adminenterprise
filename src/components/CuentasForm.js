import React, { useState, useEffect } from 'react';
import styles from './VentasForm.module.css';

const CuentasForm = ({ cuenta, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    descripcion: '',
    fechaEmision: '',
    fechaVencimiento: '',
    monto: '',
    estado: 'Pendiente'
  });

  useEffect(() => {
    if (cuenta) {
      // Si se está editando una cuenta existente, llenar el formulario con sus datos
      setFormData({
        cliente: cuenta.cliente || '',
        descripcion: cuenta.descripcion || '',
        fechaEmision: cuenta.fechaEmision || '',
        fechaVencimiento: cuenta.fechaVencimiento || '',
        monto: cuenta.monto ? cuenta.monto.toString().replace('$', '').replace(',', '') : '',
        estado: cuenta.estado || 'Pendiente'
      });
    }
  }, [cuenta]);

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
    const formattedAmount = parseFloat(formData.monto).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    // Crear objeto de cuenta con los datos del formulario
    const cuentaData = {
      ...formData,
      monto: formattedAmount,
      id: cuenta ? cuenta.id : Date.now() // Usar ID existente o generar uno nuevo
    };
    
    onSubmit(cuentaData);
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
      <h3 className={styles.formTitle}>{cuenta ? 'Editar Cuenta por Cobrar' : 'Registrar Nueva Cuenta por Cobrar'}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cliente">Cliente</label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Nombre del cliente"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="monto">Monto</label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="fechaEmision">Fecha de Emisión</label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={formData.fechaEmision ? formatDateForInput(formData.fechaEmision) : getCurrentDate()}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={formData.fechaVencimiento ? formatDateForInput(formData.fechaVencimiento) : ''}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
              <option value="Vencida">Vencida</option>
              <option value="Parcial">Pago Parcial</option>
            </select>
          </div>
          
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.formLabel} htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={styles.formTextarea}
              placeholder="Descripción detallada de la cuenta por cobrar"
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
            {cuenta ? 'Actualizar Cuenta' : 'Guardar Cuenta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CuentasForm;