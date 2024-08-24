import React from "react";

interface PrintHandlerProps {
  index: number;
  printableRef: React.RefObject<HTMLDivElement>;
}

const PrintHandler: React.FC<PrintHandlerProps> = ({ index, printableRef }) => {
  const getStyles = () => {
    const styles = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    );
    return styles.map((style) => style.outerHTML).join("");
  };

  const printDiv = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    const printContent = printableRef.current?.innerHTML;

    if (printWindow && printContent) {
      printWindow.document.write("<html><head><title>Print</title>");
      printWindow.document.write(getStyles());
      printWindow.document.write("</head><body >");
      printWindow.document.write(printContent);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <button
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={printDiv}
    >
      Export
    </button>
  );
};

export default PrintHandler;
