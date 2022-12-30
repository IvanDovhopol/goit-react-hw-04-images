import { useState, useEffect } from 'react';
import { Button } from 'components/Button';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { Toaster } from 'react-hot-toast';
import { Body } from './App.styled';
import { ErrorMessage } from 'components/ErrorMessage';
import * as API from 'path/to/services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [load, setLoad] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (searchQuery === '') return;
        setLoad(true);
        const { hits, totalHits } = await API.getImages(searchQuery, page);

        if (totalHits === 0) {
          setError(true);
          setShowLoadMore(false);
          return;
        }
        
        setError(false);
        setImages(prevImg => [...prevImg, ...hits]);

        if (page < totalHits / per_page) return setShowLoadMore(true);
        setShowLoadMore(false);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }

    fetchImages();
  }, [page, per_page, searchQuery]);

  function handleSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(false);
  }

  function closeModal() {
    setShowModal(false);
  }

  function urlForModal(url) {
    setModalUrl(url);
    setShowModal(true);
  }

  function incrementPage() {
    setPage(value => value + 1);
  }

  return (
    <Body>
      <Searchbar onSubmit={handleSubmit} load={load} />
      {images.length > 0 && (
        <ImageGallery items={images} modalUrl={urlForModal} />
      )}

      {error && <ErrorMessage searchQuery={searchQuery} />}
      {showModal && <Modal onClose={closeModal} modalUrl={modalUrl} />}
      {showLoadMore && <Button onClick={incrementPage} />}

      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Body>
  );
};
