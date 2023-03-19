import { Link } from "react-router-dom";

import { classnames } from "../../Utilities";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <div className="bg-on-secondary-container">
        <div className="bg-sys-background rounded-b-[2.6rem] sm:rounded-b-[6rem] h-11 sm:h-16 lg:h-24"></div>
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
                <div>
                  <Link to="/disclaimer">Disclaimer</Link>
                </div>
                <div>
                  <a href="mailto:lifeline@techstartucalgary.com">
                      Feedback
                  </a>
                </div>
                <div>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-2">
                <div>
                  <a href="https://techstartucalgary.com/projects" target="_blank" rel="noreferrer">
                      About
                  </a>
                </div>
                <div>
                  <a href="https://github.com/techstartucalgary/lifeline" target="_blank" rel="noreferrer">
                      GitHub
                  </a>
                </div>
                <div>
                  <a href="https://techstartucalgary.com/" target="_blank" rel="noreferrer">
                      Tech Start UCalgary
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

