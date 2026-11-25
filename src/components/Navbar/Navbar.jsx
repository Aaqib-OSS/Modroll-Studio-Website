import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Button from '../Button/Button.jsx';
import ModMenu from '../ModMenu/ModMenu.jsx';
import glyph from '../../assets/modroll-glyph.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const rollTimeout = useRef(null);
  const rollingRef = useRef(false);

  useEffect(() => () => clearTimeout(rollTimeout.current), []);

  function rollDice() {
    if (rollingRef.current) return;

    rollingRef.current = true;
    setResult(null);
    setRolling(true);

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650;
    rollTimeout.current = setTimeout(() => {
      setResult(Math.floor(Math.random() * 20) + 1);
      rollingRef.current = false;
      setRolling(false);
    }, duration);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <button
          type="button"
          className={styles.diceButton}
          onClick={rollDice}
          aria-label={result === null ? 'Roll a d20' : `Roll a d20, last result ${result}`}
          aria-busy={rolling}
        >
          <span className={`${styles.die} ${rolling ? styles.rolling : ''}`}>
            <img className={styles.glyph} src={glyph} alt="" width="48" height="48" aria-hidden="true" />
            {result !== null && <span className={styles.result} aria-hidden="true">{result}</span>}
          </span>
        </button>
        <Link to="/" className={styles.wordmark} aria-label="Modroll Studio — home">
          Modroll <span className={styles.sub}>Studio</span>
        </Link>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {result !== null ? `You rolled ${result}` : ''}
        </span>
      </div>
      <ul className={styles.links}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <div className={styles.actions}>
        <Button size="sm" variant="ghost" href="https://github.com/modrollstudio" target="_blank" rel="noopener noreferrer">
          GitHub
          <span className="sr-only">Opens in new tab</span>
        </Button>
        <ModMenu />
      </div>
    </nav>
  );
}
