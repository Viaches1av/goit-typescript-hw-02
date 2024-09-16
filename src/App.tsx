import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios, { AxiosResponse } from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { Image } from './types';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import './App.css';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;
    Modal.setAppElement('#root');
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<{ results: Image[] }> = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query, page, per_page: 12 },
            headers: {
              Authorization:
                'Client-ID gYEFrm1YpvFiwCRUbs-N-CrIlqFt3GwdC7trjwiJoSU',
            },
          }
        );

        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    const body = document.body;
    if (modalImage) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = '';
      body.style.paddingRight = '';
    }
  }, [modalImage]);

  const handleSearchSubmit = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleReset = () => {
    setQuery('');
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearchSubmit} onReset={handleReset} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default App;
