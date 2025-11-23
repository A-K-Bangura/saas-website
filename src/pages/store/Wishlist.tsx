import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { ProductCard } from "@/src/components/store/ProductCard";
import { Button } from "@/src/components/ui/Button";
import { FiHeart } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";

// In a real app, this would load from API/localStorage
const wishlistItems: any[] = [];

export default function WishlistPage() {
  const wishlistRef = useGSAPFadeIn({ y: 20, duration: 0.6 });

  return (
    <div className="min-h-screen bg-background">
      <Section className="bg-gradient-to-b from-background to-muted/30" padding="xl">
        <Container>
          <div className="text-center" ref={wishlistRef}>
            <FiHeart className="w-12 h-12 text-accent mx-auto mb-4" />
            <TypographyH1 className="mb-4">My Wishlist</TypographyH1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Save your favorite products for later.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <TypographyH2 className="mb-2">Your wishlist is empty</TypographyH2>
              <p className="text-muted-foreground mb-6">
                Start adding products to your wishlist to save them for later.
              </p>
              <Button onClick={() => window.location.href = "/store"}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}

