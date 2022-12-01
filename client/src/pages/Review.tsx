import { Link } from "react-router-dom";

export default function Review() {
  return (
    <>
      <main>
        <h2>Review/Edit page</h2>
      </main>
      <nav>
        <Link to="/upload">Add more files</Link>
      </nav>
    </>
  );
}
