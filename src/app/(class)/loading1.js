import React from "react";
import styles from './styles.module.css'
const LoadingPage = () => {
  return (
    <div className="h-screen flex justify-between items-left align-middle">
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingPage;
