import { SetStateAction, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export interface DocumentPanelProps {
  file: string;
}
const DocumentPanel = ({ file }: DocumentPanelProps) => {
  const [numPages, setNumPages] = useState(0);

  return (
    <Document
      file={file}
      onLoadSuccess={(pdfInfo: { numPages: SetStateAction<number>; }) => setNumPages(pdfInfo.numPages)}
      onLoadError={(e: unknown) => alert(e)}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <div key={index}>
          <Page pageNumber={index + 1} />
          <hr className="border-2 border-gray-200" />
        </div>
      ))}
    </Document>
  );
};

export default DocumentPanel;
