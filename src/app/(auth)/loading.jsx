import React from "react";
import styles from "./styles.module.css";
import LoadingOmelete from "@/components/loading/LoadingOmelete";
const LoadingPage = () => {
  return (
    <div className="h-screen flex justify-between items-center align-middle">
      {/* <span className={styles.loader}></span> */}
      <LoadingOmelete />
    </div>
  );
};

export default LoadingPage;
