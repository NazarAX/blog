import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BinaryField from "../components/BinaryField";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      {/* 3D background */}
      <BinaryField count={420} speed={0.7} opacity={0.8} color="rgba(94,255,168,0.95)" />

      {/* Foreground UI */}
      <Navbar />
      <main className={styles.main} style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
