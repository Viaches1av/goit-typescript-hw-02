import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onReset }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please enter a search term');
      return;
    }
    onSubmit(query);
  };

  const handleReset = () => {
    setQuery('');
    onReset();
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={query}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <div className={styles.buttons}>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
