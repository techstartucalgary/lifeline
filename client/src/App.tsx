import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
      </main>
      <p><br/>Go to about page:</p>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>This is the about page</h2>
      </main>
      <p><br/>Go to home page:</p>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;