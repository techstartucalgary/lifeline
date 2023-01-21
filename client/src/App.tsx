import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Review from "./pages/Review";
import Upload from "./pages/Upload";

const hostname = window.location.hostname;
const port = window.location.port;

if (hostname === "localhost" || hostname === "127.0.0.1" || port === "3000") {
  axios.defaults.baseURL = `//${hostname}:8000`;
  console.log("Running on Localhost", axios.defaults.baseURL);
} else {
  axios.defaults.baseURL = `https://api.${hostname}`;
  console.log("Running on Production", axios.defaults.baseURL);
}

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;

function App() {
  return (
    <div className="app bg-sys-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/review" element={<Review />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
