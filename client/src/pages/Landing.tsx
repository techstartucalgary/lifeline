import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/upload`;; 
    navigate(path);
  }

  return (
    <div>
        <h2 className="font-bold mt-10 text-emerald-500">This is the landing page</h2>

      <Button
      onClick={routeChange}
      variant="default"
      size="lg"
      > 
      Get Started 
      </Button>

      <Button
      onClick={routeChange}
      variant="secondary"
      size="lg"
      > Learn more </Button>
    </div>
  );
}
