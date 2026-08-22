import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/** Capture a receipt DOM node and save as a single-page A4 PDF. */
export async function downloadReceiptPdf(element, filename = "SSRRT-donation-receipt.pdf") {
  if (!element) {
    throw new Error("Receipt element not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#fbf6ec",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
  } else {
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  }

  pdf.save(filename);
}
