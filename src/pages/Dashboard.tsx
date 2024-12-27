import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";

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
    if (products.length === 0) {
      toast({
        variant: "destructive",
        title: "No products",
        description: "Please add at least one product to generate an invoice.",
      });
      return;
    }

    toast({
      title: "Generating Invoice",
      description: "Your invoice is being generated...",
    });

    // Here you would typically generate and download the PDF
    setTimeout(() => {
      toast({
        title: "Invoice Generated",
        description: "Your invoice has been downloaded successfully.",
      });
    }, 1500);
  };

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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Enter the product details below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the product name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-secondary"
                    />
                  </FormControl>
                </FormItem>
              </div>

              <div className="space-y-2">
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="bg-secondary"
                    />
                  </FormControl>
                </FormItem>
              </div>

              <div className="space-y-2">
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the Qty"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      className="bg-secondary"
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleAddProduct}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Product
            </Button>
          </CardFooter>
        </Card>

        {products.length > 0 && (
          <Card className="mb-8 animate-fadeIn">
            <CardHeader>
              <CardTitle>Product List</CardTitle>
              <CardDescription>Manage your products and generate invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-muted">
                  <button onClick={toggleSort} className="flex items-center">
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
                onClick={handleGeneratePDF}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Generate Invoice
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
