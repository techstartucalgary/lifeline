import { useRef } from "react";
import { useScroll } from "react-use";

const Panel = () => {
  const scrollRef = useRef(null);
  const { x, y } = useScroll(scrollRef);

  return (
    <>
      <div ref={scrollRef} className="overflow-y-auto h-screen bg-primary-90">
        <div className="fixed">
          {x} {y}
        </div>
        <div className="py-96">AAAAAA</div>
        <div className="py-96">AAAAAA</div>
      </div>
    </>
  );
};

export default Panel;
