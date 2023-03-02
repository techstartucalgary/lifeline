import NavigationBar from "../../components/NavigationBar";
import { classnames } from "../../Utilities";
import Footer from "../../components/Footer";

export default function Disclaimer() {
  return (
    <>
      <div className="w-1/2 mx-auto text-on-primary-container">
        <NavigationBar />
      
        <div className="mt-28">
          <h1 className={classnames("text-4xl", "font-display")}>
        Disclaimer
          </h1>
          <h3 className={classnames("text-primary", "font-headline uppercase italic")}>Last updated: Jan 24, 2023</h3>
          <section className={classnames("mt-10", "font-sans", "text-base")}>
            <p>
        Lifeline assumes no responsibility for losses/damages of any nature whatsoever 
        as a result of the use of our service. Lifeline has made every attempt to ensure 
        the accuracy and reliability of our product. However, we cannot guarantee that 
        the results will be fully as expected. Individualresults may vary.
            </p>
            <br />
            <p>
        Errors in the processing interpretation have the chance of occurring due to the 
        nature of the current limitations in the logic.
            </p>
            <br />
            <p>
        Accuracy of interpretation is also dependent on the structure of the file provided. 
        Our product is the most accurate when the document makes use of tables, however, 
        accuracy may vary if deadlines are written differently.
            </p>
            <br />
            <p>
        We strongly recommend the manual verification of all data retrieved from the files 
        being read. Our goal is to speed up and simplify the process of inputting deadlines, 
        however we cannot guarantee the full accuracy of every type of reminder generated.
            </p>
            <br />
            <p>
        Lifeline reserves the right to add, delete or modify all content/services related 
        to the application at any time without prior notice.
            </p>
            <br />
            <p>
        This website provides links to other websites owned by third parties. The content 
        of such third party sites is not within our control, therefore we cannot take any 
        responsibility for the information or content thereon. Links to such websites or 
        any content/products related to the link are not endorsed by Lifeline.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
