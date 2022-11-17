import React from "react";

interface Props {
}

const ProgressBar: React.FC<Props> = ({ 
  }) => { 
  return (
    <progress 
      style={{
        width: "50%",
        height: "10px",
        position: "relative",
        borderRadius: "28px",
        padding: "10px",
        border: "4px solid #EDE9E8",
      }}
    >
    </progress>
  );
}

export default ProgressBar;