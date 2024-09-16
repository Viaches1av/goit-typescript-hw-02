import React from 'react';
import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => (
  <button onClick={onClick} className={styles.loadMoreBtn}>
    Load More
  </button>
);

export default LoadMoreBtn;
