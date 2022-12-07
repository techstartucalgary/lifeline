import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LogoBar from "../components/LogoBar";
import clsx from "clsx";

export default function Landing() {
  useEffect(() => {
    document.title = "Lifeline | Making Deadlines Easier";
  }, []);
  
  const howItWorksSection = useRef(null);
  
  const navigate = useNavigate(); 
  const routeChange = () =>{ 
    // eslint-disable-next-line quotes
    const path = `/upload`;; 
    navigate(path);
  };

  return (
    <>
      <div>
        <LogoBar/>
        <div
          className="h-auto md:h-screen pb-56 md:pb-0 font-display text-left overflow-x-hidden pt-36"
          style={{ backgroundColor: "#fffff", minWidth: 320 }}>
          <div className="flex flex-row md:my-36 md:mx-48 mx-9 h-2/3">
            <div className="basis-1/2 ">
              <h1
                className="text-6xl font-[800] landing-title leading- tracking-tight"
              >
                A better way to <span className="text-primary-50"><br/>organize deadlines </span>
              </h1>
              <p className="text-xl font-poppins non-italic md:mt-10">
                  Lifeline takes the stress out of managing important dates for your courses. Start saving more time and always keep track of your deadlines in just a few clicks.
                <span className="block md:mt-4">Start for free today to make your scheduling a breeze.</span>
              </p>
              <Button
                onClick={routeChange}
                variant="filled"
              > 
                  Get Started 
              </Button>
            </div>
            <div className="basis-1/2 md:mb-10">
              <img className="w-3/4" src="illustration1.svg" alt="illustration 1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}