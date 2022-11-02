import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <main>
        <h2>How does this product work</h2>
      </main>
      <nav>
        <Link to="/upload">continue / get started</Link>
      </nav>
    </>
  );
}
