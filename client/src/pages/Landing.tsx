import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Upload from "./Upload";

export default function Landing() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/upload`;; 
    navigate(path);
  }

  return (
    <>
      <main>
        <h2 className="font-bold mt-10 text-emerald-500">This is the landing page</h2>
      </main>
      <Button
      onClick={routeChange}
      variant="default"
      size="lg"
      > Get Started </Button>
      <Button
      onClick={Upload}
      variant="secondary"
      size="lg"
      > Learn more </Button>
    </>
  );
}
