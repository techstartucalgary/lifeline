import Button from "../../components/Button";

const NotFound = () => {
  return (
    <div className="max-w-lg mx-auto h-full flex justify-center items-center p-4">
      <div className="w-full space-y-5 flex flex-col items-center">
        <div className="w-full mx-auto bg-primary-container rounded-3xl text-center px-6 py-10 font-display">
          <i className="material-symbols-outlined text-primary text-5xl mb-6">
            explore_off
          </i>
          <p className="text-xl text-on-primary-container">
            Oops, this page is gone.
          </p>
        </div>
        <Button variant="filled" color="primary" className="py-4 px-8" to="/">
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;