import React from 'react';
import { Image } from '../../../types';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <li className={styles.galleryItem} onClick={() => openModal(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
      />
    </li>
  );
};

export default ImageCard;
