import { Link, NavLink } from 'react-router';
import Button from '../Button/Button.jsx';
import ModMenu from '../ModMenu/ModMenu.jsx';
import glyph from '../../assets/modroll-glyph.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} aria-label="Modroll Studio — home">
        <img className={styles.glyph} src={glyph} alt="" width="48" height="48" aria-hidden="true" />
        <span className={styles.wordmark}>
          Modroll <span className={styles.sub}>Studio</span>
        </span>
      </Link>
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
