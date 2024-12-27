import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Levitation Infotech.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#98FF98]/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Purple border at top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-purple-600 z-10" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-10 bg-[#1a1a1a]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Levitation" className="h-8 w-8" />
          <div>
            <h1 className="text-white font-medium">levitation</h1>
            <p className="text-xs text-gray-400">infotech</p>
          </div>
        </div>
        <div className="text-[#98FF98] text-sm font-medium px-4 py-2 rounded-full border border-[#98FF98]/20 backdrop-blur-sm">
          Connecting People With Technology
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center gap-12">
          {/* Left Carousel */}
          <div className="flex-1 relative">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src="/billboard-image.jpg"
                      alt="Digital Billboard"
                      className="w-full h-[600px] object-cover rounded-xl"
                    />
                    <div className="absolute bottom-8 left-8 z-20 max-w-md">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Thinking to Build or Streamline your online business?
                      </h3>
                      <p className="text-gray-200">
                        Connecting People with Technology
                      </p>
                    </div>
                  </div>
                </CarouselItem>
                {/* Add more carousel items as needed */}
              </CarouselContent>
            </Carousel>
          </div>
          
          {/* Right Form */}
          <div className="flex-1 w-full max-w-md">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.svg" alt="Levitation" className="h-10 w-10" />
                <div>
                  <h2 className="text-white font-medium text-xl">levitation</h2>
                  <p className="text-sm text-gray-400">infotech</p>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let the Journey Begin!
              </h1>
              <p className="text-gray-400">
                This is basic login page which is used for levitation assignment purpose.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter Email ID" 
                          type="email" 
                          {...field}
                          className="bg-[#2a2a2a] border-none text-white h-12 mt-1 focus:ring-1 focus:ring-[#98FF98]/50"
                        />
                      </FormControl>
                      <p className="text-gray-400 text-sm mt-1">
                        This email will be displayed with your inquiry
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Current Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter the Password" 
                          type="password" 
                          {...field}
                          className="bg-[#2a2a2a] border-none text-white h-12 mt-1 focus:ring-1 focus:ring-[#98FF98]/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    className="bg-[#2a2a2a] text-white hover:bg-[#333] px-8 h-12 hover:bg-gradient-to-r hover:from-[#98FF98]/20 hover:to-[#2a2a2a]"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login now"}
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-gray-400 hover:text-[#98FF98]"
                  >
                    Forget password ?
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;