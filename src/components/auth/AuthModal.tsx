import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Store, Truck, Shield } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [userType, setUserType] = useState<"vendor" | "supplier" | "admin">("vendor");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-custom-lg">
        <CardHeader>
          <CardTitle className="text-center">Welcome to GroupGrocer</CardTitle>
          <CardDescription className="text-center">
            Join the smart procurement platform for vendors and suppliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button variant="gradient" className="w-full">
                Login
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>I am a:</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setUserType("vendor")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userType === "vendor"
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Store className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs font-medium">Vendor</div>
                  </button>
                  <button
                    onClick={() => setUserType("supplier")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userType === "supplier"
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Truck className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs font-medium">Supplier</div>
                  </button>
                  <button
                    onClick={() => setUserType("admin")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userType === "admin"
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-xs font-medium">Admin</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              {userType !== "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="Enter your area pincode" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" />
              </div>
              <Button variant="gradient" className="w-full">
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
          
          <Button variant="ghost" onClick={onClose} className="w-full mt-4">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;