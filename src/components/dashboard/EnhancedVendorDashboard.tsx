import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Users, 
  Clock, 
  MapPin, 
  Package, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Truck,
  Plus,
  Minus,
  Star,
  Bell
} from "lucide-react";

const EnhancedVendorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<"overview" | "groups" | "orders" | "profile">("overview");

  // Mock data
  const stats = {
    activeGroups: 3,
    totalOrders: 47,
    monthlySavings: 12340,
    pendingDeliveries: 2,
    groupsSaved: 8,
    averageDiscount: 18
  };

  const activeGroupOrders = [
    {
      id: 1,
      product: "Premium Basmati Rice (25kg)",
      supplier: "FreshFarm Supplies",
      normalPrice: 1200,
      groupPrice: 1000,
      currentMembers: 2,
      requiredMembers: 3,
      timeLeft: "8 hours",
      pincode: "110001",
      quantity: 2,
      yourSavings: 400,
      status: "joining"
    },
    {
      id: 2,
      product: "Refined Cooking Oil (5L)",
      supplier: "Golden Oil Co.",
      normalPrice: 450,
      groupPrice: 380,
      currentMembers: 4,
      requiredMembers: 5,
      timeLeft: "4 hours",
      pincode: "110001",
      quantity: 3,
      yourSavings: 210,
      status: "almost_complete"
    },
    {
      id: 3,
      product: "Spice Masala Collection",
      supplier: "Spice Masters",
      normalPrice: 600,
      groupPrice: 500,
      currentMembers: 3,
      requiredMembers: 3,
      timeLeft: "2 hours",
      pincode: "110001",
      quantity: 1,
      yourSavings: 100,
      status: "complete"
    }
  ];

  const recentOrders = [
    {
      id: "ORD001",
      product: "Mixed Vegetables Bundle",
      supplier: "Fresh Veggies Ltd",
      status: "Delivered",
      date: "2024-01-20",
      amount: 720,
      originalAmount: 800,
      savings: 80,
      type: "group"
    },
    {
      id: "ORD002",
      product: "Wheat Flour Premium",
      supplier: "Grain Mills Co.",
      status: "In Transit",
      date: "2024-01-22",
      amount: 900,
      originalAmount: 900,
      savings: 0,
      type: "individual"
    },
    {
      id: "ORD003",
      product: "Chicken Fresh Cut",
      supplier: "Protein Palace",
      status: "Processing",
      date: "2024-01-23",
      amount: 1200,
      originalAmount: 1500,
      savings: 300,
      type: "group"
    }
  ];

  const upcomingDeliveries = [
    {
      id: "DEL001",
      product: "Refined Cooking Oil (5L)",
      supplier: "Golden Oil Co.",
      expectedDate: "Tomorrow",
      trackingId: "TRK123456",
      deliveryType: "Third-party"
    },
    {
      id: "DEL002",
      product: "Spice Masala Collection",
      supplier: "Spice Masters",
      expectedDate: "Jan 26",
      trackingId: "TRK789012",
      deliveryType: "Supplier Delivery"
    }
  ];

  const recommendations = [
    {
      id: "REC001",
      product: "Premium Tea Leaves",
      supplier: "Tea Gardens Co.",
      normalPrice: 800,
      groupPrice: 650,
      discount: 19,
      reason: "Popular in your area"
    },
    {
      id: "REC002",
      product: "Fresh Paneer",
      supplier: "Dairy Fresh Ltd",
      normalPrice: 300,
      groupPrice: 250,
      discount: 17,
      reason: "Frequently ordered with vegetables"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success text-success-foreground";
      case "In Transit":
        return "bg-warning text-warning-foreground";
      case "Processing":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getGroupStatus = (status: string) => {
    switch (status) {
      case "complete":
        return { color: "bg-success", icon: CheckCircle };
      case "almost_complete":
        return { color: "bg-warning", icon: AlertCircle };
      default:
        return { color: "bg-primary", icon: Users };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="business">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.activeGroups}</div>
            <div className="text-xs text-muted-foreground">Active Groups</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">₹{stats.monthlySavings.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Monthly Savings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{stats.pendingDeliveries}</div>
            <div className="text-xs text-muted-foreground">Pending Delivery</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.groupsSaved}</div>
            <div className="text-xs text-muted-foreground">Groups Joined</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{stats.averageDiscount}%</div>
            <div className="text-xs text-muted-foreground">Avg. Discount</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Group Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Active Group Orders
              </CardTitle>
              <CardDescription>
                Track your group orders and savings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeGroupOrders.map((order) => {
                const progress = (order.currentMembers / order.requiredMembers) * 100;
                const statusInfo = getGroupStatus(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{order.product}</h3>
                        <p className="text-sm text-muted-foreground">by {order.supplier}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Pincode: {order.pincode}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Qty: {order.quantity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {order.status === "complete" ? "Ready!" : 
                           order.status === "almost_complete" ? "Almost!" : "Joining"}
                        </Badge>
                        <div className="text-sm">
                          <span className="text-muted-foreground line-through">₹{order.normalPrice}</span>
                          <span className="font-bold text-success ml-2">₹{order.groupPrice}</span>
                        </div>
                        <div className="text-xs text-success font-medium">
                          Save ₹{order.yourSavings}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Group Progress</span>
                        <span className="font-medium">
                          {order.currentMembers}/{order.requiredMembers} vendors
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{order.timeLeft} remaining</span>
                        </div>
                        {order.status === "complete" ? (
                          <Button variant="success" size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirm Order
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            Invite Vendors
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="border-l-4 border-primary pl-3 space-y-1">
                  <p className="font-medium text-sm">{delivery.product}</p>
                  <p className="text-xs text-muted-foreground">{delivery.supplier}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{delivery.expectedDate}</span>
                    <Badge variant="outline" className="text-xs">
                      {delivery.deliveryType}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-3 border border-border rounded-lg space-y-2">
                  <h4 className="font-medium text-sm">{rec.product}</h4>
                  <p className="text-xs text-muted-foreground">{rec.supplier}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-muted-foreground line-through">₹{rec.normalPrice}</span>
                      <span className="text-sm font-bold text-success ml-1">₹{rec.groupPrice}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {rec.discount}% off
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

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
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{order.product}</p>
                    <Badge variant={order.type === "group" ? "default" : "outline"} className="text-xs">
                      {order.type === "group" ? "Group" : "Individual"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.supplier} • Order #{order.id} • {order.date}</p>
                  {order.savings > 0 && (
                    <p className="text-xs text-success">Saved ₹{order.savings}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.amount}</p>
                  {order.savings > 0 && (
                    <p className="text-xs text-muted-foreground line-through">₹{order.originalAmount}</p>
                  )}
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
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

export default EnhancedVendorDashboard;