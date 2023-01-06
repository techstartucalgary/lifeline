import { useEffect } from "react";
import { Link } from "react-router-dom";
import { twMerge as classnames } from "tailwind-merge";

import Button from "../../components/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import illustration1 from "./illustration1.svg";
import illustration10 from "./illustration10.svg";
import illustration19 from "./illustration19.svg";
import uploadIcon from "../../assets/upload.svg";
import editIcon from "../../assets/edit.svg";
import exportIcon from "../../assets/export-icon.svg";

import "./Landing.css";

const FlowStep = (
  {
    title,
    description,
    icon
  }: {
    title: string;
    description: string;
    icon: string;
  }) => {
  return (
    <div className="flex flex-row space-x-4">
      <div className="grow-0">
        <div className="bg-ref-primary-95 rounded-2xl p-5">
          <span className="material-symbols-outlined text-3xl font-bold">
            {icon}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <div className={classnames("font-semibold", "text-md sm:text-lg md:text-xl lg:text-xl")}>{title}</div>
        <div className={classnames("text-sys-on-surface/87 leading-6", "text-sm sm:text-md md:text-lg lg:text-lg")}>{description}</div>
      </div>
    </div>
  );
};



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

            <div className={classnames("mr-8 sm:mr-0 lg:mr-20", "text-md sm:text-lg md:text-xl lg:text-xl")}>
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

      {/* Flow section */}
      <div
        className={classnames(
          "gap-3 grid",
          "mt-16 sm:mt-20 md:mt-24 lg:mt-28",
          "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12",
        )}
      >
        {/* Left section */}
        <div
          className={classnames(
            "flex items-center",
            "order-2 lg:order-1",
            "mt-12 sm:mt-16 md:mt-20 lg:mt-0",
            "mr-0 sm:mr-0 md:mr-0 lg:mr-10",
            "col-span-4 sm:col-span-8 md:col-span-8 lg:col-span-6",
            "flex justify-center lg:justify-start",
          )}
        >
          <img src={illustration19} alt="illustration of two boys discussing ideas over calendar" />
        </div>

        {/* Right section */}
        <div
          className={classnames(
            "flex items-center",
            "order-1 lg:order-2",
            "col-span-4 sm:col-span-8 md:col-span-8 lg:col-span-6",
            "mx-0 sm:mx-16 md:mx-16 lg:mx-0"
          )}
        >
          <div className="flex flex-col space-y-9">
            <FlowStep title="Upload your course outline" description="Up to 3 PDF documents are accepted" icon="upload_file" />
            <FlowStep title="Preview and edit" description="Lifeline extracts important information and generate your schedule, and get the chance to preview and make changes" icon="edit" />
            <FlowStep title="Export your schedule" description="Download your schedule in a variety of formats, including PDF, iCal, and Google Calendar" icon="download" />
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