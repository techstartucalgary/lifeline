import { Link } from "react-router-dom";

export default function About() {
    return (
        <>
            <main>
                <h2>This is the loading page</h2>
            </main>
            <nav>
                <Link to="/review">Todo: Redirect to Review/Edit page</Link>
            </nav>
        </>
    );
}
