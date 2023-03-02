import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";

const hostname = window.location.hostname;
const port = window.location.port;

if (hostname === "localhost" || hostname === "127.0.0.1" || port === "3000") {
  axios.defaults.baseURL = `//${hostname}:8000`;
  console.log("Running on Localhost", axios.defaults.baseURL);
} else {
  axios.defaults.baseURL =
    "https://rj6crp3mqwnq6vskrxd5umir4a0tgcqv.lambda-url.us-west-2.on.aws";
  console.log("Running on Production", axios.defaults.baseURL);
}

axios.defaults.withCredentials = false;
axios.defaults.timeout = 30000;

const App = () => {
  return (
    <>
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
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
