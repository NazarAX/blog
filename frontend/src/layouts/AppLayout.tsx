import '../styles/App.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppLayout() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
