// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
// import Button from './components/Button'
// import Landing from "./pages/Landing";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={
//             <>
//               <div>
//                 <a href="https://vitejs.dev" target="_blank">
//                   <img src="/vite.svg" className="logo" alt="Vite logo" />
//                 </a>
//                 <a href="https://reactjs.org" target="_blank">
//                   <img src={reactLogo} className="logo react" alt="React logo" />
//                 </a>
//               </div>
//               <h1 className='animate-pulse'
//               >Vite + React</h1>
//               <span className='material-icons animate-bounce'>
//                 favorite
//               </span>
//               <div className="card">
//                 <button onClick={() => setCount((count) => count + 1)}>
//                   count is {count}
//                 </button>
//                 <p>
//                   Edit <code>src/App.tsx</code> and save to test HMR
//                 </p>
//               </div>
//               <p className="read-the-docs">
//                 Click on the Vite and React logos to learn more
//               </p>
//               <Button>Hello world</Button>
//             </>} />
//           <Route path="/home" element={<Landing />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

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
          <Route path="/review/:courseId" element={<Review />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
