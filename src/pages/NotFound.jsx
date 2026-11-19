import { useEffect } from 'react';
import Button from '../components/Button/Button.jsx';
import { notFoundTitle } from '../data/head.js';
import styles from './NotFound.module.scss';

export default function NotFound() {
  useEffect(() => {
    document.title = notFoundTitle;
  }, []);

  return (
    <section className={styles.wrap}>
      <h1 className={styles.title}>Natural 1.</h1>
      <p className={styles.text}>This page missed its roll — it doesn't exist, or isn't live yet.</p>
      <Button to="/">
        Back to home
      </Button>
    </section>
  );
}
