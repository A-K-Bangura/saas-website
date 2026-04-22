import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import { TypographyH1, TypographyH2 } from "@/src/components/ui/Typography";
import { ProductCard } from "@/src/components/store/ProductCard";
import { FiltersPanel } from "@/src/components/store/FiltersPanel";
import { CategoryBar } from "@/src/components/store/CategoryBar";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/Tooltip";
import { api, type Product, type Category, type Vendor } from "@/src/lib/api";
import { useCart } from "@/src/hooks/useCart";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import storeHeroImage from "@/src/assets/hero_images/store.png";

export default function StoreListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { itemCount } = useCart();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const vendor = searchParams.get("vendor") || "";
  const priceMin = searchParams.get("price_min")
    ? Number(searchParams.get("price_min"))
    : 0;
  const priceMax = searchParams.get("price_max")
    ? Number(searchParams.get("price_max"))
    : 50000;
  const inStock = searchParams.get("in_stock") === "true";
  const sortBy = searchParams.get("sort") || "popularity";

  const productsRef = useGSAPFadeIn({ y: 30, stagger: 0.05 });

  useEffect(() => {
    loadCategories();
    loadVendors();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [
    search,
    category,
    vendor,
    priceMin,
    priceMax,
    inStock,
    sortBy,
    currentPage,
    categories,
    vendors,
  ]);

  useEffect(() => {
    if (!vendor) {
      setSelectedVendor(null);
      return;
    }

    const vendorFromList = vendors.find((item) => item.slug === vendor);
    if (!vendorFromList) {
      setSelectedVendor(null);
      return;
    }

    setSelectedVendor(vendorFromList);
    void loadVendorDetails(vendorFromList.id);
  }, [vendor, vendors]);

  // Scroll detection for showing/hiding icons
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show icons at the top of the page
      if (currentScrollY < 100) {
        setShowIcons(true);
      } else {
        // Show icons when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setShowIcons(true);
        } else if (currentScrollY > lastScrollY) {
          setShowIcons(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const loadVendors = async () => {
    try {
      const response = await api.getVendors({
        include_empty: false,
        sort_by: "name",
        sort_order: "asc",
        per_page: 50,
      });
      setVendors(response.data);
    } catch (error) {
      console.error("Failed to load vendors:", error);
      setVendors([]);
    }
  };

  const loadVendorDetails = async (vendorId: number) => {
    try {
      const details = await api.getVendor(vendorId);
      setSelectedVendor(details);
    } catch (error) {
      console.error("Failed to load vendor details:", error);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // Find category ID from slug if category is provided
      let categoryId: number | undefined;
      if (category) {
        const foundCategory = categories.find((c) => c.slug === category);
        if (foundCategory) {
          categoryId = foundCategory.id;
        }
      }

      const selectedVendorId = vendor
        ? vendors.find((item) => item.slug === vendor)?.id
        : undefined;

      const sortMap: Record<
        string,
        { sort_by?: string; sort_order?: "asc" | "desc" }
      > = {
        popularity: {},
        "price-asc": { sort_by: "price", sort_order: "asc" },
        "price-desc": { sort_by: "price", sort_order: "desc" },
        newest: { sort_by: "created_at", sort_order: "desc" },
        rating: {},
      };
      const sortParams = sortMap[sortBy] || {};

      const response = await api.getProducts({
        search: search || undefined,
        category: category || undefined, // Keep for client-side filtering fallback
        category_id: categoryId,
        vendor_id: selectedVendorId,
        min_price: priceMin > 0 ? priceMin : undefined,
        max_price: priceMax < 50000 ? priceMax : undefined,
        in_stock: inStock || undefined,
        is_marketplace: true, // Filter for marketplace products
        sort_by: sortParams.sort_by,
        sort_order: sortParams.sort_order,
        page: currentPage,
        per_page: 12,
      });

      let productData = response.data;
      if (sortBy === "rating") {
        productData = [...productData].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0),
        );
      } else if (sortBy === "popularity") {
        productData = [...productData].sort(
          (a, b) => (b.reviews_count || 0) - (a.reviews_count || 0),
        );
      }

      setProducts(productData);
      setTotalPages(response.meta.last_page);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchParams = (
    key: string,
    value: string | number | boolean,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === false || value === 0) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    params.delete("page"); // Reset to page 1 when filters change
    setSearchParams(params);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Section className="relative overflow-hidden" padding="xl">
        <div className="absolute inset-0">
          <img
            src={storeHeroImage}
            alt="Store hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/30" />
        </div>
        <Container className="relative z-10">
          <div className="relative">
            {/* Cart and Wishlist Icons - Fixed Top Right (Scroll-aware) */}
            <div
              className={`fixed top-10 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-4 transition-all duration-300 ${
                showIcons
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/wishlist"
                    className="relative p-2 rounded-full bg-background/95 backdrop-blur-sm border border-border shadow-lg hover:bg-muted transition-colors"
                    aria-label="View wishlist"
                  >
                    <FiHeart className="w-2 h-2 sm:w-3 sm:h-3 text-foreground" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Wishlist</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/cart"
                    className="relative p-2 rounded-full bg-background/95 backdrop-blur-sm border border-border shadow-lg hover:bg-muted transition-colors"
                    aria-label="View cart"
                  >
                    <FiShoppingCart className="w-2 h-2 sm:w-3 sm:h-3 text-foreground" />
                    {itemCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-3 w-3 flex items-center justify-center p-0 text-xs"
                      >
                        {itemCount > 9 ? "9+" : itemCount}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    View Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <TypographyH2 className="text-center mb-4 text-secondary-foreground">
              Online Store
            </TypographyH2>
            <p className="text-center text-xl font-semibold text-muted max-w-2xl mx-auto">
              Browse our wide selection of construction materials, tools,
              supplies, finishings and more. Place an order and have it
              delivered to your doorstep.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="!pt-6">
        <Container>
          {/* Vendors Bar - Horizontal Scrollable */}
          <div className="mb-6">
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max items-start pt-2 gap-4 pb-2">
                <button
                  type="button"
                  onClick={() => updateSearchParams("vendor", "")}
                  className={`flex w-20 flex-col items-center gap-2 transition-all ${
                    !vendor ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                    All
                  </div>
                  <span className="line-clamp-2 text-center text-xs">
                    All Vendors
                  </span>
                </button>
                {vendors.map((vendorItem) => (
                  <button
                    key={vendorItem.id}
                    type="button"
                    onClick={() =>
                      updateSearchParams("vendor", vendorItem.slug)
                    }
                    className={`flex w-20 flex-col items-center gap-2 transition-all ${
                      vendor === vendorItem.slug
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`h-16 w-16 overflow-hidden rounded-full border bg-muted ${
                        vendor === vendorItem.slug ? "ring-2 ring-accent" : ""
                      }`}
                    >
                      <img
                        src={vendorItem.logo || "/placeholder.svg"}
                        alt={vendorItem.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="line-clamp-2 text-center text-xs">
                      {vendorItem.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Bar - Horizontal Scrollable */}
          <div className="mb-6">
            <CategoryBar categories={categories} currentCategory={category} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar - Filters - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-16 self-start max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
                <FiltersPanel
                  search={search}
                  onSearchChange={(value) =>
                    updateSearchParams("search", value)
                  }
                  category={category}
                  onCategoryChange={(value) =>
                    updateSearchParams("category", value)
                  }
                  vendor={vendor}
                  onVendorChange={(value) =>
                    updateSearchParams("vendor", value)
                  }
                  priceRange={[priceMin, priceMax]}
                  onPriceRangeChange={(value) => {
                    updateSearchParams("price_min", value[0]);
                    updateSearchParams("price_max", value[1]);
                  }}
                  inStock={inStock}
                  onInStockChange={(value) =>
                    updateSearchParams("in_stock", value)
                  }
                  sortBy={sortBy}
                  onSortChange={(value) => updateSearchParams("sort", value)}
                  onClearFilters={clearFilters}
                  maxPrice={50000}
                  vendorOptions={vendors.map((vendorItem) => ({
                    slug: vendorItem.slug,
                    name: vendorItem.name,
                  }))}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {selectedVendor && (
                <div className="mb-4 rounded-lg border bg-card p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={selectedVendor.logo || "/placeholder.svg"}
                      alt={selectedVendor.name}
                      className="h-16 w-16 rounded-full border object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {selectedVendor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedVendor.contact_email ||
                          "No contact email provided"}
                        {selectedVendor.phone
                          ? ` · ${selectedVendor.phone}`
                          : ""}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selectedVendor.active_products_count ?? 0} active
                        product
                        {(selectedVendor.active_products_count ?? 0) === 1
                          ? ""
                          : "s"}
                        {typeof selectedVendor.rating === "number"
                          ? ` · Rating ${selectedVendor.rating.toFixed(1)}`
                          : ""}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSearchParams("vendor", "")}
                    >
                      Clear Vendor
                    </Button>
                  </div>
                </div>
              )}

              {/* Mobile Filters Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="w-full"
                >
                  {showMobileFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="lg:hidden mb-6">
                  <FiltersPanel
                    search={search}
                    onSearchChange={(value) =>
                      updateSearchParams("search", value)
                    }
                    category={category}
                    onCategoryChange={(value) =>
                      updateSearchParams("category", value)
                    }
                    vendor={vendor}
                    onVendorChange={(value) =>
                      updateSearchParams("vendor", value)
                    }
                    priceRange={[priceMin, priceMax]}
                    onPriceRangeChange={(value) => {
                      updateSearchParams("price_min", value[0]);
                      updateSearchParams("price_max", value[1]);
                    }}
                    inStock={inStock}
                    onInStockChange={(value) =>
                      updateSearchParams("in_stock", value)
                    }
                    sortBy={sortBy}
                    onSortChange={(value) => updateSearchParams("sort", value)}
                    onClearFilters={clearFilters}
                    maxPrice={50000}
                    vendorOptions={vendors.map((vendorItem) => ({
                      slug: vendorItem.slug,
                      name: vendorItem.name,
                    }))}
                  />
                </div>
              )}

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-square w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div
                    ref={productsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <FiChevronLeft />
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return <span key={page}>...</span>;
                        }
                        return null;
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <FiChevronRight />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <TypographyH2 className="mb-2">
                    No products found
                  </TypographyH2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
