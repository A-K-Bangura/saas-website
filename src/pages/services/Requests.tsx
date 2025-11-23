import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1 } from "@/src/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/Tabs";
import {
  api,
  EstimateResponse,
  ConsultancyRequestResponse,
  LegalRequestResponse,
} from "@/src/lib/api";
import { isAuthenticated } from "@/src/lib/auth";
import { FiFileText, FiBriefcase, FiShield, FiLoader, FiAlertCircle } from "react-icons/fi";
import { format } from "date-fns";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";

export default function RequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("estimates");
  const [estimates, setEstimates] = useState<EstimateResponse[]>([]);
  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequestResponse[]>([]);
  const [legalRequests, setLegalRequests] = useState<LegalRequestResponse[]>([]);
  const [isLoadingEstimates, setIsLoadingEstimates] = useState(false);
  const [isLoadingConsultancy, setIsLoadingConsultancy] = useState(false);
  const [isLoadingLegal, setIsLoadingLegal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const loadedTabs = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "estimates" && !loadedTabs.current.has("estimates") && !isLoadingEstimates) {
      loadedTabs.current.add("estimates");
      loadEstimates();
    }
  }, [activeTab, isLoadingEstimates]);

  useEffect(() => {
    if (activeTab === "consultancy" && !loadedTabs.current.has("consultancy") && !isLoadingConsultancy) {
      loadedTabs.current.add("consultancy");
      loadConsultancyRequests();
    }
  }, [activeTab, isLoadingConsultancy]);

  useEffect(() => {
    if (activeTab === "legal" && !loadedTabs.current.has("legal") && !isLoadingLegal) {
      loadedTabs.current.add("legal");
      loadLegalRequests();
    }
  }, [activeTab, isLoadingLegal]);

  const loadEstimates = async () => {
    try {
      setIsLoadingEstimates(true);
      setError(null);
      const response = await api.getEstimates();
      if (response.success && response.data) {
        setEstimates(response.data);
      } else {
        setError(response.message || "Failed to load estimates");
      }
    } catch (err) {
      console.error("Error loading estimates:", err);
      setError("Failed to load estimates. Please try again.");
    } finally {
      setIsLoadingEstimates(false);
    }
  };

  const loadConsultancyRequests = async () => {
    try {
      setIsLoadingConsultancy(true);
      setError(null);
      const response = await api.getConsultancyRequests();
      if (response.success && response.data) {
        setConsultancyRequests(response.data);
      } else {
        setError(response.message || "Failed to load consultancy requests");
      }
    } catch (err) {
      console.error("Error loading consultancy requests:", err);
      setError("Failed to load consultancy requests. Please try again.");
    } finally {
      setIsLoadingConsultancy(false);
    }
  };

  const loadLegalRequests = async () => {
    try {
      setIsLoadingLegal(true);
      setError(null);
      const response = await api.getLegalRequests();
      if (response.success && response.data) {
        setLegalRequests(response.data);
      } else {
        setError(response.message || "Failed to load legal requests");
      }
    } catch (err) {
      console.error("Error loading legal requests:", err);
      setError("Failed to load legal requests. Please try again.");
    } finally {
      setIsLoadingLegal(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary";
      case "quoted":
      case "accepted":
      case "processing":
        return "default";
      case "completed":
        return "success";
      case "rejected":
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return dateString;
    }
  };

  return (
    <Section className="min-h-screen py-12" ref={pageRef}>
      <Container className="max-w-6xl">
        <div className="mb-8">
          <TypographyH1 className="mb-2">My Service Requests</TypographyH1>
          <p className="text-muted-foreground">
            View and manage all your service requests
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <FiAlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="estimates" className="flex items-center gap-2">
              <FiFileText className="w-4 h-4" />
              Estimates
            </TabsTrigger>
            <TabsTrigger value="consultancy" className="flex items-center gap-2">
              <FiBriefcase className="w-4 h-4" />
              Consultancy
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2">
              <FiShield className="w-4 h-4" />
              Legal Advisory
            </TabsTrigger>
          </TabsList>

          {/* Estimates Tab */}
          <TabsContent value="estimates" className="space-y-4">
            {isLoadingEstimates ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : estimates.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FiFileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any estimate requests yet.
                  </p>
                  <Button onClick={() => navigate("/services/estimation")}>
                    Request an Estimate
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {estimates.map((estimate) => (
                  <Card key={estimate.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg">{estimate.project_title}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(estimate.status)}>
                        {estimate.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{estimate.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Requested Date</p>
                          <p className="font-medium">
                            {formatDate(estimate.requested_at || estimate.created_at)}
                          </p>
                        </div>
                        {estimate.estimate_size && (
                          <div>
                            <p className="text-muted-foreground">Size</p>
                            <p className="font-medium">
                              {estimate.estimate_size} {estimate.estimate_size_unit || "sqm"}
                            </p>
                          </div>
                        )}
                        {(estimate.budget_range_min || estimate.budget_range_max) && (
                          <div>
                            <p className="text-muted-foreground">Budget Range</p>
                            <p className="font-medium">
                              {estimate.budget_range_min && estimate.budget_range_max
                                ? `Le ${estimate.budget_range_min.toLocaleString()} - Le ${estimate.budget_range_max.toLocaleString()}`
                                : estimate.budget_range_min
                                ? `From Le ${estimate.budget_range_min.toLocaleString()}`
                                : estimate.budget_range_max
                                ? `Up to Le ${estimate.budget_range_max.toLocaleString()}`
                                : "N/A"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Description</p>
                        <p className="text-sm">{estimate.description}</p>
                      </div>
                      {estimate.brief_description && (
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Brief Description</p>
                          <p className="text-sm">{estimate.brief_description}</p>
                        </div>
                      )}
                      {estimate.response_notes && (
                        <div className="pt-2 border-t">
                          <p className="text-muted-foreground text-sm mb-1">Response Notes</p>
                          <p className="text-sm">{estimate.response_notes}</p>
                        </div>
                      )}
                      {estimate.estimated_range_min && estimate.estimated_range_max && (
                        <div className="pt-2 border-t">
                          <p className="text-muted-foreground text-sm mb-1">Estimated Range</p>
                          <p className="text-sm font-semibold">
                            Le {estimate.estimated_range_min.toLocaleString()} - Le{" "}
                            {estimate.estimated_range_max.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Consultancy Tab */}
          <TabsContent value="consultancy" className="space-y-4">
            {isLoadingConsultancy ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : consultancyRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FiBriefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any consultancy requests yet.
                  </p>
                  <Button onClick={() => navigate("/services/consultancy")}>
                    Request Consultancy
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {consultancyRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg">{request.consultancy_type}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Requested Date</p>
                          <p className="font-medium">
                            {formatDate(request.requested_date || request.created_at)}
                          </p>
                        </div>
                        {request.preferred_date && (
                          <div>
                            <p className="text-muted-foreground">Preferred Date</p>
                            <p className="font-medium">{formatDate(request.preferred_date)}</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Request Details</p>
                        <p className="text-sm">{request.request_details}</p>
                      </div>
                      {request.response_notes && (
                        <div className="pt-2 border-t">
                          <p className="text-muted-foreground text-sm mb-1">Response Notes</p>
                          <p className="text-sm">{request.response_notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-4">
            {isLoadingLegal ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : legalRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FiShield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any legal advisory requests yet.
                  </p>
                  <Button onClick={() => navigate("/services/legal-advisory")}>
                    Request Legal Advisory
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {legalRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg">{request.issue_type}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Requested Date</p>
                          <p className="font-medium">
                            {formatDate(request.requested_date || request.created_at)}
                          </p>
                        </div>
                        {request.property_detail && (
                          <div>
                            <p className="text-muted-foreground">Property Detail</p>
                            <p className="font-medium">{request.property_detail}</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Request Details</p>
                        <p className="text-sm">{request.request_details}</p>
                      </div>
                      {request.response_notes && (
                        <div className="pt-2 border-t">
                          <p className="text-muted-foreground text-sm mb-1">Response Notes</p>
                          <p className="text-sm">{request.response_notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}

