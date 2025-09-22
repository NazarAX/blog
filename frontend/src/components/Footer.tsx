export default function Footer() {
  return (
    <footer style={{ padding: "1rem", textAlign: "center", background: "#f1f1f1" }}>
      <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
}