import NavigationBar from "../../components/NavigationBar";
import { classnames } from "../../Utilities";
import Footer from "../../components/Footer";

export default function Policy() {
  return (
    <>
      <div className="w-1/2 mx-auto text-on-primary-container">
        <NavigationBar />
      
        <div className="mt-28">
          <h1 className={classnames("text-4xl", "font-display")}>
        Privacy Policy
          </h1>
          <h3 className={classnames("text-primary", "font-headline uppercase italic")}>Last updated: Jan 24, 2023</h3>
          <section className={classnames("mt-10", "font-sans", "text-base")}>
            <p>
            As of Jan 25, 2023, Lifeline does not store user data. Lifeline reserves the right 
            to add, delete or modify all content/services related to the application at any 
            time without prior notice. When applicable, this privacy policy will be updated to 
            reflect the modification to our content/services.
            </p>
            <br />
            <p>
            This website provides links to other websites owned by third parties. The content 
            of such third party sites is not within our control, therefore we cannot take any 
            responsibility for the privacy of data thereon. Links to such websites or any 
            content/products related to the link are not endorsed by Lifeline.
            </p>
            <br />
            <p>
            As of Jan 25 2023, Lifeline strictly attempts to extract deadline information. 
            In any case that other information is breached or used otherwise in unforeseen 
            circumstances, liability will fall on the user.
            </p>
            <br />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
