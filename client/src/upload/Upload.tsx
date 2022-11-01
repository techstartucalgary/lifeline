import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

// Upload a file, send it to backend, and display the response
export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // send get request to /test on port 3001
    const handleClick = () => {
        const reqBody = {
            file: file,
            "test": "test123"
        };

        axios.get("http://127.0.0.1:3001/pdf", { data: reqBody })
            .then(res => setResponse(res.data))
            .catch(err => setError(err.message));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };

    // Send the file to the backend with axios
    const handleFileUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            axios
                .post("http://127.0.0.1:3001/pdf", formData)
                .then((res) => {
                    setResponse(res.data);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.response.data);
                    setResponse(null);
                });
        }
    };

    return (
        <>
            <main>
                <h2>Upload a file</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload</button>
                <br />
                <button onClick={handleClick}>Test</button>
            </main>
            {response && <div>{response}</div>}
            {error && <div>{error}</div>}
            <nav>
                <Link to="/loading">confirm</Link>
            </nav>
        </>
    );
}
