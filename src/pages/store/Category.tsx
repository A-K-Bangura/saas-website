import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import StoreListPage from "./StoreList";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Set category filter in URL if not already set
  useEffect(() => {
    if (slug && !searchParams.get("category")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", slug);
      setSearchParams(params, { replace: true });
    }
  }, [slug, searchParams, setSearchParams]);
  
  // Category page is essentially StoreList with category filter
  return <StoreListPage />;
}

