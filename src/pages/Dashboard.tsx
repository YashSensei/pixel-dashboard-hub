import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProductForm } from "@/components/ProductForm"
import { ProductList } from "@/components/ProductList"
import type { ProductFormValues } from "@/schemas/product"

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

  const handleGeneratePDF = () => {
    if (products.length === 0) {
      toast({
        variant: "destructive",
        title: "No products",
        description: "Please add at least one product to generate an invoice.",
      })
      return
    }

    toast({
      title: "Generating Invoice",
      description: "Your invoice is being generated...",
    })

    // Here you would typically generate and download the PDF
    setTimeout(() => {
      toast({
        title: "Invoice Generated",
        description: "Your invoice has been downloaded successfully.",
      })
    }, 1500)
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
            onGeneratePDF={handleGeneratePDF}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard