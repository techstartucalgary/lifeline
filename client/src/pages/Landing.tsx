import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function About() {
  return (
    <>
      <main>
        <h2 className="font-bold mt-10 text-emerald-500">
          This is the landing page
        </h2>
        <span className="material-symbols-outlined">expand_more</span>
      </main>

      <Button variant="filled">Filled</Button>
      <Button variant="filled" disabled>Filled + Disabled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="tonal" disabled>Tonal + Disabled</Button>
      <Button variant="text" onClick={() => alert(111)}>Text</Button>
      <Button variant="text" disabled>Text + Disabled</Button>

      <nav>
        <Link to="/upload">Get Started</Link>
        <Link to="/workflow">Learn more</Link>
      </nav>
    </>
  );
}
