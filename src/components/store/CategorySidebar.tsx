import { Link, useLocation } from "react-router-dom";
import { Card } from "../ui/Card";
import { type Category } from "@/src/lib/api";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/src/lib/utils";

interface CategorySidebarProps {
  categories: Category[];
  currentCategory?: string;
}

export function CategorySidebar({ categories, currentCategory }: CategorySidebarProps) {
  const location = useLocation();
  const isStorePage = location.pathname === "/store";

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Categories</h3>
      <nav className="space-y-1">
        <Link
          to="/store"
          className={cn(
            "flex items-center justify-between p-2 rounded-md transition-colors",
            isStorePage
              ? "bg-accent/10 text-accent font-medium"
              : "hover:bg-muted text-foreground"
          )}
        >
          <span>All Products</span>
        </Link>
        {categories.map((category) => {
          const isActive = currentCategory === category.slug;
          return (
            <Link
              key={category.id}
              to={`/store/category/${category.slug}`}
              className={cn(
                "flex items-center justify-between p-2 rounded-md transition-colors",
                isActive
                  ? "bg-accent/10 text-accent font-medium"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <span>{category.name}</span>
              <FiChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          );
        })}
      </nav>
    </Card>
  );
}

