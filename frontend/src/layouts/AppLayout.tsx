import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BinaryField from "../components/BinaryField";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <div className={styles.bg} aria-hidden="true">
        <BinaryField
          count={500}
          speed={0.7}
          opacity={0.3}
          color="rgba(94, 255, 168, 0.25)"
        />
      </div>

      <Navbar />

      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
