import { Link } from "react-router-dom";

export default function Upload() {
    return (
        <>
            <main>
                <h2>Upload a file</h2>
                <input type="file" />
                <br />
            </main>
            <nav>
                <Link to="/loading">confirm</Link>
            </nav>
        </>
    );
}
