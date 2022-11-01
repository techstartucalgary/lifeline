import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Review from "./pages/Review";
import ThankYou from "./components/ThankYou";
import Upload from "./pages/Upload";
import Workflow from "./pages/Workflow";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/review" element={<Review />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/workflow" element={<Workflow />} />
      </Routes>
    </div>
  );
}

export default App;
