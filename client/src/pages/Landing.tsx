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
      <Button variant="filled" disabled={false} children={"Filled"} />
      <Button variant="filled" disabled={true} children={"Filled + Disabled"} />
      <Button variant="tonal" disabled={true} children={"Tonal"} />
      <Button variant="tonal" disabled={false} children={"Tonal + Disabled"} />
      <Button variant="text" disabled={true} children={"Text"} />
      <Button variant="text" disabled={false} children={"Text + Disabled"} />

      <nav>
        <Link to="/upload">Get Started</Link>
        <Link to="/workflow">Learn more</Link>
      </nav>
    </>
  );
}
