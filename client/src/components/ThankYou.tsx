import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <main>
        <h2>Thanks for using our product</h2>
      </main>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/review">close</Link>
      </nav>
    </>
  );
}
