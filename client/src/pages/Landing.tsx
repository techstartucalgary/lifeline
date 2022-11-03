import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <main>
        <h2>This is the landing page</h2>
      </main>

      <nav>
        <Link to="/upload">Get Started</Link>
        <Link to="/workflow">Learn more</Link>
      </nav>
    </>
  );
}
