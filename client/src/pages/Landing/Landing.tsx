import { useEffect } from "react";
import { twMerge as classnames } from "tailwind-merge";

import Button from "../../components/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import illustration1 from "./illustration1.svg";
import illustration10 from "./illustration10.svg";
import illustration19 from "./illustration19.svg";
import blob1 from "./blob1.svg";
import blob2 from "./blob2.svg";
import blob3 from "./blob3.svg";
import blob4 from "./blob4.svg";

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
    <>
      <div className="font-display max-w-7xl mx-auto px-5 sm:px-14 md:px-16 lg:px-20 relative">
        <NavigationBar />

        {/* Hero section */}
        <div
          className={classnames(
            "gap-3 grid",
            "mt-32 sm:mt-20 md:mt-24 lg:mt-28",
            "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12"
          )}
        >
          <img src={blob1} alt="" className="blob absolute right-0 top-0 translate-x-[50%] translate-y-[-60%]" aria-hidden={true} />
          <img src={blob2} alt="" className="blob absolute left-0 top-[26rem] translate-x-[-40%] translate-y-[0%]" aria-hidden={true} />

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
                <div className="sm:whitespace-nowrap">A better way to </div>
                <div className={classnames("text-primary-50 title-highlight sm:whitespace-nowrap", "pb-2 sm:pt-1")}>organize deadlines</div>
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
            <img src={illustration1} alt="an illustration of a girl scheduling her calendar" className="w-9/12 lg:w-full max-w-sm lg:max-w-none" />
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
          <img src={blob3} alt="" className="blob absolute right-0 top-[50%] translate-x-[50%] translate-y-[0%]" aria-hidden={true} />

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
            <img src={illustration19} alt="illustration of two boys discussing ideas over calendar" className="w-10/12 lg:w-full max-w-md lg:max-w-none" />
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

        {/* Introduction section */}
        <div
          className={classnames(
            "text-center relative",
            "mt-16 sm:mt-20 md:mt-24 lg:mt-28",
          )}
        >
          <img src={blob4} alt="" className="blob absolute left-0 top-[50%] translate-x-[-50%] translate-y-[20%]" aria-hidden={true} />

          <div className="space-y-2">
            <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl leading-6 font-semibold">
              Easily integrates into your favourite calendar
            </p>
            <div className="flex justify-center text-md sm:text-lg md:text-xl lg:text-xl">
              <p className="lg:w-8/12">
                Lifeline generates your schedule in a convenient format, allowing you
                to comfortably share calendar information. Import your schedule
                details into a digital calendar such as Microsoft Outlook, Google
                Calendar, or Apple Calendar.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <img src={illustration10} alt="illustration of a girl finishing the last piece of a puzzle" className="w-8/12 max-w-sm" />
          </div>
        </div>

        {/* Get Started section */}
        <>
          <div
            className={classnames(
              "text-center",
              "mt-16 sm:mt-20 md:mt-24 lg:mt-28",
            )}
          >
            <div className="space-y-2">
              <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl leading-6 font-semibold">
                Ready to schedule with ease?
              </p>
              <div className="flex justify-center text-md sm:text-lg md:text-xl lg:text-xl">
                <p className="lg:w-8/12">
                  Start using Lifeline today to take control of your time and never
                  worry about handling deadlines anymore.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 sm:relative">
            <div
              className={classnames(
                "flex justify-center pt-8 pb-4",
                "text-md sm:text-lg",
              )}
            >
              <Button to="/upload" variant="filled" className="py-4 shadow-xl sm:shadow-none">Get Started</Button>
            </div>
          </div>
        </>
      </div>

      {/* Footer */}
      <div className="bg-on-secondary-container">
        <div className="bg-sys-background rounded-b-[3rem] h-10 sm:h-16 lg:h-20"></div>
      </div>
      <div className="bg-on-secondary-container">
        <div
          className={classnames(
            "text-secondary-95 font-body font-light text-lg",
            "gap-6 grid max-w-7xl mx-auto",
            "px-5 sm:px-14 md:px-16 lg:px-20 pt-14 pb-16",
            "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12",
            "text-md sm:text-lg md:text-lg lg:text-lg"
          )}
        >
          <div className="col-span-7 flex flex-col justify-center">
            <div>
              <p>Designed with &hearts; in 2022</p>
              <p className="block">All rights reserved.</p>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1 space-y-2">
                <div>Disclaimer</div>
                <div>Feedback</div>
                <div>Privacy Policy</div>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-2">
                <div>About</div>
                <div>GitHub</div>
                <div>University of Calgary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}