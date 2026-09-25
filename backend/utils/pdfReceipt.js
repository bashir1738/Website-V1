const PDFDocument = require('pdfkit');

function generateReceiptPdf({ name, email, trackName, amount, installment, totalInstallments }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];

      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#17121C')
        .text('Payment Receipt', { align: 'left' })
        .moveDown(0.5);

      // Meta info
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#6B6572')
        .text('Date: ', { continued: true })
        .font('Helvetica')
        .text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
        .moveDown(0.2);

      doc
        .font('Helvetica-Bold')
        .text('Billed To: ', { continued: true })
        .font('Helvetica')
        .text(`${name} (${email})`)
        .moveDown(1.5);

      // Table Header
      const tableTop = doc.y;
      
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#6B6572')
        .text('DESCRIPTION', 50, tableTop, { width: 300 })
        .text('AMOUNT', 400, tableTop, { width: 100, align: 'right' });
      
      doc.moveTo(50, doc.y + 5).lineTo(500, doc.y + 5).strokeColor('#EAE6EE').lineWidth(2).stroke();

      // Table Row
      const rowTop = doc.y + 15;
      
      const formatNaira = (amt) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amt);

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#17121C')
        .text(trackName, 50, rowTop, { width: 300 });

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(formatNaira(amount), 400, rowTop, { width: 100, align: 'right' });

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#6B6572')
        .text(totalInstallments > 1 ? `Installment ${installment} of ${totalInstallments}` : 'Full Payment', 50, rowTop + 16, { width: 300 });

      doc.moveTo(50, doc.y + 15).lineTo(500, doc.y + 15).strokeColor('#EAE6EE').lineWidth(1).stroke();

      // Total
      const totalTop = doc.y + 30;
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#17121C')
        .text(`Total Paid: ${formatNaira(amount)}`, 300, totalTop, { width: 200, align: 'right' });

      // Footer
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#6B6572')
        .text('Blockfuse Labs', 50, totalTop + 60, { align: 'center' })
        .moveDown(0.2)
        .font('Helvetica')
        .text('This receipt is proof of payment for the program specified above.', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateReceiptPdf;
