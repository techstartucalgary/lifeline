import Button from "../../components/Button";

const Review = () => {
  return (
    <div className="grid grid-cols-6">
      {/* Left column: navigation bar */}
      <nav className="col-span-1 bg-gray-400 flex flex-col p-4">
        <Button variant="filled">CPSC 413</Button>
        <Button variant="filled">SENG 513</Button>
        <Button variant="filled">CPSC 481</Button>
        <Button variant="filled">CPSC 457</Button>
      </nav>

      {/* Right column: content */}
      <div className="col-span-5">
        {/* Top app bar */}
        <header className="bg-gray-900 p-4 text-white">
          <h1>CPSC 413</h1>
          <h2>Design and analysis of algorithms</h2>
        </header>
        <div className="row-span-5 bg-gray-100">
          {/* Two equal width columns */}
          <div className="grid grid-cols-2">
            <div className="col-span-1 bg-gray-300 p-4">
              {/* Column 1 content */}
              <h2>Assessments</h2>
              <ul>
                <li>Midterm 1</li>
                <li>Midterm 2</li>
                <li>Final</li>
              </ul>
            </div>
            <div className="col-span-1 bg-gray-500 p-4">
              {/* Column 2 content */}
              <img src="/pdf.png" alt="pdf" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
