import { Link, useLocation } from "react-router-dom";
import { type Category } from "@/src/lib/api";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/Button";

interface CategoryBarProps {
  categories: Category[];
  currentCategory?: string;
}

export function CategoryBar({ categories, currentCategory }: CategoryBarProps) {
  const location = useLocation();
  const isStorePage = location.pathname === "/store" && !currentCategory;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-max">
        <Link to="/store">
          <Button
            variant={isStorePage ? "default" : "outline"}
            size="sm"
            className={cn(
              "whitespace-nowrap",
              isStorePage && "bg-accent text-accent-foreground"
            )}
          >
            All Products
          </Button>
        </Link>
        {categories.map((category) => {
          const isActive = currentCategory === category.slug;
          return (
            <Link key={category.id} to={`/store/category/${category.slug}`}>
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "whitespace-nowrap",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                {category.title || category.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

