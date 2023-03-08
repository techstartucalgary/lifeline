import { Document, Page } from "react-pdf/dist/esm/entry.vite";

function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default PDFViewer;