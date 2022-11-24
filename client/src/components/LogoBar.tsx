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
				<div className=" flex items-center flex-no-shrink text-white mr-6 absolute w-48 p-6">
					<Logo onClick={routeChange}/>
				</div>
        </div>
    );
}
