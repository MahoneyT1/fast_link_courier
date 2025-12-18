import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const downloadReceipt = async () => {
    const receipt = document.getElementById("receipt");

    const canvas = await html2canvas(receipt as HTMLElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("receipt.pdf");
};
