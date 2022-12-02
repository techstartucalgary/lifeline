import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="flex flex-row px-28 mt-28">
        {/* <IconTextPair icon="xx" title="Upload your course outline" />
        <IconTextPair icon="xx" title="Prevw and edt" />
        <IconTextPair icon="xx" title="y" /> */}
        <div className="w-7/12 m-0 pl-12">
          <div className="text-5xl font-poppins font-[800] leading- tracking-tight">
            <h1>A better way to</h1>
            <h1 className=" text-pink">organize deadlines</h1>
          </div>
          <div className="leading-relaxed font-poppins mt-10 w-11/12">
            <p className="text-xl font-normal non-italic">
              Lifeline takes the stress out of managing important dates for your courses. Start saving more time and always keep track of your deadlines in just a few clicks.
              <span className="block">Start for free today to make your scheduling a breeze.</span>
            </p>
            <nav>
              <div className="mt-[60px]">
                <Link to="/upload" className="rounded-full bg-getStarted text-white text-sm text-semibold p-3 px-6 pt-2 baseline">Get Started</Link>
                <Link to="/workflow" className="text-learnMore text-sm text-semibold py-3.5 px-6 inline">Learn more</Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="w-5/12">
          <img src="illustration1.svg" alt="illustration 1" />
        </div>

      </div>

      <div className="flex flex-row w-4/5 mt-36 mx-auto font-poppins">
        <div className="w-1/2">
          <img src="illustration19.svg" alt="illustration 19" />
        </div>
        <div className="pt-8 w-1/2 pl-16">
          <div className="w-4/5 h-1/3">
            <div className="flex flex-row">
              <img src="upload.svg" alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">Upload your course outline<span className="block text-sm font-[400]">Up to 3 PDF documents are accepted</span></p>
              </div>
            </div>
          </div>

          <div className="w-4/5 h-2/5 ">
            <div className="flex flex-row">
              <img src="edit.svg" alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">Preview and edit<span className="block text-sm font-[400]">Lifeline extracts important information and generate your schedule, and get the chance to preview and make changes </span></p>
              </div>
            </div>
          </div>

          <div className="w-4/5 h-2/5">
            <div className="flex flex-row">
              <img src="export.svg" alt="upload" />
              <div className="ml-4">
                <p className="text-lg block font-[600]">Export final result into calendar<span className="block text-sm font-[400]">Download your ICS file and import it into your calendar app  </span></p>
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
          Lifeline generates your schedule in a convenient format, allowing you to comfortably share calendar information.
          Import your schedule details into a digital calendar such as Microsoft Outlook, Google Calendar, or Apple Calendar.
        </p>
        <img src="illustration10.svg" alt="illustration 10" className="mt-14" />
      </div>


      <div className="flex flex-col items-center mt-20 font-poppins">
        <p className="text-2xl font-[600] leading-12 tracking-tight">
          Ready to schedule with ease?
        </p>
        <p className="font-normal text-base w-2/5 text-center">
          Start using Lifeline today to take control of your time and never worry about handling deadlines anymore.
        </p>
        <Link to="/upload" className="rounded-full bg-getStarted text-white text-sm text-semibold p-3 px-6 pt-2 baseline my-8">Get Started</Link>
      </div>

      <div className=" bg-start rounded-full mx-auto text-white baseline">
        Start &rarr;
      </div>

      <div className="border-solid rounded-full bg-gray"></div>
      <div className="text-sm text-normal">Designed with &hearts; in 2022<span className="block">All rights reserved.</span></div>
    </>

  );
}
