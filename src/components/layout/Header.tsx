import { Button } from "@/components/ui/button";
import { ShoppingCart, Users, Store, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Products
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Group Orders
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              My Orders
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="gradient" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <a href="#" className="py-2 text-muted-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#" className="py-2 text-muted-foreground hover:text-primary transition-colors">
                Group Orders
              </a>
              <a href="#" className="py-2 text-muted-foreground hover:text-primary transition-colors">
                My Orders
              </a>
              <a href="#" className="py-2 text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
              <div className="pt-4 border-t border-border">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                  <Button variant="gradient" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;