import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  Users, 
  Clock, 
  MapPin, 
  Package, 
  Truck,
  AlertCircle,
  CheckCircle 
} from "lucide-react";

const VendorDashboard = () => {
  // Mock data for demonstration
  const activeGroupOrders = [
    {
      id: 1,
      product: "Premium Rice (25kg)",
      supplier: "FreshFarm Supplies",
      normalPrice: 1200,
      groupPrice: 1000,
      currentMembers: 2,
      requiredMembers: 3,
      timeLeft: "8 hours",
      pincode: "110001"
    },
    {
      id: 2,
      product: "Cooking Oil (5L)",
      supplier: "Golden Oil Co.",
      normalPrice: 450,
      groupPrice: 380,
      currentMembers: 4,
      requiredMembers: 5,
      timeLeft: "4 hours",
      pincode: "110001"
    }
  ];

  const recentOrders = [
    {
      id: "ORD001",
      product: "Vegetables Mix",
      status: "Delivered",
      date: "2024-01-20",
      amount: 850
    },
    {
      id: "ORD002",
      product: "Spices Bundle",
      status: "In Transit",
      date: "2024-01-22",
      amount: 650
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and join group purchases</p>
        </div>
        <Button variant="business">
          <ShoppingCart className="w-4 h-4" />
          Browse Products
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                <p className="text-2xl font-bold text-primary">2</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings This Month</p>
                <p className="text-2xl font-bold text-success">₹2,340</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Delivery</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </div>
              <Truck className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Group Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Active Group Orders
          </CardTitle>
          <CardDescription>
            Join group orders to get discounted prices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeGroupOrders.map((order) => (
            <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{order.product}</h3>
                  <p className="text-sm text-muted-foreground">by {order.supplier}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Pincode: {order.pincode}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">₹{order.normalPrice}</span>
                      <span className="font-bold text-success">₹{order.groupPrice}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Save ₹{order.normalPrice - order.groupPrice}
                    </Badge>
                  </div>
                  
                  <Button variant="business" size="sm">
                    Join Group
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Group Progress</span>
                  <span className="font-medium">
                    {order.currentMembers}/{order.requiredMembers} vendors
                  </span>
                </div>
                <Progress 
                  value={(order.currentMembers / order.requiredMembers) * 100} 
                  className="h-2"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{order.timeLeft} remaining</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your order history and tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{order.product}</p>
                  <p className="text-sm text-muted-foreground">Order #{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.amount}</p>
                  <Badge 
                    variant={order.status === "Delivered" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;