import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useCart } from "@/src/hooks/useCart";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useToast } from "@/src/hooks/use-toast";
import { ApiError } from "@/src/lib/api";

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [quantityInputs, setQuantityInputs] = useState<Record<number, string>>(
    {}
  );
  const cartRef = useGSAPFadeIn({ y: 20, duration: 0.6 });

  // Initialize quantity inputs when cart loads or when items are added/removed
  useEffect(() => {
    if (cart?.items) {
      setQuantityInputs((prev) => {
        const updated: Record<number, string> = {};
        cart.items.forEach((item) => {
          // If input exists and matches current quantity, keep it; otherwise sync with cart
          const currentInput = prev[item.id];
          if (currentInput && parseInt(currentInput, 10) === item.quantity) {
            updated[item.id] = currentInput;
          } else {
            updated[item.id] = item.quantity.toString();
          }
        });
        return updated;
      });
    }
  }, [cart?.items]); // Update when cart items change

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      await updateItem(itemId, newQuantity);
      // Update the input field to reflect the new quantity
      setQuantityInputs((prev) => ({
        ...prev,
        [itemId]: newQuantity.toString(),
      }));
    } catch (error) {
      // Handle insufficient stock error
      if (error instanceof ApiError && error.status === 400) {
        const errorMessage = error.message || "Unknown error";

        // Find the item to get stock information
        const item = cart?.items.find((i) => i.id === itemId);
        const maxStock = item?.product.stock;
        const currentQuantity = item?.quantity || 0;

        // Show error toast with stock information
        let toastDescription = errorMessage;
        if (
          errorMessage.toLowerCase().includes("stock") ||
          errorMessage.toLowerCase().includes("insufficient")
        ) {
          if (maxStock !== undefined && maxStock !== null) {
            toastDescription = `Only ${maxStock} ${
              maxStock === 1 ? "item" : "items"
            } available in stock.`;
          } else {
            toastDescription = "Insufficient stock available for this product.";
          }
        }

        toast({
          variant: "destructive",
          title: "Insufficient Stock",
          description: toastDescription,
        });

        // Reset input to maximum available stock or current quantity
        const resetQuantity =
          maxStock !== undefined && maxStock !== null
            ? Math.min(maxStock, currentQuantity)
            : currentQuantity;
        setQuantityInputs((prev) => ({
          ...prev,
          [itemId]: resetQuantity.toString(),
        }));
      } else {
        // Handle other errors
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to update quantity",
        });

        // Reset to current quantity on error
        const item = cart?.items.find((i) => i.id === itemId);
        if (item) {
          setQuantityInputs((prev) => ({
            ...prev,
            [itemId]: item.quantity.toString(),
          }));
        }
      }
    }
  };

  const handleQuantityInputChange = (itemId: number, value: string) => {
    // Only allow digits
    const numericValue = value.replace(/[^0-9]/g, "");
    setQuantityInputs((prev) => ({
      ...prev,
      [itemId]: numericValue,
    }));
  };

  const handleQuantityInputBlur = async (
    itemId: number,
    currentQuantity: number
  ) => {
    const inputValue = quantityInputs[itemId] || currentQuantity.toString();
    const numericValue = parseInt(inputValue, 10);

    // Validate: must be integer > 0
    if (isNaN(numericValue) || numericValue < 1) {
      // Reset to current quantity if invalid
      setQuantityInputs((prev) => ({
        ...prev,
        [itemId]: currentQuantity.toString(),
      }));
      return;
    }

    // Update if different from current
    if (numericValue !== currentQuantity) {
      await handleQuantityChange(itemId, numericValue);
    }
  };

  const handleQuantityInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    itemId: number,
    currentQuantity: number
  ) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      const inputValue = quantityInputs[itemId] || currentQuantity.toString();
      const numericValue = parseInt(inputValue, 10);

      if (!isNaN(numericValue) && numericValue > 0) {
        await handleQuantityChange(itemId, numericValue);
      }
    }
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64" />
          </div>
        </Container>
      </Section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12" ref={cartRef}>
            <FiShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <TypographyH2 className="mb-2">Your cart is empty</TypographyH2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart.
            </p>
            <Link to="/store">
              <Button>
                Continue Shopping
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Section>
        <Container>
          <TypographyH1 className="mb-8">Shopping Cart</TypographyH1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={cartRef}>
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    {item.product.photo && (
                      <img
                        src={item.product.photo}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.product.formatted_effective_price ||
                          `${
                            item.product.currency_symbol || "Le"
                          } ${item.price.toFixed(2)}`}{" "}
                        each
                      </p>
                      {item.product.stock !== undefined && (
                        <p className="text-xs text-muted-foreground mb-3">
                          {item.product.stock > 0 ? (
                            <span className="text-accent">
                              {item.product.stock} in stock
                            </span>
                          ) : (
                            <span className="text-destructive">
                              Out of stock
                            </span>
                          )}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const currentInput = quantityInputs[item.id];
                              const currentQty = currentInput
                                ? parseInt(currentInput, 10)
                                : item.quantity;
                              const newQty = isNaN(currentQty)
                                ? item.quantity - 1
                                : currentQty - 1;
                              handleQuantityChange(item.id, newQty);
                            }}
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={
                              quantityInputs[item.id] ??
                              item.quantity.toString()
                            }
                            onChange={(e) =>
                              handleQuantityInputChange(item.id, e.target.value)
                            }
                            onBlur={() =>
                              handleQuantityInputBlur(item.id, item.quantity)
                            }
                            onKeyDown={(e) =>
                              handleQuantityInputKeyDown(
                                e,
                                item.id,
                                item.quantity
                              )
                            }
                            className="w-16 text-center font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const currentInput = quantityInputs[item.id];
                              const currentQty = currentInput
                                ? parseInt(currentInput, 10)
                                : item.quantity;
                              const newQty = isNaN(currentQty)
                                ? item.quantity + 1
                                : currentQty + 1;
                              handleQuantityChange(item.id, newQty);
                            }}
                          >
                            <FiPlus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            {item.product.currency_symbol || "Le"}{" "}
                            {item.amount.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <TypographyH2 className="mb-4">Order Summary</TypographyH2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Le {cart.summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {cart.summary.delivery_charge === 0 ? (
                        <span className="text-accent">Free</span>
                      ) : (
                        `Le ${cart.summary.delivery_charge.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Le {cart.summary.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="mb-2"
                  />
                  <Button variant="outline" className="w-full" size="sm">
                    Apply Coupon
                  </Button>
                </div>

                <Button
                  className="w-full mb-4"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                  <FiArrowRight className="ml-2" />
                </Button>

                <Link to="/store">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
