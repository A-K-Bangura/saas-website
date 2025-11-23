import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { api, type Order } from "@/src/lib/api";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import {
  FiPackage,
  FiShoppingBag,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useGSAPFadeIn({ y: 20, duration: 0.6 });

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const orderId = parseInt(id, 10);
        if (isNaN(orderId)) {
          console.error("Invalid order ID");
          return;
        }

        const response = await api.getOrder(orderId);
        if (response.success && response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Section>
          <Container>
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Section>
          <Container>
            <Card className="p-12 text-center">
              <FiPackage className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <TypographyH2 className="mb-2">Order Not Found</TypographyH2>
              <p className="text-muted-foreground mb-6">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate("/orders")}>
                  <FiArrowLeft className="mr-2" />
                  Back to Orders
                </Button>
                <Button variant="outline" onClick={() => navigate("/store")}>
                  <FiShoppingBag className="mr-2" />
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Section>
        <Container>
          <div ref={pageRef}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/orders")}
                  className="mb-4"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to Orders
                </Button>
                <TypographyH1>Order Details</TypographyH1>
                <p className="text-muted-foreground mt-2">
                  Order #{order.order_number}
                </p>
              </div>
              <Button onClick={() => navigate("/store")}>
                <FiShoppingBag className="mr-2" />
                Continue Shopping
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status */}
                <Card className="p-6">
                  <TypographyH2 className="mb-4">Order Status</TypographyH2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusBadgeColor(
                          order.payment_status
                        )}`}
                      >
                        {order.payment_status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fulfillment Status</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {order.fulfillment_status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="font-medium capitalize">
                        {order.payment_method}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Order Date</span>
                      <span className="font-medium">{formatDate(order.created_at)}</span>
                    </div>
                  </div>
                </Card>

                {/* Order Items */}
                <Card className="p-6">
                  <TypographyH2 className="mb-4">Order Items</TypographyH2>
                  <div className="space-y-4">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                        >
                          {item.product?.photo && (
                            <img
                              src={item.product.photo}
                              alt={item.product.title}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1">
                            <Link
                              to={`/store/product/${item.product?.id || item.product_id}`}
                              className="font-semibold mb-1 hover:text-accent transition-colors"
                            >
                              {item.product?.title || "Product"}
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              Quantity: {item.quantity}
                            </p>
                            <p className="font-semibold">
                              {item.product?.currency_symbol || "Le"} {item.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No items found</p>
                    )}
                  </div>
                </Card>

                {/* Shipping Address */}
                <Card className="p-6">
                  <TypographyH2 className="mb-4 flex items-center gap-2">
                    <FiMapPin className="w-5 h-5" />
                    Shipping Address
                  </TypographyH2>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {order.shipping_address.first_name}{" "}
                      {order.shipping_address.last_name}
                    </p>
                    <p className="text-muted-foreground">
                      {order.shipping_address.address1}
                    </p>
                    {order.shipping_address.address2 && (
                      <p className="text-muted-foreground">
                        {order.shipping_address.address2}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      {order.shipping_address.country} {order.shipping_address.post_code}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <FiPhone className="w-4 h-4" />
                      {order.shipping_address.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FiMail className="w-4 h-4" />
                      {order.shipping_address.email}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card className="p-6">
                  <TypographyH2 className="mb-4">Order Summary</TypographyH2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>
                        {order.items?.[0]?.product?.currency_symbol || "Le"}{" "}
                        {order.sub_total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Charge</span>
                      <span>
                        {order.delivery_charge === 0 ? (
                          <span className="text-accent">Free</span>
                        ) : (
                          <>
                            {order.items?.[0]?.product?.currency_symbol || "Le"}{" "}
                            {order.delivery_charge.toFixed(2)}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        {order.items?.[0]?.product?.currency_symbol || "Le"}{" "}
                        {order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

