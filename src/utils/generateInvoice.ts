import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

export const generateInvoice = (products: Product[]): void => {
  // Create new document in portrait mode
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  })
  
  // Draw logo using shapes instead of image
  doc.setFillColor(0, 0, 0)
  doc.rect(20, 15, 15, 15, "F") // Black hexagon/square for logo
  
  // Company name next to logo
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Levitation", 40, 22)
  doc.setFontSize(12)
  doc.setTextColor(128, 128, 128)
  doc.text("infotech", 40, 28)

  // Add Levitation logo and header
  doc.setFontSize(24)
  doc.setTextColor(33, 37, 41)
  doc.text("INVOICE GENERATOR", 120, 25, { align: "left" })
  doc.setFontSize(14)
  doc.text("Sample Output should be this", 120, 35)

  // Add customer info box
  doc.setFillColor(28, 36, 54)
  doc.roundedRect(15, 50, 180, 40, 3, 3, "F")
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.text("Name", 25, 65)
  doc.setTextColor(203, 251, 69)
  doc.setFontSize(14)
  doc.text("Person_name", 25, 75)
  
  // Email in pill-shaped white container
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(140, 60, 45, 8, 4, 4, "F")
  doc.setTextColor(33, 37, 41)
  doc.setFontSize(10)
  doc.text("example@email.com", 142, 65)
  
  // Date with better positioning
  doc.setTextColor(255, 255, 255)
  doc.text("Date: 12/04/23", 140, 75)

  // Use autoTable for products
  autoTable(doc, {
    startY: 100,
    head: [['Product', 'Qty', 'Rate', 'Total Amount']],
    body: products.map(product => [
      product.name,
      product.quantity,
      `$${product.price}`,
      `USD ${product.price * product.quantity}`
    ]),
    headStyles: {
      fillColor: [35, 41, 54],
      textColor: [255, 255, 255],
      fontSize: 12
    },
    bodyStyles: {
      fontSize: 11
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 30 },
      2: { cellWidth: 40 },
      3: { cellWidth: 50 }
    },
    margin: { left: 15, right: 15 }
  })

  // Calculate final position after table
  const finalY = (doc as any).lastAutoTable.finalY + 20

  // Totals section with better styling
  const totalAmount = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  const gst = totalAmount * 0.18
  const finalTotal = totalAmount + gst

  // Add totals in a clean box
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(120, finalY, 75, 60, 3, 3, "F")
  
  doc.setTextColor(100, 100, 100)
  doc.text("Total Charges", 130, finalY + 15)
  doc.text(`$${totalAmount}`, 175, finalY + 15, { align: "right" })
  doc.text("GST (18%)", 130, finalY + 30)
  doc.text(`$${gst.toFixed(2)}`, 175, finalY + 30, { align: "right" })
  
  doc.setFontSize(14)
  doc.setTextColor(33, 37, 41)
  doc.text("Total Amount", 130, finalY + 45)
  doc.setTextColor(0, 114, 229)
  doc.text(`₹ ${finalTotal.toFixed(2)}`, 175, finalY + 45, { align: "right" })

  // Updated footer with better styling
  doc.setFillColor(28, 36, 54)
  doc.roundedRect(15, doc.internal.pageSize.height - 40, 180, 25, 3, 3, "F")
  
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  const footerText = "We are pleased to provide any further information you may require and look forward to assisting with"
  const footerText2 = "your next order. Rest assured, it will receive our prompt and dedicated attention."
  doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: "center" })
  doc.text(footerText2, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, { align: "center" })

  doc.save("invoice.pdf")
} 