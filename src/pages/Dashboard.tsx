import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all product details.",
      });
      return;
    }

    const price = parseFloat(newProduct.price);
    const quantity = parseInt(newProduct.quantity);

    if (isNaN(price) || isNaN(quantity)) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Price and quantity must be valid numbers.",
      });
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price,
      quantity,
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", quantity: "" });
    toast({
      title: "Product added successfully!",
    });
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const calculateSubTotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubTotal();
    return subtotal + subtotal * 0.18; // Adding 18% GST
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF Generation",
      description: "PDF invoice generation feature will be implemented soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add Products</h1>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <Input
              placeholder="Enter the product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Product Price</label>
            <Input
              type="number"
              placeholder="Enter the price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              placeholder="Enter the Qty"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="bg-secondary"
            />
          </div>
        </div>

        <Button
          onClick={handleAddProduct}
          className="mb-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add Product +
        </Button>

        {products.length > 0 && (
          <div className="bg-secondary rounded-lg p-4 mb-8 animate-fadeIn">
            <div className="grid grid-cols-4 gap-4 mb-4 font-medium">
              <button onClick={toggleSort} className="flex items-center">
                Product name <ArrowUpDown className="ml-2 h-4 w-4" />
              </button>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total Price</div>
            </div>

            {sortedProducts.map((product) => (
              <div key={product.id} className="grid grid-cols-4 gap-4 py-2 border-t border-border">
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
                <div>INR {(product.price * product.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div className="border-t border-border mt-4 pt-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 text-right">Sub-Total</div>
                <div>INR {calculateSubTotal().toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-3 text-right">Incl + GST 18%</div>
                <div>INR {calculateTotal().toFixed(2)}</div>
              </div>
            </div>

            <Button
              onClick={handleGeneratePDF}
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Generate PDF Invoice
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;