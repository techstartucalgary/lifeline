import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";

export default function NavigationBar() {
  return (
    <div>
      <div className="items-center flex-no-shrink md:py-8 text-white">
        <Link to="/">
          <Logo className="w-[10rem]" />
        </Link>
      </div>
    </div>
  );
}