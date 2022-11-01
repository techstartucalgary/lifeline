import { Routes, Route } from "react-router-dom";
import Landing from './landing/Landing';
import Loading from './loading/Loading';
import Review from './review/Review';
import ThankYou from './thankyou/ThankYou';
import Upload from "./upload/Upload";
import Workflow from "./workflow/Workflow";

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