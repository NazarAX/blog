import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#282c34", color: "white" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Home</Link>
      <Link to="/about" style={{ marginRight: "1rem", color: "white" }}>About</Link>
      <Link to="/projects" style={{ color: "white" }}>Dashboard</Link>
    </nav>
  );
}