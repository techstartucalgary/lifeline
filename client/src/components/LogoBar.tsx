import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

export default function LogoBar() {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="flex items-center flex-no-shrink h-12 md: my-8 text-white ml-10 block w-48 cursor-pointer">
        <Logo onClick={() => navigate("/")}/>
      </div>
    </div>
  );
}