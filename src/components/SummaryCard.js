import React from 'react';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ title, value, icon, trend, trendValue }) => {
  const trendClass = trend === 'up' ? styles.trendUp : styles.trendDown;
  
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
        {trend && (
          <div className={`${styles.trend} ${trendClass}`}>
            {trend === 'up' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.trendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.trendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;