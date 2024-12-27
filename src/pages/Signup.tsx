import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all fields to continue.",
      });
      return false;
    }
    if (!email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Here you would typically make an API call to register the user
    // For now, we'll simulate success and redirect
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account created successfully!",
        description: "Welcome to Levitation Infotech.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 animate-fadeIn">
          <img
            src="/lovable-uploads/09d6ec14-7812-4bc8-b263-dd44a3ad75ae.png"
            alt="Signup Banner"
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        <div className="flex-1 w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Sign up to begin journey</h2>
            <p className="text-muted-foreground">
              This is basic signup page which is used for levitation assignment purpose.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter your name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary"
              />
              <p className="text-xs text-muted-foreground">
                This name will be displayed with your inquiry
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary"
              />
              <p className="text-xs text-muted-foreground">
                This email will be displayed with your inquiry
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary"
              />
              <p className="text-xs text-muted-foreground">
                Any further updates will be forwarded on this Email ID
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>

            <p className="text-center text-sm">
              Already have account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;