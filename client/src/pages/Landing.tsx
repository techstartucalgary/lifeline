import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LogoBar from "../components/LogoBar";
// import illustrations
import illustration1 from "../assets/illustration1.svg";
import illustration10 from "../assets/illustration10.svg";
import illustration19 from "../assets/illustration19.svg";
import uploadIcon from "../assets/upload.svg";
import editIcon from "../assets/edit.svg";
import exportIcon from "../assets/export-icon.svg";


export default function Landing() {
  useEffect(() => {
    document.title = "Lifeline | Making Deadlines Easier";
  }, []);
  
  // const howItWorksSection = useRef(null);
  
  const navigate = useNavigate(); 

  return (
    // <>
    //   <div>
    //     <LogoBar/>
    //     <div
    //       className="h-auto md:h-screen pb-56 md:pb-0 font-display text-left overflow-x-hidden pt-36"
    //       style={{ backgroundColor: "#fffff", minWidth: 320 }}>
    //       <div className="flex flex-row md:my-36 md:mx-48 mx-9 h-2/3">
    //         <div className="basis-1/2 ">
    //           <h1
    //             className="text-6xl font-[800] landing-title leading- tracking-tight"
    //           >
    //             A better way to <span className="text-primary-50"><br/>organize deadlines </span>
    //           </h1>
    //           <p className="text-xl font-poppins non-italic md:mt-10">
    //               Lifeline takes the stress out of managing important dates for your courses. Start saving more time and always keep track of your deadlines in just a few clicks.
    //             <span className="block md:mt-4">Start for free today to make your scheduling a breeze.</span>
    //           </p>
    //           <Button
    //             onClick={routeChange}
    //             variant="filled"
    //           > 
    //               Get Started 
    //           </Button>
    //         </div>
    //         <div className="basis-1/2 md:mb-10">
    //           <img className="w-3/4" src="illustration1.svg" alt="illustration 1" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <LogoBar/>
      <div className="flex flex-row px-28 mt-28">
        <div className="w-7/12 m-0 pl-12">
          <div className="text-5xl font-poppins font-[800] leading- tracking-tight">
            <h1>A better way to</h1>
            <h1 className=" text-primary-50">organize deadlines</h1>
          </div>
          <div className="leading-relaxed font-poppins mt-10 w-11/12">
            <p className="text-xl font-normal non-italic">
              Lifeline takes the stress out of managing important dates for your
              courses. Start saving more time and always keep track of your
              deadlines in just a few clicks.
              <span className="block">
                Start for free today to make your scheduling a breeze.
              </span>
            </p>
            <nav>
              <div className="mt-[60px]">
                <Button
                  onClick={() => navigate("/upload")}
                  variant="filled"
                > 
                      Get Started 
                </Button>
                <Link
                  to="/workflow"
                  className="text-learnMore text-sm text-semibold py-3.5 px-6 inline"
                >
                  Learn more
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="w-5/12">
          <img src={illustration1} alt="illustration 1" />
        </div>
      </div>

      <div className="flex flex-row w-4/5 mt-36 mx-auto font-poppins">
        <div className="w-1/2">
          <img src={illustration19} alt="illustration 19" />
        </div>
        <div className="pt-8 w-1/2 pl-16">
          <div className="w-4/5 h-1/3">
            <div className="flex flex-row">
              <img src={uploadIcon} alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">
                  Upload your course outline
                  <span className="block text-sm font-[400]">
                    Up to 3 PDF documents are accepted
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-4/5 h-2/5 ">
            <div className="flex flex-row">
              <img src={editIcon} alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">
                  Preview and edit
                  <span className="block text-sm font-[400]">
                    Lifeline extracts important information and generate your
                    schedule, and get the chance to preview and make changes{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-4/5 h-2/5">
            <div className="flex flex-row">
              <img src={exportIcon} alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">
                  Export final result into calendar
                  <span className="block text-sm font-[400]">
                    Download your ICS file and import it into your calendar app{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center font-poppins mt-28">
        <p className="font-[600] text-2xl leading-12 text-center">
          Easily integrates into your favourite calendar
        </p>
        <p className="font-[400] text-base text-center w-3/5">
          Lifeline generates your schedule in a convenient format, allowing you
          to comfortably share calendar information. Import your schedule
          details into a digital calendar such as Microsoft Outlook, Google
          Calendar, or Apple Calendar.
        </p>
        <img src={illustration10} alt="illustration 10" className="mt-14" />
      </div>

      <div className="flex flex-col items-center mt-20 font-poppins">
        <p className="text-2xl font-[600] leading-12 tracking-tight">
          Ready to schedule with ease?
        </p>
        <p className="font-normal text-base w-2/5 text-center">
          Start using Lifeline today to take control of your time and never
          worry about handling deadlines anymore.
        </p>
        <Link
          to="/upload"
          className="rounded-full bg-getStarted text-white text-sm text-semibold p-3 px-6 pt-2 baseline my-8"
        >
          Get Started
        </Link>
      </div>

      <div className=" bg-start rounded-full mx-auto text-white baseline">
        Start &rarr;
      </div>

      <div className="border-solid rounded-full bg-gray"></div>
      <div className="text-sm text-normal">
        Designed with &hearts; in 2022
        <span className="block">All rights reserved.</span>
      </div>
    </>
  );
}