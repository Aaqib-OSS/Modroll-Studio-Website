import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import Button from '../Button/Button.jsx';
import mods from '../../data/mods.js';
import styles from './ModMenu.module.scss';

export default function ModMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const toggleRef = useRef(null);

  const search = query.trim().toLowerCase();
  const results = mods.filter((mod) =>
    [mod.name, mod.fullName, mod.tagline].join(' ').toLowerCase().includes(search),
  );

  function close() {
    setOpen(false);
    setQuery('');
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event) {
      if (!rootRef.current.contains(event.target)) close();
    }
    function onKeyDown(event) {
      if (event.key !== 'Escape') return;
      close();
      toggleRef.current.focus();
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.menu}>
      <Button ref={toggleRef} size="sm" variant="ghost" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}>
        Mods
        <span className={styles.caret} aria-hidden="true" />
      </Button>
      {open && (
        <div className={styles.panel}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search mods"
            aria-label="Search mods"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {results.length > 0 ? (
            <ul className={styles.list}>
              {results.map((mod) => (
                <li key={mod.slug}>
                  <NavLink to={`/mods/${mod.slug}`} className={styles.item} onClick={close}>
                    <img className={styles.icon} src={mod.icon} alt="" width="32" height="32" />
                    <span>
                      <span className={styles.name}>{mod.name}</span>
                      <span className={styles.tagline}>{mod.tagline}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No mod matches “{query.trim()}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
