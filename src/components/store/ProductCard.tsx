import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { type Product } from "@/src/lib/api";
import { FiShoppingCart, FiStar, FiHeart } from "react-icons/fi";
import { useCart } from "@/src/hooks/useCart";
import { useState } from "react";
import { isAuthenticated } from "@/src/lib/auth";
import { LoginPromptModal } from "../ui/LoginPromptModal";

interface ProductCardProps {
  product: Product;
  onAddToWishlist?: (productId: number) => void;
}

export function ProductCard({ product, onAddToWishlist }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check authentication first
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // If it's an auth error, show login modal
      if (error instanceof Error && error.message.includes("login")) {
        setShowLoginModal(true);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product.id);
  };

  const price = product.effective_price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const isInStock = product.in_stock;

  return (
    <>
      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
      <Link to={`/store/product/${product.id}`}>
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="relative">
            <div className="aspect-square bg-muted/30 overflow-hidden">
              <img
                src={product.photo || product.images?.[0] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                Sale
              </Badge>
            )}
            {!isInStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Out of Stock
              </Badge>
            )}
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Add to wishlist"
            >
              <FiHeart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-accent text-accent" : "text-foreground"
                }`}
              />
            </button>
          </div>
          <CardContent className="p-4">
            <div className="mb-2">
              {product.vendor && (
                <p className="text-xs text-muted-foreground mb-1">
                  {product.vendor.name}
                </p>
              )}
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                {product.title}
              </h3>
            </div>

            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.rating.toFixed(1)}
                  {product.reviews_count && ` (${product.reviews_count})`}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {hasDiscount && product.formatted_price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.formatted_price}
                  </span>
                )}
                <span className="font-semibold text-lg">
                  {product.formatted_effective_price ||
                    `${product.currency_symbol || ""} ${price.toFixed(2)}`}
                </span>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!isInStock || isAdding}
              className="w-full"
              size="sm"
            >
              {isAdding ? (
                "Adding..."
              ) : !isInStock ? (
                "Out of Stock"
              ) : (
                <>
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
