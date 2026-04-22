import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Label } from "@/src/components/ui/Label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/RadioGroup";
import { useCart } from "@/src/hooks/useCart";
import {
  api,
  type CheckoutRequest,
  type CouponValidation,
} from "@/src/lib/api";
import { getUser, isAuthenticated } from "@/src/lib/auth";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useToast } from "@/src/hooks/use-toast";
import { FiCheckCircle, FiLoader, FiLock } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";

const checkoutSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  payment_method: z.enum(["cod"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, isLoading: cartLoading } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
  } | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(
    null,
  );
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const formRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE?.toString().trim() || "";

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      country: "Sierra Leone",
      payment_method: "cod",
    },
  });

  const applyCoupon = async (codeInput?: string, silent = false) => {
    if (!cart || cart.items.length === 0) return;
    const code = (codeInput ?? couponCode).trim();

    if (!code) {
      if (!silent) {
        toast({
          variant: "destructive",
          title: "Coupon required",
          description: "Please enter a coupon code.",
        });
      }
      return;
    }

    if (!isAuthenticated()) {
      if (!silent) {
        toast({
          variant: "destructive",
          title: "Login required",
          description: "Please login to apply a coupon.",
        });
      }
      return;
    }

    try {
      setIsApplyingCoupon(true);
      const result = await api.validateCoupon(code);
      setAppliedCoupon(result);
      setCouponCode(result.coupon_code);
      sessionStorage.setItem("checkout_coupon_code", result.coupon_code);
      if (!silent) {
        toast({
          title: "Coupon applied",
          description: `${result.coupon_code} applied successfully.`,
        });
      }
    } catch (error) {
      setAppliedCoupon(null);
      sessionStorage.removeItem("checkout_coupon_code");
      if (!silent) {
        toast({
          variant: "destructive",
          title: "Coupon invalid",
          description:
            error instanceof Error
              ? error.message
              : "Could not validate coupon.",
        });
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Load checkout details on mount to pre-fill form
  useEffect(() => {
    const loadCheckoutDetails = async () => {
      try {
        setIsLoadingDetails(true);

        // First, try to get user from API
        let userData = null;
        if (isAuthenticated()) {
          try {
            const response = await api.getCheckoutDetails();
            if (response.success && response.data?.user) {
              userData = response.data.user;
            }
          } catch (error) {
            // Silently fail - API error (e.g., 500) shouldn't prevent checkout
            // We'll fall back to stored user data
            console.warn(
              "Failed to load checkout details from API, using stored user data:",
              error,
            );
          }
        }

        // Fallback to stored user data if API doesn't return user or fails
        if (!userData) {
          const storedUser = getUser();
          if (storedUser) {
            userData = {
              id: storedUser.id,
              name: storedUser.name,
              email: storedUser.email,
              phone: undefined,
            };
          }
        }

        // Pre-fill form with user data if available
        if (userData) {
          const nameParts = userData.name.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          // Use setValue with shouldValidate and shouldDirty options
          form.setValue("first_name", firstName, {
            shouldValidate: true,
            shouldDirty: false,
          });
          form.setValue("last_name", lastName, {
            shouldValidate: true,
            shouldDirty: false,
          });
          form.setValue("email", userData.email, {
            shouldValidate: true,
            shouldDirty: false,
          });
          if (userData.phone) {
            form.setValue("phone", userData.phone, {
              shouldValidate: true,
              shouldDirty: false,
            });
          }
        }
      } catch (error) {
        // Final catch-all - ensure loading state is cleared
        console.error("Failed to load checkout details:", error);
      } finally {
        // Always clear loading state, even if there's an error
        setIsLoadingDetails(false);
      }
    };

    loadCheckoutDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const couponFromQuery = searchParams.get("coupon");
    const couponFromStorage = sessionStorage.getItem("checkout_coupon_code");
    const initialCoupon = couponFromQuery || couponFromStorage || "";
    if (initialCoupon) {
      setCouponCode(initialCoupon);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!cart || cart.items.length === 0) return;
    if (!couponCode) return;
    void applyCoupon(couponCode, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.summary.subtotal, cart?.summary.quantity]);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!cart) return;

    setIsSubmitting(true);
    try {
      const checkoutData: CheckoutRequest = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address1: data.address1,
        address2: data.address2,
        post_code: "1234",
        country: data.country,
        payment_method: data.payment_method,
        coupon_code: appliedCoupon?.coupon_code,
      };

      const response = await api.checkout(checkoutData);

      console.log("Checkout response:", response);

      if (response.success && response.data) {
        const orderId = response.data.id;
        const orderNumber = response.data.order_number;

        // Validate that we have the required data
        if (!orderId) {
          console.error("Order ID is missing from response:", response.data);
          toast({
            variant: "destructive",
            title: "Checkout Warning",
            description:
              "Order was created but order ID was not returned. Please check your orders page.",
          });
          // Redirect to orders list instead
          setTimeout(() => {
            navigate("/orders");
          }, 500);
          return;
        }

        if (!orderNumber) {
          console.error(
            "Order number is missing from response:",
            response.data,
          );
          toast({
            variant: "destructive",
            title: "Checkout Warning",
            description:
              "Order was created but order number was not returned. Please check your orders page.",
          });
          // Redirect to orders list instead
          setTimeout(() => {
            navigate("/orders");
          }, 500);
          return;
        }

        // Show success toast first
        console.log("Showing success toast for order:", orderNumber);
        toast({
          title: "Order Placed Successfully!",
          description: `Your order has been received. Order Number: ${orderNumber}`,
        });

        // Notify central contact on WhatsApp after order creation.
        if (contactPhone) {
          const normalizedPhone = contactPhone.replace(/[^\d]/g, "");
          const orderTotalExcludingDelivery = (
            cart.summary.subtotal - (appliedCoupon?.discount_amount || 0)
          ).toFixed(2);
          const whatsappMessage =
            `New order created from checkout.%0A` +
            `Order Number: ${orderNumber}%0A` +
            `Customer: ${data.first_name} ${data.last_name}%0A` +
            `Customer Phone: ${data.phone}%0A` +
            `Address: ${data.address1}${data.address2 ? `, ${data.address2}` : ""}, ${data.country}%0A` +
            `Items: ${cart.summary.quantity}%0A` +
            `Total (excl. delivery): Le ${orderTotalExcludingDelivery}%0A` +
            `Delivery: Negotiated after order placement`;

          window.open(
            `https://wa.me/${normalizedPhone}?text=${whatsappMessage}`,
            "_blank",
            "noopener,noreferrer",
          );
        } else {
          console.warn(
            "VITE_CONTACT_PHONE is not configured. Skipping WhatsApp notification.",
          );
        }

        // Redirect to order details page after a short delay
        setTimeout(() => {
          navigate(`/orders/${orderId}`);
        }, 500);
      } else {
        // Handle case where response is not successful or data is missing
        toast({
          variant: "destructive",
          title: "Checkout Failed",
          description:
            response.message ||
            "Order creation failed. Please try again or contact support.",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while processing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching cart or checkout details
  if (cartLoading || isLoadingDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Section>
          <Container>
            <Skeleton className="h-10 w-48 mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form Skeleton */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <Skeleton className="h-8 w-48 mb-6" />

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Skeleton className="h-8 w-40 mb-4" />
                      <div className="space-y-3">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>

                    <Skeleton className="h-12 w-full" />
                  </div>
                </Card>
              </div>

              {/* Order Summary Skeleton */}
              <div className="lg:sticky lg:top-24">
                <Card className="p-6">
                  <Skeleton className="h-8 w-40 mb-4" />

                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-full mt-2" />
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // Check if cart is empty after loading is complete
  if (!cart || cart.items.length === 0) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <TypographyH2>Your cart is empty</TypographyH2>
            <Button onClick={() => navigate("/store")} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Section className="!pt-2">
        <Container>
          <TypographyH1 className="mb-8">Checkout</TypographyH1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card className="p-6" ref={formRef}>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <TypographyH2 className="mb-4">
                      Delivery Information
                    </TypographyH2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoadingDetails} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoadingDetails} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              disabled={isLoadingDetails}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              disabled={isLoadingDetails}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1 *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoadingDetails} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoadingDetails} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoadingDetails} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="border-t pt-6">
                      <TypographyH2 className="mb-4">
                        Payment Options
                      </TypographyH2>
                      <FormField
                        control={form.control}
                        name="payment_method"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-3"
                                disabled={isLoadingDetails}
                              >
                                <div className="flex items-center space-x-2 border rounded-md p-4">
                                  <RadioGroupItem value="cod" id="cod" />
                                  <Label
                                    htmlFor="cod"
                                    className="flex-1 cursor-pointer"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>Cash on Delivery (COD)</span>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || isLoadingDetails}
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : isLoadingDetails ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <FiLock className="mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <TypographyH2 className="mb-4">Order Summary</TypographyH2>

                <div className="mb-4 space-y-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => applyCoupon()}
                    disabled={isApplyingCoupon}
                    type="button"
                  >
                    {isApplyingCoupon ? "Applying..." : "Apply Coupon"}
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.title} x{item.quantity}
                      </span>
                      <span>
                        {item.product.currency_symbol || "Le"}{" "}
                        {item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Le {cart.summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Delivery&nbsp;fee<span className="text-red-500">*</span>
                    </span>
                    <span className="text-muted-foreground">
                      &nbsp;based on location and quantity (negotiated after
                      order placement)
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Coupon ({appliedCoupon.coupon_code})
                      </span>
                      <span className="text-accent">
                        -Le {appliedCoupon.discount_amount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total (excl. delivery)</span>
                    <span>
                      Le{" "}
                      {(
                        cart.summary.subtotal -
                        (appliedCoupon?.discount_amount || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Note: Delivery fee is negotiated after order placement and
                    is not included in the total shown above.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
