import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Slider } from "../ui/Slider";
import { Switch } from "../ui/Switch";
import { FiFilter, FiX } from "react-icons/fi";

interface FiltersPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  vendor: string;
  onVendorChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  inStock: boolean;
  onInStockChange: (value: boolean) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  maxPrice?: number;
  vendorOptions?: Array<{
    slug: string;
    name: string;
  }>;
}

export function FiltersPanel({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  vendor,
  onVendorChange,
  priceRange,
  onPriceRangeChange,
  inStock,
  onInStockChange,
  sortBy,
  onSortChange,
  onClearFilters,
  maxPrice = 50000,
  vendorOptions = [],
}: FiltersPanelProps) {
  const hasActiveFilters =
    search ||
    category ||
    vendor ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    inStock;

  return (
    <Card className="p-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiFilter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <FiX className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6 min-w-0">
        {/* Search */}
        <div className="min-w-0">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Sort */}
        <div className="min-w-0">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="min-w-0">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category || "all"}
            onValueChange={(value) =>
              onCategoryChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="finishing">Finishing</SelectItem>
              <SelectItem value="roofing">Roofing</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vendor */}
        <div className="min-w-0">
          <Label htmlFor="vendor">Vendor</Label>
          <Select
            value={vendor || "all"}
            onValueChange={(value) =>
              onVendorChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="All Vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {vendorOptions.map((vendorItem) => (
                <SelectItem key={vendorItem.slug} value={vendorItem.slug}>
                  {vendorItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="min-w-0">
          <Label className="block">
            Price Range: NLe {priceRange[0]} - NLe {priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) =>
              onPriceRangeChange(value as [number, number])
            }
            min={0}
            max={maxPrice}
            step={10}
            className="mt-4 w-full"
          />
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="in-stock">In Stock Only</Label>
          <Switch
            id="in-stock"
            checked={inStock}
            onCheckedChange={onInStockChange}
          />
        </div>
      </div>
    </Card>
  );
}
