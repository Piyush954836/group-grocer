import { useState } from "react";
import Header from "@/components/layout/Header";
import AuthModal from "@/components/auth/AuthModal";
import EnhancedVendorDashboard from "@/components/dashboard/EnhancedVendorDashboard";
import ProductBrowsing from "@/components/products/ProductBrowsing";
import ShoppingCartComponent from "@/components/cart/ShoppingCartComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Store, 
  Users, 
  TrendingDown, 
  Truck, 
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  LayoutDashboard,
  Search
} from "lucide-react";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
  const [userType, setUserType] = useState<"vendor" | "supplier" | "admin">("vendor");
  const [activeTab, setActiveTab] = useState<"dashboard" | "browse" | "cart">("dashboard");

  // Mock cart count for header
  const cartItemCount = 5;

  // If not logged in, show landing page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="hero-gradient text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Group Ordering for
              <br />
              <span className="text-primary-light">Small Vendors</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join with other vendors in your area to get bulk discounts on raw materials. 
              Save money through collective purchasing power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setShowAuthModal(true)}
                className="text-lg px-8 py-6"
              >
                <Store className="w-5 h-5" />
                Join as Vendor
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowAuthModal(true)}
                className="text-lg px-8 py-6 border-primary-light text-primary-foreground hover:bg-primary-light/10"
              >
                <Truck className="w-5 h-5" />
                Become Supplier
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How GroupGrocer Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple, smart, and cost-effective procurement for small businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-custom-md">
                <CardHeader>
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Form Groups</CardTitle>
                  <CardDescription>
                    Connect with 3+ vendors in your pincode ordering the same products within 12 hours
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center shadow-custom-md">
                <CardHeader>
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Get Discounts</CardTitle>
                  <CardDescription>
                    Unlock bulk pricing when your group reaches minimum quantity thresholds
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center shadow-custom-md">
                <CardHeader>
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Easy Delivery</CardTitle>
                  <CardDescription>
                    Choose from supplier delivery, third-party logistics, or pickup points
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Group Orders Demo */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Live Group Orders in Your Area
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="shadow-custom-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Premium Basmati Rice (25kg)</CardTitle>
                      <CardDescription>by FreshFarm Supplies</CardDescription>
                    </div>
                    <Badge variant="secondary">110001</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">₹1,200</span>
                      <span className="text-lg font-bold text-success ml-2">₹1,000</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Save ₹200</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">2/3 vendors joined</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>8 hours remaining</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="business" 
                    className="w-full"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setActiveTab("browse");
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Join This Group
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-custom-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Refined Cooking Oil (5L)</CardTitle>
                      <CardDescription>by Golden Oil Co.</CardDescription>
                    </div>
                    <Badge variant="secondary">110001</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">₹450</span>
                      <span className="text-lg font-bold text-success ml-2">₹380</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Save ₹70</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">4/5 vendors joined</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-4/5"></div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>4 hours remaining</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="business" 
                    className="w-full"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setActiveTab("browse");
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Join This Group
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowAuthModal(true)}
              >
                View All Live Groups
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of vendors who are already saving money through smart group ordering
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setShowAuthModal(true)}
              className="text-lg px-8 py-6"
            >
              Get Started Today
            </Button>
          </div>
        </section>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

  // Logged in vendor dashboard with tabs
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header for logged in users */}
      <header className="bg-background border-b border-border shadow-custom-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">GroupGrocer</h1>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="browse" className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Browse
                  </TabsTrigger>
                  <TabsTrigger value="cart" className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Cart ({cartItemCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dashboard" className="flex items-center gap-1">
                  <LayoutDashboard className="w-3 h-3" />
                  <span className="text-xs">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="browse" className="flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  <span className="text-xs">Browse</span>
                </TabsTrigger>
                <TabsTrigger value="cart" className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  <span className="text-xs">Cart ({cartItemCount})</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "dashboard" && <EnhancedVendorDashboard />}
        {activeTab === "browse" && <ProductBrowsing />}
        {activeTab === "cart" && <ShoppingCartComponent />}
      </main>
    </div>
  );
};

export default Index;