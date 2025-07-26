import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  MapPin,
  Clock,
  Users,
  ShoppingCart,
  Heart,
  Truck,
  Package
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  supplier: string;
  supplierRating: number;
  category: string;
  image: string;
  normalPrice: number;
  groupPrice: number;
  minGroupSize: number;
  currentGroupMembers: number;
  groupTimeLeft: string;
  pincode: string;
  inStock: boolean;
  unit: string;
  description: string;
  deliveryOptions: string[];
  groupDiscount: number;
}

const ProductBrowsing = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [showGroupOrdersOnly, setShowGroupOrdersOnly] = useState(false);

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Premium Basmati Rice",
      supplier: "FreshFarm Supplies",
      supplierRating: 4.8,
      category: "Grains & Cereals",
      image: "/api/placeholder/300/200",
      normalPrice: 1200,
      groupPrice: 1000,
      minGroupSize: 3,
      currentGroupMembers: 2,
      groupTimeLeft: "8 hours",
      pincode: "110001",
      inStock: true,
      unit: "25kg bag",
      description: "Premium quality basmati rice, perfect for restaurants and food vendors",
      deliveryOptions: ["Supplier Delivery", "Third-party", "Pickup"],
      groupDiscount: 17
    },
    {
      id: "2",
      name: "Refined Cooking Oil",
      supplier: "Golden Oil Co.",
      supplierRating: 4.6,
      category: "Cooking Oils",
      image: "/api/placeholder/300/200",
      normalPrice: 450,
      groupPrice: 380,
      minGroupSize: 5,
      currentGroupMembers: 4,
      groupTimeLeft: "4 hours",
      pincode: "110001",
      inStock: true,
      unit: "5L container",
      description: "Pure refined sunflower oil for all cooking needs",
      deliveryOptions: ["Supplier Delivery", "Pickup"],
      groupDiscount: 16
    },
    {
      id: "3",
      name: "Mixed Vegetables Bundle",
      supplier: "Fresh Veggies Ltd",
      supplierRating: 4.5,
      category: "Vegetables",
      image: "/api/placeholder/300/200",
      normalPrice: 800,
      groupPrice: 650,
      minGroupSize: 4,
      currentGroupMembers: 1,
      groupTimeLeft: "10 hours",
      pincode: "110001",
      inStock: true,
      unit: "10kg mix",
      description: "Fresh daily vegetables including onions, tomatoes, potatoes",
      deliveryOptions: ["Supplier Delivery"],
      groupDiscount: 19
    },
    {
      id: "4",
      name: "Spice Masala Collection",
      supplier: "Spice Masters",
      supplierRating: 4.9,
      category: "Spices",
      image: "/api/placeholder/300/200",
      normalPrice: 600,
      groupPrice: 500,
      minGroupSize: 3,
      currentGroupMembers: 3,
      groupTimeLeft: "2 hours",
      pincode: "110001",
      inStock: true,
      unit: "2kg bundle",
      description: "Premium spice collection with 15 essential Indian spices",
      deliveryOptions: ["Third-party", "Pickup"],
      groupDiscount: 17
    },
    {
      id: "5",
      name: "Wheat Flour Premium",
      supplier: "Grain Mills Co.",
      supplierRating: 4.7,
      category: "Grains & Cereals",
      image: "/api/placeholder/300/200",
      normalPrice: 900,
      groupPrice: 750,
      minGroupSize: 4,
      currentGroupMembers: 0,
      groupTimeLeft: "12 hours",
      pincode: "110002",
      inStock: true,
      unit: "20kg bag",
      description: "Fine quality wheat flour, stone ground for better nutrition",
      deliveryOptions: ["Supplier Delivery", "Third-party"],
      groupDiscount: 17
    },
    {
      id: "6",
      name: "Chicken Fresh Cut",
      supplier: "Protein Palace",
      supplierRating: 4.4,
      category: "Meat & Poultry",
      image: "/api/placeholder/300/200",
      normalPrice: 1500,
      groupPrice: 1200,
      minGroupSize: 3,
      currentGroupMembers: 2,
      groupTimeLeft: "6 hours",
      pincode: "110001",
      inStock: true,
      unit: "5kg pack",
      description: "Fresh chicken cuts, cleaned and ready to cook",
      deliveryOptions: ["Supplier Delivery"],
      groupDiscount: 20
    }
  ];

  const categories = [
    "All Categories",
    "Grains & Cereals", 
    "Cooking Oils",
    "Vegetables",
    "Spices",
    "Meat & Poultry",
    "Dairy Products",
    "Beverages"
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           product.category === selectedCategory ||
                           selectedCategory === "All Categories";
    const matchesGroupFilter = !showGroupOrdersOnly || product.currentGroupMembers > 0;
    
    return matchesSearch && matchesCategory && matchesGroupFilter;
  });

  const ProductCard = ({ product, isListView = false }: { product: Product; isListView?: boolean }) => {
    const groupProgress = (product.currentGroupMembers / product.minGroupSize) * 100;
    const isGroupActive = product.currentGroupMembers > 0;
    const isGroupComplete = product.currentGroupMembers >= product.minGroupSize;

    if (isListView) {
      return (
        <Card className="shadow-custom-sm hover:shadow-custom-md transition-all">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {product.supplier} • {product.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.normalPrice}
                      </span>
                      <span className="font-bold text-success">₹{product.groupPrice}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Save {product.groupDiscount}%
                    </Badge>
                  </div>
                </div>

                {isGroupActive && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Group: {product.currentGroupMembers}/{product.minGroupSize}</span>
                      <span>{product.groupTimeLeft} left</span>
                    </div>
                    <Progress value={groupProgress} className="h-1" />
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {product.pincode}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-warning" />
                      {product.supplierRating}
                    </div>
                  </div>
                  <Button variant="business" size="sm">
                    {isGroupActive ? "Join Group" : "Order Now"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="shadow-custom-sm hover:shadow-custom-md transition-all group">
        <CardHeader className="p-4 pb-2">
          <div className="relative">
            <div className="w-full h-48 bg-muted rounded-lg mb-3"></div>
            {isGroupActive && (
              <Badge 
                className={`absolute top-2 right-2 ${
                  isGroupComplete ? 'bg-success' : 'bg-warning'
                } text-white`}
              >
                <Users className="w-3 h-3 mr-1" />
                {product.currentGroupMembers}/{product.minGroupSize}
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 left-2 bg-background/80 hover:bg-background"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription>
              by {product.supplier} • {product.unit}
            </CardDescription>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-warning" />
                <span className="text-sm font-medium">{product.supplierRating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {product.pincode}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.normalPrice}
                </span>
                <span className="text-xl font-bold text-success ml-2">
                  ₹{product.groupPrice}
                </span>
              </div>
              <Badge variant="secondary">
                Save {product.groupDiscount}%
              </Badge>
            </div>

            {isGroupActive && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Group Progress</span>
                  <span className="font-medium">
                    {product.currentGroupMembers}/{product.minGroupSize} vendors
                  </span>
                </div>
                <Progress value={groupProgress} className="h-2" />
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{product.groupTimeLeft} remaining</span>
                </div>
              </div>
            )}

            <div className="flex gap-2 text-xs">
              {product.deliveryOptions.map((option, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {option === "Supplier Delivery" && <Truck className="w-3 h-3 mr-1" />}
                  {option === "Third-party" && <Package className="w-3 h-3 mr-1" />}
                  {option}
                </Badge>
              ))}
            </div>

            <Button 
              variant="business" 
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4" />
              {isGroupActive ? "Join Group Order" : "Order Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse Products</h1>
          <p className="text-muted-foreground">Find the best deals and join group orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products, suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="discount">Best Discount</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={showGroupOrdersOnly ? "default" : "outline"}
          onClick={() => setShowGroupOrdersOnly(!showGroupOrdersOnly)}
          className="whitespace-nowrap"
        >
          <Users className="w-4 h-4 mr-2" />
          Groups Only
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {searchQuery && (
          <Badge variant="secondary">
            Search: {searchQuery}
            <button 
              onClick={() => setSearchQuery("")}
              className="ml-2 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        {selectedCategory !== "all" && selectedCategory !== "All Categories" && (
          <Badge variant="secondary">
            Category: {selectedCategory}
            <button 
              onClick={() => setSelectedCategory("all")}
              className="ml-2 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
        {showGroupOrdersOnly && (
          <Badge variant="secondary">
            Group Orders Only
            <button 
              onClick={() => setShowGroupOrdersOnly(false)}
              className="ml-2 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>

      {/* Product Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isListView={viewMode === "list"}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductBrowsing;