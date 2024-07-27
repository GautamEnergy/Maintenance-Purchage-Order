import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import img1 from "../../Assets/Images/logogs.png";
import watermarkImg from "../../Assets/Images/logogs.png";

const GeneratePdf = () => {
  const pdfRef = useRef();

  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Add watermark image
      const watermark = new Image();
      watermark.src = watermarkImg;
      watermark.onload = () => {
        pdf.setGState(new pdf.GState({ opacity: 0.1 }));
        pdf.addImage(watermark, 'PNG', pdfWidth / 4, pdfHeight / 4, pdfWidth / 2, pdfHeight / 2);
        pdf.setGState(new pdf.GState({ opacity: 1 })); 

        pdf.save('download.pdf');
      };
    });
  };

  const tableData = [
    { name: 'Bhanu', number: '9801096001', address: '123 Main St', pin: '12345', email: 'bhanu@example.com' },
    { name: 'Aman', number: '9999999999', address: '456 Elm St', pin: '67890', email: 'aman@example.com' },
    { name: 'Alok', number: '9898989898', address: '789 Oak St', pin: '11223', email: 'alok@example.com' },
    { name: 'Mahesh', number: '8585858585', address: '321 Maple St', pin: '44556', email: 'mahesh@example.com' },
    { name: 'Ramesh', number: '6285858585', address: '654 Pine St', pin: '77889', email: 'ramesh@example.com' },
    { name: 'Suresh', number: '99999999789', address: '987 Cedar St', pin: '99001', email: 'suresh@example.com' },
    { name: 'Neelesh', number: '9898989898', address: '159 Walnut St', pin: '22334', email: 'neelesh@example.com' },
    { name: 'Rohan', number: '6200111111', address: '753 Birch St', pin: '55667', email: 'rohan@example.com' },
    { name: 'Narayan', number: '9801096002', address: '852 Ash St', pin: '88900', email: 'narayan@example.com' },
    { name: 'Sanjay', number: '9876543210', address: '951 Cherry St', pin: '33221', email: 'sanjay@example.com' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#e0e0e0', marginTop: '90px' }}>
      <div ref={pdfRef} style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <img src={img1} alt="" className="text-center" rounded style={{ width: '25%', marginLeft: "36%" }} />
        <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginTop: "12px", marginBottom: '12px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
          Quality Report
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mo No.</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', width: '200px' }}>Address</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Pin Code</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.number}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', width: '200px' }}>{row.address}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.pin}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleDownloadPdf} style={{ marginLeft: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Download PDF
      </button>
    </div>
  );
};

export default GeneratePdf;
