import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function About() {
  return (
    <>
      <main>
        <h2>This is the landing page</h2>
      </main>
      <Button
        width = "130px"
        height = "46px"
        padding = "0px"
        colour = "#B7194A"
        radius = "100px"
        gap = "8px"
        children = "Get Started"
        onClick={() => console.log("The button has been clicked")}
        />
      <nav>
        <Link to="/upload">Get Started</Link>
        <Link to="/workflow">Learn more</Link>
      </nav>
    </>
  );
}
