import Button from "../../components/Button";

const Review = () => {
  return (
    <div className="grid grid-cols-5">
      {/* Left column: navigation bar */}
      <nav className="col-span-1 bg-gray-800 p-4 flex flex-col">
        {/* Navigation content */}
        <Button variant="filled">CPSC 100</Button>
        <Button variant="filled">CPSC 100</Button>
        <Button variant="filled">CPSC 100</Button>
        <Button variant="filled">CPSC 100</Button>
        <Button variant="filled">CPSC 100</Button>
      </nav>

      {/* Right column */}
      <div className="col-span-4">
        {/* Top app bar */}
        <header className="bg-gray-600 p-4 text-white">
          {/* Top app bar content */}
          <h1>CPSC 413</h1>
        </header>

        {/* Two equal width columns */}
        <div className="grid grid-cols-2">
          <div className="col-span-1 bg-gray-500 p-4">
            {/* Column 1 content */}
          </div>
          <div className="col-span-1 bg-gray-900 p-4">
            {/* Column 2 content */}
            <img src="./pdf.png" alt="the pdf viewer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;