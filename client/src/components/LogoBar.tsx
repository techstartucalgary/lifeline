import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

export default function LogoBar() {
    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/`;
        navigate(path);
    }
	return (
		<div>
				<div className="flex items-center flex-no-shrink h-12 md: my-8 text-white ml-10 absolute w-48 cursor-pointer">
					<Logo onClick={routeChange}/>
				</div>
        </div>
    );
}
