import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/src/components/ui/Typography";
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
  FiArrowRight,
} from "react-icons/fi";

export default function OrdersListPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageRef = useGSAPFadeIn({ y: 20, duration: 0.6 });

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const response = await api.getOrders({
          page: currentPage,
          per_page: 15,
        });
        if (response.success && response.data) {
          setOrders(response.data);
          if (response.meta) {
            setTotalPages(response.meta.last_page || 1);
          }
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [currentPage]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  return (
    <div className="min-h-screen bg-background">
      <Section className="!pt-2">
        <Container>
          <div ref={pageRef}>
            <div className="flex items-center justify-between mb-8">
              <TypographyH1>Order History</TypographyH1>
              <Button onClick={() => navigate("/store")}>
                <FiShoppingBag className="mr-2" />
                Continue Shopping
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <Card className="p-12 text-center">
                <FiPackage className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <TypographyH2 className="mb-2">No Orders Yet</TypographyH2>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </p>
                <Button onClick={() => navigate("/store")}>
                  <FiShoppingBag className="mr-2" />
                  Browse Store
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <TypographyH3 className="text-lg mb-1">
                              Order #{order.order_number}
                            </TypographyH3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <FiCalendar className="w-4 h-4" />
                                {formatDate(order.created_at)}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiPackage className="w-4 h-4" />
                                {order.quantity} item
                                {order.quantity !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(
                              order.payment_status,
                            )}`}
                          >
                            Payment: {order.payment_status}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Fulfillment: {order.fulfillment_status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <FiDollarSign className="w-5 h-5" />
                          <span>
                            {order.items?.[0]?.product?.currency_symbol || "Le"}{" "}
                            {order.total_amount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View Details
                          <FiArrowRight className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
