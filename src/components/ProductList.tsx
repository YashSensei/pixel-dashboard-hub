import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpDown } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

interface ProductListProps {
  products: Product[]
  sortOrder: "asc" | "desc"
  onToggleSort: () => void
  onGeneratePDF: () => void
}

export function ProductList({
  products,
  sortOrder,
  onToggleSort,
  onGeneratePDF,
}: ProductListProps) {
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })

  const calculateSubTotal = () => {
    return products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    )
  }

  const calculateTotal = () => {
    const subtotal = calculateSubTotal()
    return subtotal + subtotal * 0.18 // Adding 18% GST
  }

  return (
    <Card className="mb-8 animate-fadeIn">
      <CardHeader>
        <CardTitle>Product List</CardTitle>
        <CardDescription>Manage your products and generate invoice</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-muted">
            <button onClick={onToggleSort} className="flex items-center">
              Product name <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total Price</div>
          </div>

          {sortedProducts.map((product) => (
            <div key={product.id} className="grid grid-cols-4 gap-4 p-4 border-t">
              <div>{product.name}</div>
              <div>₹{product.price.toFixed(2)}</div>
              <div>{product.quantity}</div>
              <div>₹{(product.price * product.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div className="border-t p-4">
            <div className="grid grid-cols-4 gap-4 font-medium">
              <div className="col-span-3 text-right">Sub-Total:</div>
              <div>₹{calculateSubTotal().toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-2 font-medium">
              <div className="col-span-3 text-right">GST (18%):</div>
              <div>₹{(calculateSubTotal() * 0.18).toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-2 text-lg font-bold">
              <div className="col-span-3 text-right">Total:</div>
              <div>₹{calculateTotal().toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onGeneratePDF}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Generate Invoice
        </Button>
      </CardFooter>
    </Card>
  )
}