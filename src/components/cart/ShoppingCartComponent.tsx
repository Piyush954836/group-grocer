import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Truck,
  MapPin,
  Clock,
  Users,
  Package,
  CreditCard,
  AlertCircle
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  supplier: string;
  normalPrice: number;
  groupPrice: number;
  quantity: number;
  unit: string;
  isGroupOrder: boolean;
  groupMembers?: number;
  requiredMembers?: number;
  timeLeft?: string;
  deliveryOptions: string[];
  selectedDelivery: string;
}

const ShoppingCartComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Basmati Rice",
      supplier: "FreshFarm Supplies",
      normalPrice: 1200,
      groupPrice: 1000,
      quantity: 2,
      unit: "25kg bag",
      isGroupOrder: true,
      groupMembers: 2,
      requiredMembers: 3,
      timeLeft: "8 hours",
      deliveryOptions: ["Supplier Delivery", "Third-party", "Pickup"],
      selectedDelivery: "Supplier Delivery"
    },
    {
      id: "2",
      name: "Refined Cooking Oil",
      supplier: "Golden Oil Co.",
      normalPrice: 450,
      groupPrice: 450,
      quantity: 3,
      unit: "5L container",
      isGroupOrder: false,
      deliveryOptions: ["Supplier Delivery", "Pickup"],
      selectedDelivery: "Supplier Delivery"
    }
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "123 Market Street",
    area: "Connaught Place",
    pincode: "110001",
    city: "New Delhi"
  });

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateDeliveryOption = (id: string, deliveryOption: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selectedDelivery: deliveryOption } : item
      )
    );
  };

  const totalNormalPrice = cartItems.reduce((sum, item) => sum + (item.normalPrice * item.quantity), 0);
  const totalGroupPrice = cartItems.reduce((sum, item) => {
    const price = item.isGroupOrder ? item.groupPrice : item.normalPrice;
    return sum + (price * item.quantity);
  }, 0);
  const totalSavings = totalNormalPrice - totalGroupPrice;
  const deliveryFee = 50; // Mock delivery fee

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
        <Badge variant="secondary">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="shadow-custom-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">by {item.supplier} • {item.unit}</p>
                      
                      {item.isGroupOrder && (
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Group Order</span>
                            <Badge variant="outline" className="text-xs">
                              {item.groupMembers}/{item.requiredMembers} joined
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{item.timeLeft} remaining</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <Separator />

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {item.isGroupOrder && (
                        <div className="text-sm text-muted-foreground line-through">
                          ₹{item.normalPrice * item.quantity}
                        </div>
                      )}
                      <div className="font-bold text-lg">
                        ₹{(item.isGroupOrder ? item.groupPrice : item.normalPrice) * item.quantity}
                      </div>
                      {item.isGroupOrder && (
                        <div className="text-sm text-success">
                          Save ₹{(item.normalPrice - item.groupPrice) * item.quantity}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Delivery Options */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Delivery Option:</span>
                    <div className="flex flex-wrap gap-2">
                      {item.deliveryOptions.map((option) => (
                        <Button
                          key={option}
                          variant={item.selectedDelivery === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateDeliveryOption(item.id, option)}
                          className="text-xs"
                        >
                          {option === "Supplier Delivery" && <Truck className="w-3 h-3 mr-1" />}
                          {option === "Third-party" && <Package className="w-3 h-3 mr-1" />}
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {cartItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to get started</p>
                <Button variant="business">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{deliveryAddress.street}</p>
                <p className="text-sm text-muted-foreground">
                  {deliveryAddress.area}, {deliveryAddress.city} - {deliveryAddress.pincode}
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Change Address
              </Button>
            </CardContent>
          </Card>

          {/* Group Order Status */}
          {cartItems.some(item => item.isGroupOrder) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Group Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cartItems.filter(item => item.isGroupOrder).map(item => (
                    <div key={item.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          {item.groupMembers}/{item.requiredMembers} vendors
                        </span>
                        <Badge 
                          variant={item.groupMembers >= item.requiredMembers ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.groupMembers >= item.requiredMembers ? "Complete" : "Joining"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-warning">Group order pending</p>
                      <p className="text-muted-foreground">
                        You'll only be charged if the group order completes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>₹{totalNormalPrice}</span>
              </div>
              
              {totalSavings > 0 && (
                <div className="flex justify-between text-success">
                  <span>Group Savings:</span>
                  <span>-₹{totalSavings}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee:</span>
                <span>₹{deliveryFee}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{totalGroupPrice + deliveryFee}</span>
              </div>

              {totalSavings > 0 && (
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-success font-semibold">
                    You're saving ₹{totalSavings} with group orders!
                  </p>
                </div>
              )}

              <Button variant="business" className="w-full mt-4" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Secure payment • 100% money back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;