import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/src/components/ui/Typography";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Textarea } from "@/src/components/ui/Textarea";
import { Label } from "@/src/components/ui/Label";
import { Skeleton } from "@/src/components/ui/Skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/Tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/Carousel";
import { ProductCard } from "@/src/components/store/ProductCard";
import { useCart } from "@/src/hooks/useCart";
import {
  api,
  type Product,
  type Vendor,
  type ProductReview,
  ApiError,
} from "@/src/lib/api";
import {
  FiShoppingCart,
  FiStar,
  FiShare2,
  FiHeart,
  FiArrowLeft,
} from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { isAuthenticated, getUser } from "@/src/lib/auth";
import { LoginPromptModal } from "@/src/components/ui/LoginPromptModal";
import { useToast } from "@/src/hooks/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [vendorDetails, setVendorDetails] = useState<Vendor | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [isLoadingMoreReviews, setIsLoadingMoreReviews] = useState(false);
  const [reviewRate, setReviewRate] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | undefined>();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const { toast } = useToast();
  const currentUser = getUser();
  const hasUserReviewed = !!currentUser?.id
    ? reviews.some((review) => review.user?.id === currentUser.id)
    : false;

  const loadProductReviews = async (
    productId: number,
    page = 1,
    append = false,
  ) => {
    const response = await api.getProductReviews(productId, {
      page,
      per_page: 8,
    });
    setReviews((prev) =>
      append ? [...prev, ...response.data] : response.data,
    );
    setReviewsPage(response.meta.current_page || page);
    setReviewsTotalPages(response.meta.last_page || 1);
  };

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
      setVendorDetails(null);
      setReviews([]);
      setReviewsPage(1);
      setReviewsTotalPages(1);

      if (data.vendor?.id) {
        try {
          const vendor = await api.getVendor(data.vendor.id);
          setVendorDetails(vendor);
        } catch (vendorError) {
          // Non-critical: keep page functional even if vendor details endpoint fails
          console.warn("Failed to load vendor details:", vendorError);
        }
      }

      try {
        setIsLoadingReviews(true);
        await loadProductReviews(data.id, 1, false);
      } catch (reviewsError) {
        console.warn("Failed to load product reviews:", reviewsError);
      } finally {
        setIsLoadingReviews(false);
      }

      // Load related products
      try {
        const related = await api.getProducts({
          category: data.category.slug,
          is_marketplace: true,
          page: 1,
        });
        setRelatedProducts(
          related.data.filter((p) => p.id !== data.id).slice(0, 4),
        );
      } catch (err) {
        // Non-critical error - related products failed to load
        console.warn("Failed to load related products:", err);
      }
    } catch (error) {
      console.error("Failed to load product:", error);
      const errorMessage =
        error instanceof ApiError
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
        const errorMessage =
          error instanceof ApiError
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
    if (!product) return;

    if (!isAuthenticated()) {
      const normalizedPhone = (
        import.meta.env.VITE_CONTACT_PHONE ?? ""
      ).replace(/\D/g, "");

      if (!normalizedPhone) {
        toast({
          title: "Contact unavailable",
          description:
            "Order contact number is not configured. Please login and use cart checkout.",
          variant: "destructive",
        });
        return;
      }

      const selectedVariantDetails = product.variants?.find(
        (variant) => variant.id === selectedVariant,
      );
      const variantText = selectedVariantDetails
        ? `${selectedVariantDetails.name} (NLe ${selectedVariantDetails.price.toFixed(2)})`
        : "Default";
      const unitPrice = selectedVariantDetails
        ? selectedVariantDetails.price
        : product.effective_price;
      const totalPrice = unitPrice * quantity;
      const productLink = window.location.href;

      const orderMessage = encodeURIComponent(
        [
          "Hello, I want to place an order:",
          `Product: ${product.title}`,
          `Quantity: ${quantity}`,
          `Variant: ${variantText}`,
          `Unit Price: NLe ${unitPrice.toFixed(2)}`,
          `Estimated Total: NLe ${totalPrice.toFixed(2)}`,
          `Product Link: ${productLink}`,
        ].join("\n"),
      );

      window.open(
        `https://wa.me/${normalizedPhone}?text=${orderMessage}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    await handleAddToCart();
    navigate("/cart");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please write a short review before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (hasUserReviewed) {
      toast({
        title: "Already reviewed",
        description: "You can only submit one review per product.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmittingReview(true);
      const createdReview = await api.submitProductReview(product.id, {
        rate: reviewRate,
        review: reviewText.trim(),
      });
      setReviews((prev) => [createdReview, ...prev]);
      setReviewsPage(1);
      setReviewText("");
      setReviewRate(5);
      toast({
        title: "Review submitted",
        description: "Thanks for sharing your feedback.",
      });
    } catch (submissionError) {
      if (
        submissionError instanceof ApiError &&
        submissionError.status === 401
      ) {
        setShowLoginModal(true);
      } else {
        const message =
          submissionError instanceof ApiError
            ? submissionError.message
            : "Could not submit review. Please try again.";
        toast({
          title: "Review not submitted",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleLoadMoreReviews = async () => {
    if (!product) return;
    if (isLoadingMoreReviews || reviewsPage >= reviewsTotalPages) return;

    try {
      setIsLoadingMoreReviews(true);
      await loadProductReviews(product.id, reviewsPage + 1, true);
    } catch (error) {
      console.warn("Failed to load more reviews:", error);
      toast({
        title: "Could not load more reviews",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMoreReviews(false);
    }
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
        <Section className="!pt-2">
          <Container>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </Button>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              ref={contentRef}
            >
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
                  {[product.photo, ...(product.images || [])].filter(Boolean)
                    .length > 1 && (
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
                      <TypographyH1 className="mb-4">
                        {product.title}
                      </TypographyH1>
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
                        {product.reviews_count &&
                          ` (${product.reviews_count} reviews)`}
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
                      {product.formatted_effective_price ||
                        `${product.currency_symbol || ""} ${price.toFixed(2)}`}
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
                    {isInStock
                      ? `In Stock${product.stock ? ` (${product.stock} available)` : ""}`
                      : "Out of Stock"}
                  </Badge>
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div>
                    <TypographyP className="font-medium mb-2">
                      Select Variant:
                    </TypographyP>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <Button
                          key={variant.id}
                          variant={
                            selectedVariant === variant.id
                              ? "default"
                              : "outline"
                          }
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
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={
                        !isInStock ||
                        (!!product.stock && quantity >= product.stock)
                      }
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
                {/* <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger> */}
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
                        <div
                          key={key}
                          className="flex justify-between border-b pb-2"
                        >
                          <dt className="font-medium capitalize">
                            {key.replace(/_/g, " ")}:
                          </dt>
                          <dd className="text-muted-foreground">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <TypographyH3 className="text-xl mb-2">
                        Customer Reviews
                      </TypographyH3>
                      <TypographyP className="text-sm text-muted-foreground">
                        See what other buyers are saying, then add your own
                        review.
                      </TypographyP>
                    </div>

                    <div className="space-y-4">
                      {isLoadingReviews ? (
                        <TypographyP className="text-sm text-muted-foreground">
                          Loading reviews...
                        </TypographyP>
                      ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div
                            key={review.id}
                            className="rounded-lg border p-4 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <TypographyP className="font-semibold">
                                {review.user?.name || "Anonymous User"}
                              </TypographyP>
                              <TypographyP className="text-xs text-muted-foreground">
                                {new Date(
                                  review.created_at,
                                ).toLocaleDateString()}
                              </TypographyP>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, index) => (
                                <FiStar
                                  key={index}
                                  className={`h-2 w-2 ${
                                    index < review.rate
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <TypographyP className="text-sm text-muted-foreground">
                              {review.review}
                            </TypographyP>
                          </div>
                        ))
                      ) : (
                        <TypographyP className="text-sm text-muted-foreground">
                          No reviews yet. Be the first to review this product.
                        </TypographyP>
                      )}

                      {!isLoadingReviews && reviewsPage < reviewsTotalPages && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLoadMoreReviews}
                          disabled={isLoadingMoreReviews}
                        >
                          {isLoadingMoreReviews
                            ? "Loading more..."
                            : "Load More Reviews"}
                        </Button>
                      )}
                    </div>

                    <div className="border-t pt-6">
                      <TypographyH3 className="text-lg mb-3">
                        Add Your Review
                      </TypographyH3>

                      {hasUserReviewed ? (
                        <TypographyP className="text-sm text-muted-foreground">
                          You have already submitted a review for this product.
                        </TypographyP>
                      ) : (
                        <form
                          onSubmit={handleSubmitReview}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="review-rate">Your Rating</Label>
                            <div
                              id="review-rate"
                              className="flex items-center gap-1"
                            >
                              {[1, 2, 3, 4, 5].map((starValue) => (
                                <button
                                  key={starValue}
                                  type="button"
                                  onClick={() => setReviewRate(starValue)}
                                  className="p-1"
                                  aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                                >
                                  <FiStar
                                    className={`h-5 w-5 ${
                                      starValue <= reviewRate
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">
                                {reviewRate} / 5
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="review-text">Your Review</Label>
                            <Textarea
                              id="review-text"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={4}
                              placeholder="Tell others what you liked or disliked..."
                              required
                            />
                          </div>

                          <Button type="submit" disabled={isSubmittingReview}>
                            {isSubmittingReview
                              ? "Submitting..."
                              : "Submit Review"}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="shipping" className="mt-6">
                <Card className="p-6">
                  <TypographyH2 className="mb-4">
                    Shipping Information
                  </TypographyH2>
                  <TypographyP className="mb-4">
                    Standard shipping: 3-5 business days. Free shipping on
                    orders over $100.
                  </TypographyP>
                  <TypographyH2 className="mb-4">Returns</TypographyH2>
                  <TypographyP>
                    Returns accepted within 30 days of purchase. Items must be
                    in original condition.
                  </TypographyP>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Vendor Info */}
            {product.vendor && (
              <Card className="p-6 gap-2 mb-12">
                <TypographyH2 className="mb-4">Vendor Information</TypographyH2>
                <div className="flex items-center gap-4">
                  {vendorDetails?.logo ? (
                    <img
                      src={vendorDetails.logo}
                      alt={`${vendorDetails.name || product.vendor.name} logo`}
                      className="w-12 h-12 rounded-full object-cover border bg-muted"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="font-semibold">
                        {(vendorDetails?.name || product.vendor.name)[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <TypographyP className="font-semibold">
                      {vendorDetails?.name || product.vendor.name}
                    </TypographyP>
                    <TypographyP className="text-sm text-muted-foreground">
                      {vendorDetails?.contact_email ||
                        "Contact details unavailable"}
                    </TypographyP>
                    {vendorDetails?.phone && (
                      <TypographyP className="text-sm text-muted-foreground">
                        {vendorDetails.phone}
                      </TypographyP>
                    )}
                    {vendorDetails?.slug ? (
                      <Link to={`/store?vendor=${vendorDetails.slug}`}>
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 text-accent"
                        >
                          View More From This Vendor
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0"
                        disabled
                      >
                        Vendor listing unavailable
                      </Button>
                    )}
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
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                    />
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
