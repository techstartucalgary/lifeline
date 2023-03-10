/* eslint-disable max-lines */
import { useEffect } from "react";

import { classnames } from "../../Utilities";
import { Button } from "../../components/Button";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import styles from "./Landing.module.css";
import blob1 from "./blob1.svg";
import blob2 from "./blob2.svg";
import blob3 from "./blob3.svg";
import blob4 from "./blob4.svg";
import divider from "./divider.svg";
import wfh1 from "./wfh_1.svg";
import wfh7 from "./wfh_7.svg";
import wfh8 from "./wfh_8.svg";

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
    <div className="flex flex-row space-x-5">
      <div className="grow-0">
        <div className="bg-ref-primary-95 rounded-2xl p-5 md:p-6">
          <span className="material-symbols-outlined text-3xl font-bold text-on-surface">
            {icon}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <div className={classnames("font-semibold text-on-surface", "text-[1.18rem] sm:text-[1.32rem] md:text-[1.38rem] lg:text-[1.4rem]")}>{title}</div>
        <div className={classnames("text-sys-on-surface/87 leading-6 text-on-surface-variant", landingText)}>{description}</div>
      </div>
    </div>
  );
};

const landingText = "text-[1.16rem] sm:text-[1.3rem] md:text-[1.36rem] lg:text-1.5xl";


export default function Landing() {
  useEffect(() => {
    document.title = "Lifeline | Making Deadlines Easier";
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 sm:px-14 md:px-16 lg:px-20 relative">
        <NavigationBar />

        {/* Hero section */}
        <div
          className={classnames(
            "gap-3 grid",
            "mt-32 sm:mt-20 md:mt-24 lg:mt-28",
            "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12"
          )}
        >
          <img src={blob1} alt="" className={classnames(styles.blob, "absolute w-[35rem] right-0 top-0 translate-x-[50%] translate-y-[-50%]")} aria-hidden={true} />
          <img src={blob2} alt="" className={classnames(styles.blob, "absolute w-[26rem] left-0 top-[28rem] translate-x-[-50%] sm:translate-x-[-50%] lg:translate-x-[-90%] translate-y-[0%]")} aria-hidden={true} />

          {/* Left section */}
          <div
            className={classnames(
              "flex items-center",
              "col-span-4 sm:col-span-8 md:col-span-8 lg:col-span-7",
              "text-left sm:text-center lg:text-left",
            )}
          >
            <div className="flex flex-col">
              <div className={classnames("font-bold font-headline tracking-[-0.075rem] sm:tracking-[-0.1rem]", "text-3xl sm:text-4xl md:text-5xl xl:text-6xl")}>
                <div className="sm:whitespace-nowrap text-on-surface">A better way to </div>
                <div
                  className={classnames(
                    styles["title-highlight"],
                    "text-primary-60 sm:whitespace-nowrap",
                    "text-5xl sm:text-6xl md:text-7xl xl:text-7xl",
                    "pb-2"
                  )}
                >
                  organize deadlines
                </div>
              </div>

              <div className={classnames("text-on-surface-variant mt-8", "mr-8 sm:mr-0 lg:mr-20", landingText)}>
                Lifeline takes the stress out of managing important dates for your
                courses. Start saving more time and always keep track of your
                deadlines in just a few clicks.
                Start for free today to make your scheduling a breeze.
              </div>

              <div
                className={classnames(
                  "flex justify-start mt-10",
                  "text-md sm:text-xl",
                  "sm:justify-center lg:justify-start"
                )}
              >
                <Button to="/app" variant="filled" className="py-5 px-7 hidden sm:block mr-2">Get Started</Button>
                <Button to="/workflow" variant="text" className="py-5 px-4 -ml-4 -mt-6 sm:ml-0 sm:mt-0">Learn more</Button>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div
            className={classnames(
              "mt-4 sm:mt-12 md:mt-12 lg:mt-0",
              "col-span-4 sm:col-span-8 lg:col-span-5",
              "flex justify-center lg:justify-start",
            )}
          >
            <img src={wfh1} className="w-10/12 max-w-sm md:w-8/12 md:max-w-lg lg:scale-125 lg:w-full lg:max-w-full" alt="a girl using laptop and concentrating in work on her desk" />
          </div>
        </div>

        {/* Flow section */}
        <div
          className={classnames(
            "gap-3 grid",
            "mt-16 sm:mt-20 md:mt-24 lg:mt-48",
            "grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12",
          )}
        >
          <img src={blob4} alt="" className={classnames(styles.blob, "absolute w-[28rem] right-0 top-[50%] translate-x-[50%] sm:translate-x-[40%] lg:translate-x-[90%] translate-y-[-40%]")} aria-hidden={true} />

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
            <img src={wfh7} className="w-10/12 max-w-sm md:w-8/12 md:max-w-lg lg:w-full lg:scale-110 lg:max-w-full" alt="two friends solving puzzle" />
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
              <FlowStep title="Upload your course syllabus" description="Select all your syllabus in pdf and upload to process" icon="upload_file" />
              <FlowStep title="Preview and edit" description="Lifeline extracts important information and generate your schedule, and get the chance to preview and make changes" icon="edit" />
              <FlowStep title="Export your schedule" description="Download your schedule in a variety of formats, including PDF, iCal, and Google Calendar" icon="download" />
            </div>
          </div>
        </div>

        {/* Introduction section */}
        <div
          className={classnames(
            "text-center relative",
            "mt-16 sm:mt-20 md:mt-24 lg:mt-48",
            landingText
          )}
        >
          <img src={blob3} alt="" className={classnames(styles.blob, "absolute w-[32rem] left-0 top-[50%] translate-x-[-50%] sm:translate-x-[-40%] lg:translate-x-[-90%] translate-y-[-10%]")} aria-hidden={true} />

          <div className="space-y-2">
            <p className={classnames("text-on-surface font-semibold", "text-1.5xl sm:text-3xl md:text-3xl lg:text-3xl")}>
              Easily integrates into your favourite calendar
            </p>
            <div className="text-on-surface-variant flex justify-center">
              <p className="lg:w-8/12">
                Lifeline generates your schedule in a convenient format, allowing you
                to comfortably share calendar information. Import your schedule
                details into a digital calendar such as Microsoft Outlook, Google
                Calendar, or Apple Calendar.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <img src={wfh8} className="w-10/12 max-w-sm md:w-8/12 md:max-w-lg lg:w-6/12 lg:max-w-full" alt="a girl sitting on a stool and working in her laptop by the window" />
          </div>
        </div>


        {/* Get Started section */}
        <>
          <div
            className={classnames(
              "text-center",
              landingText
            )}
          >
            <img src={divider} alt="" aria-hidden={true} className="w-full my-16 sm:my-20 md:my-24 lg:my-28" />
            <div className="space-y-2">
              <p className={classnames("text-on-surface leading-6 font-semibold", "text-1.5xl sm:text-3xl md:text-3xl lg:text-3xl")}>
                Ready to schedule with ease?
              </p>
              <div className="text-on-surface-variant flex justify-center">
                <p className="lg:w-8/12">
                  Start using Lifeline today to take control of your time and never
                  worry about handling deadlines anymore.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 sm:relative">
            <div className="flex justify-center pt-8 pb-4">
              <Button
                to="/app"
                variant="filled"
                className={classnames(
                  "py-5 px-8",
                  "text-lg sm:text-xl",
                )}>
                Get Started
              </Button>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
}