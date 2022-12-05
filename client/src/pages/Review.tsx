import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main>
        <h2>Review/Edit page</h2>
      </main>
      <nav>
        <Link to="/thankyou">Download (trigger popup after done)</Link>
        <Link to="/upload">Add more files</Link>
      </nav>
    </>
  );
}
