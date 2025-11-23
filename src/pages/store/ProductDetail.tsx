import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2, TypographyP } from "@/src/components/ui/Typography";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/Tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/Carousel";
import { ProductCard } from "@/src/components/store/ProductCard";
import { useCart } from "@/src/hooks/useCart";
import { api, type Product, ApiError } from "@/src/lib/api";
import { FiShoppingCart, FiStar, FiShare2, FiHeart, FiArrowLeft } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { isAuthenticated } from "@/src/lib/auth";
import { LoginPromptModal } from "@/src/components/ui/LoginPromptModal";
import { useToast } from "@/src/hooks/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | undefined>();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Parse ID as number for API call
      const productId = parseInt(id!, 10);
      if (isNaN(productId)) {
        throw new Error("Invalid product ID");
      }
      const data = await api.getProduct(productId);
      setProduct(data);
      // Load related products
      try {
        const related = await api.getProducts({ category: data.category.slug, is_marketplace: true, page: 1 });
        setRelatedProducts(related.data.filter(p => p.id !== data.id).slice(0, 4));
      } catch (err) {
        // Non-critical error - related products failed to load
        console.warn("Failed to load related products:", err);
      }
    } catch (error) {
      console.error("Failed to load product:", error);
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "Failed to load product. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Check authentication first
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsAdding(true);
      await addToCart(product.id, quantity, selectedVariant);
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // If it's an auth error, show login modal
      if (error instanceof ApiError && error.status === 401) {
        setShowLoginModal(true);
      } else {
        const errorMessage = error instanceof ApiError
          ? error.message
          : "Failed to add item to cart. Please try again.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <TypographyH2>Product not found</TypographyH2>
            <Button onClick={() => navigate("/store")} className="mt-4">
              Back to Store
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  const price = product.effective_price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const isInStock = product.in_stock;

  return (
    <>
      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
      <div className="min-h-screen bg-background">
        <Section>
        <Container>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" ref={contentRef}>
            {/* Product Images */}
            <div>
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Include photo as first image, then other images */}
                  {[product.photo, ...(product.images || [])]
                    .filter(Boolean)
                    .map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${product.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                {[product.photo, ...(product.images || [])].filter(Boolean).length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    {product.vendor && (
                      <TypographyP className="text-sm text-muted-foreground mb-2">
                        {product.vendor.name}
                      </TypographyP>
                    )}
                    <TypographyH1 className="mb-4">{product.title}</TypographyH1>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label="Add to wishlist"
                    >
                      <FiHeart
                        className={`w-5 h-5 ${isWishlisted ? "fill-accent text-accent" : ""}`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Share">
                      <FiShare2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <TypographyP className="text-sm text-muted-foreground">
                      {product.rating.toFixed(1)}
                      {product.reviews_count && ` (${product.reviews_count} reviews)`}
                    </TypographyP>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  {hasDiscount && product.formatted_price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {product.formatted_price}
                    </span>
                  )}
                  <span className="text-3xl font-bold">
                    {product.formatted_effective_price || `${product.currency_symbol || ''} ${price.toFixed(2)}`}
                  </span>
                  {hasDiscount && product.discount_percent && (
                    <Badge variant="destructive">
                      {parseFloat(product.discount_percent).toFixed(0)}% OFF
                    </Badge>
                  )}
                </div>

                {product.sku && (
                  <TypographyP className="text-sm text-muted-foreground mb-4">
                    SKU: {product.sku}
                  </TypographyP>
                )}

                <Badge
                  variant={isInStock ? "default" : "secondary"}
                  className="mb-6"
                >
                  {isInStock ? `In Stock${product.stock ? ` (${product.stock} available)` : ''}` : "Out of Stock"}
                </Badge>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div>
                  <TypographyP className="font-medium mb-2">Select Variant:</TypographyP>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant === variant.id ? "default" : "outline"}
                        onClick={() => setSelectedVariant(variant.id)}
                      >
                        {variant.name} - ${variant.price.toFixed(2)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!isInStock || (product.stock && quantity >= product.stock)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!isInStock || isAdding}
                  className="flex-1"
                >
                  {isAdding ? (
                    "Adding..."
                  ) : (
                    <>
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!isInStock || isAdding}
                  variant="default"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <TypographyP className="whitespace-pre-line">
                  {product.description || "No description available."}
                </TypographyP>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card className="p-6">
                <dl className="space-y-4">
                  {product.attributes &&
                    Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <dt className="font-medium capitalize">{key.replace(/_/g, " ")}:</dt>
                        <dd className="text-muted-foreground">{String(value)}</dd>
                      </div>
                    ))}
                </dl>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card className="p-6">
                <TypographyP className="text-muted-foreground">
                  Reviews coming soon. Be the first to review this product!
                </TypographyP>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card className="p-6">
                <TypographyH2 className="mb-4">Shipping Information</TypographyH2>
                <TypographyP className="mb-4">
                  Standard shipping: 3-5 business days. Free shipping on orders over $100.
                </TypographyP>
                <TypographyH2 className="mb-4">Returns</TypographyH2>
                <TypographyP>
                  Returns accepted within 30 days of purchase. Items must be in original condition.
                </TypographyP>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Vendor Info */}
          {product.vendor && (
            <Card className="p-6 mb-12">
              <TypographyH2 className="mb-4">Vendor Information</TypographyH2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span className="font-semibold">{product.vendor.name[0]}</span>
                </div>
                <div>
                  <TypographyP className="font-semibold">{product.vendor.name}</TypographyP>
                  <Link to={`/profiles/${product.vendor.id}`}>
                    <Button variant="link" size="sm">
                      View Vendor Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <TypographyH2 className="mb-6">Related Products</TypographyH2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
      </div>
    </>
  );
}

