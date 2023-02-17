import { Link } from "react-router-dom";
// import the logo as a react component
import Logo from "./logo.svg";

export default function NavigationBar() {
  return (
    <div>
      <div className="items-center flex-no-shrink py-4 text-white">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-8" />
        </Link>
      </div>
    </div>
  );
}