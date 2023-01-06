import { useEffect } from "react";
import { Link } from "react-router-dom";
import { twMerge as classnames } from "tailwind-merge";

import Button from "../../components/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
// import illustrations
import illustration1 from "../../assets/illustration1.svg";
import illustration10 from "../../assets/illustration10.svg";
import illustration19 from "../../assets/illustration19.svg";
import uploadIcon from "../../assets/upload.svg";
import editIcon from "../../assets/edit.svg";
import exportIcon from "../../assets/export-icon.svg";

import "./Landing.css";


export default function Landing() {
  useEffect(() => {
    document.title = "Lifeline | Making Deadlines Easier";
  }, []);

  return (
    <div className="font-display max-w-7xl mx-auto px-5 sm:px-14 md:px-16 lg:px-20">
      <NavigationBar />

      {/* Hero Section */}
      <div
        className={classnames(
          "gap-3 grid",
          "mt-16 sm:mt-20 md:mt-24 lg:mt-28",
          "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12"
        )}
      >
        {/* Left section */}
        <div
          className={classnames(
            "flex items-center",
            "col-span-4 sm:col-span-8 md:col-span-8 lg:col-span-7",
            "text-left sm:text-center lg:text-left",
          )}
        >
          <div className="space-y-10 flex flex-col">
            <div className={classnames("font-bold", "text-4xl sm:text-5xl md:text-6xl xl:text-6xl")}>
              <div className="whitespace-nowrap">A better way to </div>
              <div className={classnames("text-primary-50 title-highlight whitespace-nowrap", "pb-2 sm:pt-1")}>organize deadlines</div>
            </div>

            <div className={classnames("mr-10 sm:mr-0 lg:mr-10", "text-md sm:text-lg md:text-xl lg:text-xl")}>
              Lifeline takes the stress out of managing important dates for your
              courses. Start saving more time and always keep track of your
              deadlines in just a few clicks.
              Start for free today to make your scheduling a breeze.
            </div>

            <div
              className={classnames(
                "flex justify-start",
                "text-md sm:text-lg",
                "sm:justify-center lg:justify-start"
              )}
            >
              <Button to="/upload" variant="filled" className="py-4 hidden sm:block mr-2">Get Started</Button>
              <Button to="/workflow" variant="text" className="px-4 py-4 -ml-4 -mt-6 sm:ml-0 sm:mt-0">Learn more</Button>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div
          className={classnames(
            "mt-4 sm:mt-12 md:mt-12 lg:mt-0",
            "col-span-4 sm:col-span-8 lg:col-span-5",
            "flex justify-center lg:justify-start"
          )}
        >
          <img src={illustration1} alt="an illustration of a girl scheduling her calendar" />
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
    </div>
  );
}