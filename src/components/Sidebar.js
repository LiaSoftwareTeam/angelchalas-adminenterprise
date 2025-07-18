import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSidebar = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    
    // Si estamos colapsando el menú, cerramos todos los submenús
    if (!newExpandedState) {
      setExpandedMenus({});
    }
    
    if (onToggle) {
      onToggle(newExpandedState);
    }
  };

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          {expanded ? 'CHALAS' : 'C'}
        </div>
        
        <button className={styles.toggleButton} onClick={toggleSidebar} title={expanded ? 'Contraer menú' : 'Expandir menú'}>
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )}
        </button>
      </div>
      
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">
              <div className={styles.navItem} title="Inicio">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className={styles.navText}>Inicio</span>
              </div>
            </Link>
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.cuentas ? styles.active : ''}`} 
              title="Cuentas"
              onClick={() => toggleSubmenu('cuentas')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              <span className={styles.navText}>Cuentas</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.cuentas ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.cuentas && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/cuentas">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/cuentas/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.cobros ? styles.active : ''}`} 
              title="Cobros"
              onClick={() => toggleSubmenu('cobros')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span className={styles.navText}>Cobros</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.cobros ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.cobros && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/cobros">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/cobros/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.deudas ? styles.active : ''}`} 
              title="Deudas"
              onClick={() => toggleSubmenu('deudas')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 4h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                <path d="M12 11v6"></path>
                <path d="M12 7h.01"></path>
              </svg>
              <span className={styles.navText}>Deudas</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.deudas ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.deudas && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/deudas">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/deudas/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.flujo ? styles.active : ''}`} 
              title="Flujo de Caja"
              onClick={() => toggleSubmenu('flujo')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <span className={styles.navText}>Flujo de Caja</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.flujo ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.flujo && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/flujo">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/flujo/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.comparativas ? styles.active : ''}`} 
              title="Comparativas"
              onClick={() => toggleSubmenu('comparativas')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span className={styles.navText}>Comparativas</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.comparativas ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.comparativas && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/comparativas">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/comparativas/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.unidades ? styles.active : ''}`} 
              title="Unidades de Negocio"
              onClick={() => toggleSubmenu('unidades')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span className={styles.navText}>Unidades</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.unidades ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.unidades && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/unidades">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/unidades/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className={`${styles.navItem} ${expandedMenus.ventas ? styles.active : ''}`} 
              title="Ventas"
              onClick={() => toggleSubmenu('ventas')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className={styles.navText}>Ventas</span>
              {expanded && (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.submenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={expandedMenus.ventas ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              )}
            </div>
            {expanded && expandedMenus.ventas && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/ventas">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Resumen</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/ventas/gestion">
                    <div className={styles.submenuItem}>
                      <span className={styles.submenuText}>Gestión</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            {/* <Link href="/estadisticas">
              <div className={styles.navItem} title="Estadísticas">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <span className={styles.navText}>Estadísticas</span>
              </div>
            </Link> */}
          </li>
          <li>
            {/* <Link href="/transacciones">
              <div className={styles.navItem} title="Transacciones">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span className={styles.navText}>Transacciones</span>
              </div>
            </Link> */}
          </li>
          <li>
            <Link href="/configuracion">
              <div className={styles.navItem} title="Configuración">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span className={styles.navText}>Configuración</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Sección de usuario */}
      <div className={styles.userSection}>
        <div className={styles.userAvatar}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        {expanded && (
          <div className={styles.userName}>Angel Chalas</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;