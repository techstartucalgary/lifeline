import Button from "../../components/Button";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-600 h-full fixed left-0 top-0">\
        <div className="flex flex-col h-full">
          <Button variant="filled">CPSC 413</Button>
          <Button variant="filled">CPSC 413</Button>
          <Button variant="filled">CPSC 413</Button>
          <Button variant="filled">CPSC 413</Button>
          <Button variant="filled">CPSC 413</Button>
        </div>
      </nav>
      <div className="flex flex-col w-full ml-64">
        <header className="bg-gray-300 w-full p-4">Bradley&apos;s app top bar</header>
        <div className="flex h-full">
          <div className="w-1/2 bg-yellow-400 p-4">
            <ul>
              <li>Assignment 1</li>
              <li>Assignment 2</li>
              <li>Assignment 3</li>
              <li>Assignment 4</li>
              <li>Assignment 5</li>
            </ul>
          </div>
          <div className="w-1/2 bg-green-400 p-4">
            <img src="./pdf.png" alt="the pdf viewer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
