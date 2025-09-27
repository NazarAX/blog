import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.menu}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>
            About Me
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ""}>
            Projects
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
