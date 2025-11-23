import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { authApi, ApiError } from "@/src/lib/api";
import { getUser, clearAuth, isAuthenticated } from "@/src/lib/auth";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { FiUser, FiMail, FiLogOut, FiLoader, FiPackage, FiFileText } from "react-icons/fi";
import { Badge } from "@/src/components/ui/Badge";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    // Load user data from API
    const loadUser = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          clearAuth();
          navigate("/login", { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuth();
      setIsLoggingOut(false);
      navigate("/", { replace: true });
    }
  };

  if (isLoading) {
    return (
      <Section className="min-h-screen flex items-center justify-center py-12">
        <Container className="max-w-md">
          <div className="flex items-center justify-center gap-2">
            <FiLoader className="w-5 h-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading profile...</span>
          </div>
        </Container>
      </Section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Section className="min-h-screen py-12">
      <Container className="max-w-2xl">
        <div className="space-y-6">
          <div>
            <TypographyH1 className="mb-2">My Profile</TypographyH1>
            <p className="text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <TypographyH2 className="mb-1">{user.name}</TypographyH2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiMail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="mt-1 text-base">{user.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <p className="mt-1 text-base">{user.email}</p>
                </div>

                {user.roles && user.roles.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Roles
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/orders")}
                    className="w-full sm:w-auto"
                  >
                    <FiPackage className="w-4 h-4 mr-2" />
                    View My Orders
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/requests")}
                    className="w-full sm:w-auto"
                  >
                    <FiFileText className="w-4 h-4 mr-2" />
                    View My Requests
                  </Button>
                </div>

                <div>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full sm:w-auto"
                  >
                    {isLoggingOut ? (
                      <>
                        <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <FiLogOut className="w-4 h-4 mr-2" />
                        Logout
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

