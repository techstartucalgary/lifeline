import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";

import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";

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
          <Route path="/app" element={<Review />} />
          <Route path="/app/:courseKey" element={<Review />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
