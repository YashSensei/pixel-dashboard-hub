import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProductForm } from "@/components/ProductForm"
import { ProductList } from "@/components/ProductList"
import type { ProductFormValues } from "@/schemas/product"
import jsPDF from "jspdf"

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleAddProduct = (values: ProductFormValues) => {
    const price = parseFloat(values.price)
    const quantity = parseInt(values.quantity)

    if (isNaN(price) || isNaN(quantity)) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Price and quantity must be valid numbers.",
      })
      return
    }

    const product: Product = {
      id: Date.now(),
      name: values.name,
      price,
      quantity,
    }

    setProducts([...products, product])
    toast({
      title: "Product added successfully!",
    })
  }

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const handleLogout = () => {
    navigate("/login")
  }

  const generatePDF = () => {
    if (products.length === 0) {
      toast({
        variant: "destructive",
        title: "No products",
        description: "Please add at least one product to generate an invoice.",
      })
      return
    }

    const doc = new jsPDF()
    let yPos = 20

    // Add header
    doc.setFontSize(20)
    doc.text("Invoice", 20, yPos)
    yPos += 20

    // Add date
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos)
    yPos += 20

    // Add table headers
    doc.setFontSize(12)
    doc.text("Product", 20, yPos)
    doc.text("Price", 80, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Total", 160, yPos)
    yPos += 10

    // Add products
    let subtotal = 0
    products.forEach((product) => {
      const total = product.price * product.quantity
      subtotal += total

      doc.text(product.name, 20, yPos)
      doc.text(`₹${product.price.toFixed(2)}`, 80, yPos)
      doc.text(product.quantity.toString(), 120, yPos)
      doc.text(`₹${total.toFixed(2)}`, 160, yPos)
      yPos += 10
    })

    yPos += 10
    // Add totals
    const gst = subtotal * 0.18
    const total = subtotal + gst

    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 120, yPos)
    yPos += 10
    doc.text(`GST (18%): ₹${gst.toFixed(2)}`, 120, yPos)
    yPos += 10
    doc.setFontSize(14)
    doc.text(`Total: ₹${total.toFixed(2)}`, 120, yPos)

    // Save the PDF
    doc.save("invoice.pdf")
    
    toast({
      title: "Invoice Generated",
      description: "Your invoice has been downloaded successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products Dashboard</h1>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <ProductForm onSubmit={handleAddProduct} />

        {products.length > 0 && (
          <ProductList
            products={products}
            sortOrder={sortOrder}
            onToggleSort={toggleSort}
            onGeneratePDF={generatePDF}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard