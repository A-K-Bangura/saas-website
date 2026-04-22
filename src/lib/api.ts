/**
 * Central API client for backend integration
 */

import { getAuthHeader, clearAuth } from "./auth";

const API_BASE_URL =
  import.meta.env.VITE_BASE_DEV_URL || "http://localhost:8000/api/v1";

// API Response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    current_page?: number;
    from?: number;
    last_page?: number;
    per_page?: number;
    to?: number;
    total?: number;
  };
  links?: {
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
  };
  errors?: Record<string, string[]>;
}

// API Error structure
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Types
export interface EstimateRequest {
  name: string;
  email: string;
  phone?: string;
  project_title: string;
  location: string;
  description: string;
  estimate_size?: number;
  estimate_size_unit?: string;
  budget_range_min?: number;
  budget_range_max?: number;
  brief_description?: string;
  attachments?: File[];
}

export interface ConsultancyRequest {
  name: string;
  email: string;
  phone?: string;
  consultancy_type: string;
  preferred_date?: string;
  request_details: string;
}

export interface LegalRequest {
  name: string;
  email: string;
  phone?: string;
  issue_type: string;
  property_detail?: string;
  request_details: string;
}

// Response types for service requests
export interface EstimateResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  project_title: string;
  description: string;
  location: string;
  estimate_size?: number;
  estimate_size_unit?: string;
  budget_range_min?: number;
  budget_range_max?: number;
  brief_description?: string;
  attachments?: string | null;
  estimated_range_min?: number | null;
  estimated_range_max?: number | null;
  estimated_range?: string | null;
  status: string;
  requested_at: string;
  response_notes?: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  responder?: {
    id: number;
    name: string;
    email: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface ConsultancyRequestResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  consultancy_type: string;
  preferred_date?: string;
  request_details: string;
  requested_date?: string;
  status: string;
  response_notes?: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  assigned_user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface LegalRequestResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  issue_type: string;
  property_detail?: string;
  request_details: string;
  requested_date?: string;
  status: string;
  response_notes?: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  assigned_user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  short_description?: string | null;
  price: number;
  sale_price?: number | null;
  effective_price: number;
  currency: string;
  currency_symbol: string;
  formatted_price: string;
  formatted_effective_price: string;
  discount: number;
  discount_percent: string;
  stock: number;
  unit?: string | null;
  sku?: string | null;
  size?: string | null;
  condition?: string;
  status: string;
  is_featured: boolean;
  is_marketplace: boolean;
  photo: string;
  images: string[];
  attributes?: Record<string, any> | any[];
  category: {
    id: number;
    title: string;
    slug: string;
  };
  sub_category?: {
    id: number;
    title: string;
    slug: string;
  } | null;
  brand?: {
    id: number;
    name: string;
  } | null;
  vendor?: {
    id: number;
    name: string;
  } | null;
  in_stock: boolean;
  variants?: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
  }>;
  rating?: number;
  reviews_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  name?: string; // For backward compatibility
  parent_id?: number;
  children?: Category[];
}

export interface Vendor {
  id: number;
  name: string;
  slug: string;
  contact_email?: string;
  phone?: string;
  address?: string;
  verified?: boolean;
  rating?: number;
  logo?: string;
  active_products_count?: number;
  total_products_count?: number;
  total_orders_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Professional {
  id: number;
  slug: string;
  name: string;
  profession_type: string;
  headline?: string;
  bio?: string;
  location?: string;
  experience_years?: number;
  rating?: number;
  specialties?: string[];
  photo?: string;
  contact_email?: string;
  phone?: string;
  social_links?: Array<{
    platform: string;
    url: string;
  }>;
  status: string;
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  projects_count?: number;
  reviews_count?: number;
  badges?: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  projects?: Array<{
    id: number;
    title: string;
    slug: string;
    description?: string;
    type?: string;
    location?: string;
    year?: number;
    status?: string;
    hero_images?: string[];
    progress_images?: string[];
    render_images?: string[];
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    review: string;
    user: {
      id: number;
      name: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface ProfessionalReview {
  id: number;
  rating: number;
  review: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProductReview {
  id: number;
  rate: number;
  review: string;
  status?: string;
  user: {
    id: number;
    name: string;
    email?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description?: string;
  type?: string; // Residential, Commercial, Public, Other
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  year?: number;
  status?: string; // completed, ongoing, upcoming
  budget?: number;
  duration?: string | null;
  hero_images?: string[];
  progress_images?: string[];
  render_images?: string[];
  creator?: {
    id: number;
    name: string;
    email: string;
  };
  professionals?: Array<{
    id: number;
    name: string;
    profession_type: string;
    photo?: string;
    role?: string | null;
    contribution_notes?: string | null;
  }>;
  professionals_count?: number;
  details?:
    | Array<{
        key: string;
        value: string;
      }>
    | any[];
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  price: number;
  amount: number;
  status: string;
  product: Product;
  created_at?: string;
  updated_at?: string;
}

export interface CartSummary {
  subtotal: number;
  quantity: number;
  delivery_charge: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  summary: CartSummary;
  created_at?: string;
  updated_at?: string;
}

export interface CheckoutRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  post_code: string;
  address1: string;
  address2?: string;
  shipping_id?: number;
  payment_method: "cod" | "paypal" | "stripe";
  coupon_code?: string;
  coupon?: string;
}

export interface CouponValidation {
  coupon_id: number;
  coupon_code: string;
  discount_type: "percent" | "fixed";
  discount_value: number;
  subtotal: number;
  discount_amount: number;
  total_after_discount: number;
}

export interface Order {
  id: number;
  order_number: string;
  sub_total: number;
  quantity: number;
  delivery_charge: number;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  fulfillment_status: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    country: string;
    post_code: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
  items?: Array<{
    id: number;
    product_id: number;
    variant_id?: number;
    quantity: number;
    price: number;
    amount: number;
    product: Product;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface CheckoutResponse extends ApiResponse<Order> {
  data: Order;
}

export interface CheckoutDetails {
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  shipping: {
    id: number;
    name: string;
    cost: number;
  } | null;
  cart_summary: {
    subtotal: number;
    quantity: number;
  };
}

/**
 * Generic fetch wrapper with authentication, error handling, retry logic, and timeout
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  retries: number = 0
): Promise<T> {
  const maxRetries = 2; // Maximum number of retries for transient failures
  const timeout = 30000; // 30 seconds timeout

  try {
    // Get authentication token
    const authHeader = getAuthHeader();

    // Prepare headers
    const headers: Record<string, string> = {};

    // Copy existing headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    // Only set Content-Type if not FormData (browser sets it automatically for FormData)
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Add Authorization header if token exists
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make the request
    // Note: We use Bearer token auth, not cookies, so credentials: 'include' is not needed
    // If you need cookie-based auth (Sanctum), configure CORS to allow specific origin, not wildcard
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
      // credentials: 'include', // Removed - causes CORS issues with wildcard origin. Use Bearer tokens instead.
    });

    clearTimeout(timeoutId);

    // Handle 401 Unauthorized - clear auth and potentially redirect
    if (response.status === 401) {
      clearAuth();
      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent("auth-change"));
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    // Handle 419 CSRF token expired
    if (response.status === 419) {
      throw new ApiError(
        "Session expired. Please refresh the page and try again.",
        419
      );
    }

    // Parse response
    let data: ApiResponse<T> | T;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Non-JSON response
        const text = await response.text();
        throw new ApiError(
          text || response.statusText || "Unexpected response format",
          response.status
        );
      }
    } catch (e) {
      // If response is not JSON and it's not already an ApiError, throw with status text
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        response.statusText || "Failed to parse response",
        response.status
      );
    }

    // Handle API error responses (success: false)
    if (
      !response.ok ||
      (typeof data === "object" &&
        data !== null &&
        "success" in data &&
        !data.success)
    ) {
      const apiResponse = data as ApiResponse<T>;
      throw new ApiError(
        apiResponse.message || response.statusText || "API request failed",
        response.status,
        apiResponse.errors
      );
    }

    // If response follows ApiResponse structure, extract data
    if (typeof data === "object" && data !== null && "data" in data) {
      const apiResponse = data as ApiResponse<T>;
      return apiResponse.data as T;
    }

    // Otherwise return data as-is (for backward compatibility)
    return data as T;
  } catch (error) {
    // Handle network errors and timeouts
    if (error instanceof TypeError && error.message.includes("fetch")) {
      // Network error (no internet, CORS, etc.)
      if (retries < maxRetries) {
        // Retry on network errors with exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retries) * 1000)
        );
        return apiFetch<T>(endpoint, options, retries + 1);
      }
      throw new ApiError(
        "Network error. Please check your internet connection and try again.",
        0
      );
    }

    if (error instanceof Error && error.name === "AbortError") {
      // Timeout error
      throw new ApiError("Request timed out. Please try again.", 408);
    }

    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle other errors
    if (error instanceof Error) {
      throw new ApiError(error.message, 0);
    }

    // Unknown error
    throw new ApiError("An unexpected error occurred", 0);
  }
}

// Service Request APIs
export const api = {
  // Estimation
  async submitEstimate(
    data: EstimateRequest
  ): Promise<{ success: boolean; id: number; message: string }> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("project_title", data.project_title);
    formData.append("location", data.location);
    formData.append("description", data.description);
    if (data.estimate_size)
      formData.append("estimate_size", data.estimate_size.toString());
    if (data.estimate_size_unit)
      formData.append("estimate_size_unit", data.estimate_size_unit);
    if (data.budget_range_min)
      formData.append("budget_range_min", data.budget_range_min.toString());
    if (data.budget_range_max)
      formData.append("budget_range_max", data.budget_range_max.toString());
    if (data.brief_description)
      formData.append("brief_description", data.brief_description);
    if (data.attachments) {
      data.attachments.forEach((file) =>
        formData.append("attachments[]", file)
      );
    }

    // Get authentication token
    const authHeader = getAuthHeader();
    const headers: HeadersInit = {};
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(`${API_BASE_URL}/estimates`, {
      method: "POST",
      body: formData,
      headers,
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const result: ApiResponse<{ id: number }> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.message || "Failed to submit estimate",
        response.status,
        result.errors
      );
    }

    return {
      success: result.success,
      id: result.data.id,
      message: result.message,
    };
  },

  // Consultancy
  async submitConsultancyRequest(
    data: ConsultancyRequest
  ): Promise<{ success: boolean; id: number; message: string }> {
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(`${API_BASE_URL}/consultancy-requests`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const result: ApiResponse<{ id: number }> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.message || "Failed to submit consultancy request",
        response.status,
        result.errors
      );
    }

    return {
      success: result.success,
      id: result.data.id,
      message: result.message,
    };
  },

  // Legal Advisory
  async submitLegalRequest(
    data: LegalRequest
  ): Promise<{ success: boolean; id: number; message: string }> {
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(`${API_BASE_URL}/legal-requests`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const result: ApiResponse<{ id: number }> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.message || "Failed to submit legal request",
        response.status,
        result.errors
      );
    }

    return {
      success: result.success,
      id: result.data.id,
      message: result.message,
    };
  },

  // Products
  async getProducts(params?: {
    search?: string;
    category?: string; // slug - will be converted to category_id
    category_id?: number;
    vendor_id?: number;
    min_price?: number;
    max_price?: number;
    in_stock?: boolean;
    is_marketplace?: boolean;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    page?: number;
    per_page?: number;
  }): Promise<{
    data: Product[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.category_id)
      queryParams.append("category_id", params.category_id.toString());
    if (params?.vendor_id)
      queryParams.append("vendor_id", params.vendor_id.toString());
    if (params?.min_price)
      queryParams.append("min_price", params.min_price.toString());
    if (params?.max_price)
      queryParams.append("max_price", params.max_price.toString());
    if (params?.in_stock) queryParams.append("in_stock", "true");
    if (params?.is_marketplace !== undefined)
      queryParams.append("is_marketplace", params.is_marketplace.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params?.sort_order) queryParams.append("sort_order", params.sort_order);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    // Fetch products from API - need full response for meta and links
    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/products?${queryParams.toString()}`,
      {
        headers,
      }
    );

    // Handle 401 Unauthorized
    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError("Failed to fetch products", response.status);
    }

    const apiResponse: ApiResponse<Product[]> = await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch products",
        response.status,
        apiResponse.errors
      );
    }

    // Handle category slug filtering if provided (client-side fallback)
    let products = apiResponse.data;
    if (params?.category && !params?.category_id) {
      products = products.filter(
        (p) =>
          p.category.slug === params.category ||
          p.category.title === params.category
      );
    }

    // Return in expected format with meta from API
    return {
      data: products,
      meta: apiResponse.meta || {
        total: products.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: products.length,
      },
      links: apiResponse.links,
    };
  },

  async getProduct(idOrSlug: string | number): Promise<Product> {
    return apiFetch<Product>(`/products/${idOrSlug}`);
  },

  async getVendors(params?: {
    search?: string;
    verified?: boolean;
    include_empty?: boolean;
    sort_by?: "name" | "rating" | "created_at";
    sort_order?: "asc" | "desc";
    per_page?: number;
    page?: number;
  }): Promise<{
    data: Vendor[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.verified !== undefined)
      queryParams.append("verified", String(params.verified));
    if (params?.include_empty !== undefined)
      queryParams.append("include_empty", String(params.include_empty));
    if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params?.sort_order) queryParams.append("sort_order", params.sort_order);
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.page) queryParams.append("page", params.page.toString());

    const response = await fetch(`${API_BASE_URL}/vendors?${queryParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError("Failed to fetch vendors", response.status);
    }

    const apiResponse: ApiResponse<Vendor[]> = await response.json();
    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch vendors",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async getVendor(idOrSlug: string | number): Promise<Vendor> {
    return apiFetch<Vendor>(`/vendors/${idOrSlug}`);
  },

  // Categories
  // Note: There's no dedicated categories endpoint, so we extract unique categories from products
  async getCategories(): Promise<Category[]> {
    // Fetch products to extract categories
    // In a real scenario, you might want to cache this or have a dedicated endpoint
    try {
      const products = await apiFetch<Product[]>("/products?per_page=100");
      const categoryMap = new Map<number, Category>();

      products.forEach((product) => {
        if (product.category && !categoryMap.has(product.category.id)) {
          categoryMap.set(product.category.id, {
            id: product.category.id,
            title: product.category.title,
            slug: product.category.slug,
            name: product.category.title, // For backward compatibility
          });
        }
      });

      return Array.from(categoryMap.values());
    } catch (error) {
      console.error("Failed to load categories:", error);
      return [];
    }
  },

  // Professionals
  async getProfessionals(params?: {
    search?: string;
    profession_type?: string;
    location?: string;
    min_rating?: number;
    min_experience?: number;
    specialty?: string;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    per_page?: number;
    page?: number;
  }): Promise<{
    data: Professional[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.profession_type)
      queryParams.append("profession_type", params.profession_type);
    if (params?.location) queryParams.append("location", params.location);
    if (params?.min_rating)
      queryParams.append("min_rating", params.min_rating.toString());
    if (params?.min_experience)
      queryParams.append("min_experience", params.min_experience.toString());
    if (params?.specialty) queryParams.append("specialty", params.specialty);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params?.sort_order) queryParams.append("sort_order", params.sort_order);
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.page) queryParams.append("page", params.page.toString());

    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/professionals?${queryParams.toString()}`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError("Failed to fetch professionals", response.status);
    }

    const apiResponse: ApiResponse<Professional[]> = await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch professionals",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async getProfessional(idOrSlug: string | number): Promise<Professional> {
    return apiFetch<Professional>(`/professionals/${idOrSlug}`);
  },

  async getProfessionalProjects(
    professionalId: string | number,
    params?: {
      page?: number;
      per_page?: number;
    }
  ): Promise<{
    data: Array<{
      id: number;
      title: string;
      slug: string;
      description?: string;
      type?: string;
      location?: string;
      year?: number;
      status?: string;
      hero_images?: string[];
      progress_images?: string[];
      render_images?: string[];
    }>;
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/professionals/${professionalId}/projects?${queryParams.toString()}`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError(
        "Failed to fetch professional projects",
        response.status
      );
    }

    const apiResponse: ApiResponse<any[]> = await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch professional projects",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async getProfessionalReviews(
    professionalId: string | number,
    params?: {
      page?: number;
      per_page?: number;
    }
  ): Promise<{
    data: ProfessionalReview[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/professionals/${professionalId}/reviews?${queryParams.toString()}`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError(
        "Failed to fetch professional reviews",
        response.status
      );
    }

    const apiResponse: ApiResponse<ProfessionalReview[]> =
      await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch professional reviews",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async submitProfessionalReview(
    professionalId: string | number,
    data: {
      rating: number;
      review: string;
    }
  ): Promise<ProfessionalReview> {
    return apiFetch<ProfessionalReview>(
      `/professionals/${professionalId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  async getProductReviews(
    productId: string | number,
    params?: {
      page?: number;
      per_page?: number;
    }
  ): Promise<{
    data: ProductReview[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/reviews?${queryParams.toString()}`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError("Failed to fetch product reviews", response.status);
    }

    const apiResponse: ApiResponse<ProductReview[]> = await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch product reviews",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async submitProductReview(
    productId: string | number,
    data: {
      rate: number;
      review: string;
    }
  ): Promise<ProductReview> {
    return apiFetch<ProductReview>(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Projects
  async getProjects(params?: {
    search?: string;
    type?: string;
    status?: string;
    year?: number;
    location?: string;
    professional_id?: number;
    min_budget?: number;
    max_budget?: number;
    latitude?: number;
    longitude?: number;
    radius?: number;
    page?: number;
    per_page?: number;
  }): Promise<{
    data: Project[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from?: number;
      to?: number;
    };
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.type) queryParams.append("type", params.type);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.year) queryParams.append("year", params.year.toString());
    if (params?.location) queryParams.append("location", params.location);
    if (params?.professional_id)
      queryParams.append("professional_id", params.professional_id.toString());
    if (params?.min_budget)
      queryParams.append("min_budget", params.min_budget.toString());
    if (params?.max_budget)
      queryParams.append("max_budget", params.max_budget.toString());
    if (params?.latitude)
      queryParams.append("latitude", params.latitude.toString());
    if (params?.longitude)
      queryParams.append("longitude", params.longitude.toString());
    if (params?.radius) queryParams.append("radius", params.radius.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const authHeader = getAuthHeader();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(
      `${API_BASE_URL}/projects?${queryParams.toString()}`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    if (!response.ok) {
      throw new ApiError("Failed to fetch projects", response.status);
    }

    const apiResponse: ApiResponse<Project[]> = await response.json();

    if (!apiResponse.success) {
      throw new ApiError(
        apiResponse.message || "Failed to fetch projects",
        response.status,
        apiResponse.errors
      );
    }

    return {
      data: apiResponse.data,
      meta: apiResponse.meta || {
        total: apiResponse.data.length,
        per_page: params?.per_page || 15,
        current_page: params?.page || 1,
        last_page: 1,
        from: 1,
        to: apiResponse.data.length,
      },
      links: apiResponse.links,
    };
  },

  async getProject(idOrSlug: string | number): Promise<Project> {
    return apiFetch<Project>(`/projects/${idOrSlug}`);
  },

  // Cart
  async getCart(): Promise<Cart> {
    try {
      // apiFetch automatically extracts data from ApiResponse structure
      const cart = await apiFetch<Cart>("/cart");
      return cart;
    } catch (error) {
      // For unauthenticated users or errors, return empty cart
      if (error instanceof ApiError && error.status === 401) {
        return {
          items: [],
          summary: { subtotal: 0, quantity: 0, delivery_charge: 0, total: 0 },
        };
      }
      // For other errors, also return empty cart (cart endpoint may return empty for unauthenticated)
      return {
        items: [],
        summary: { subtotal: 0, quantity: 0, delivery_charge: 0, total: 0 },
      };
    }
  },

  async addToCart(
    productId: number,
    quantity: number,
    variantId?: number
  ): Promise<Cart> {
    await apiFetch<CartItem>("/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        quantity,
        variant_id: variantId,
      }),
    });

    // After adding, fetch the full cart
    return this.getCart();
  },

  async updateCartItem(itemId: number, quantity: number): Promise<Cart> {
    await apiFetch<CartItem>(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });

    // After updating, fetch the full cart
    return this.getCart();
  },

  async removeCartItem(itemId: number): Promise<Cart> {
    await apiFetch<never>(`/cart/${itemId}`, {
      method: "DELETE",
    });

    // After removing, fetch the full cart
    return this.getCart();
  },

  // Checkout
  async getCheckoutDetails(): Promise<ApiResponse<CheckoutDetails>> {
    return apiFetch<ApiResponse<CheckoutDetails>>("/checkout/details", {
      method: "GET",
    });
  },

  async checkout(data: CheckoutRequest): Promise<CheckoutResponse> {
    // apiFetch returns the data directly, but we need the full ApiResponse structure
    // So we'll fetch and parse manually to get the full response
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // Handle 401 Unauthorized
    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    // Parse response
    const responseData: ApiResponse<Order> = await fetchResponse.json();

    // Handle API error responses
    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message || fetchResponse.statusText || "Checkout failed",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },

  async validateCoupon(code: string): Promise<CouponValidation> {
    return apiFetch<CouponValidation>("/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },

  // Orders
  async getOrders(params?: {
    status?: string;
    payment_status?: string;
    fulfillment_status?: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<Order[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.payment_status)
      queryParams.append("payment_status", params.payment_status);
    if (params?.fulfillment_status)
      queryParams.append("fulfillment_status", params.fulfillment_status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/orders?${queryString}` : "/orders";

    // apiFetch returns the data directly, but we need the full ApiResponse structure
    // So we'll fetch and parse manually to get the full response
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    // Handle 401 Unauthorized
    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    // Parse response
    const responseData: ApiResponse<Order[]> = await fetchResponse.json();

    // Handle API error responses
    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message ||
          fetchResponse.statusText ||
          "Failed to fetch orders",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },

  async getOrder(
    idOrOrderNumber: number | string
  ): Promise<ApiResponse<Order>> {
    // apiFetch returns the data directly, but we need the full ApiResponse structure
    // So we'll fetch and parse manually to get the full response
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(
      `${API_BASE_URL}/orders/${idOrOrderNumber}`,
      {
        method: "GET",
        headers,
      }
    );

    // Handle 401 Unauthorized
    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    // Parse response
    const responseData: ApiResponse<Order> = await fetchResponse.json();

    // Handle API error responses
    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message ||
          fetchResponse.statusText ||
          "Failed to fetch order",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },

  // Service Requests
  async getEstimates(params?: {
    status?: string;
    pending?: boolean;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<EstimateResponse[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.pending) queryParams.append("pending", "true");
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/estimates?${queryString}` : "/estimates";

    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const responseData: ApiResponse<EstimateResponse[]> =
      await fetchResponse.json();

    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message ||
          fetchResponse.statusText ||
          "Failed to fetch estimates",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },

  async getConsultancyRequests(params?: {
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<ConsultancyRequestResponse[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/consultancy-requests?${queryString}`
      : "/consultancy-requests";

    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const responseData: ApiResponse<ConsultancyRequestResponse[]> =
      await fetchResponse.json();

    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message ||
          fetchResponse.statusText ||
          "Failed to fetch consultancy requests",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },

  async getLegalRequests(params?: {
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<LegalRequestResponse[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `/legal-requests?${queryString}`
      : "/legal-requests";

    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const fetchResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (fetchResponse.status === 401) {
      clearAuth();
      throw new ApiError("Unauthorized. Please login again.", 401);
    }

    const responseData: ApiResponse<LegalRequestResponse[]> =
      await fetchResponse.json();

    if (!fetchResponse.ok || !responseData.success) {
      throw new ApiError(
        responseData.message ||
          fetchResponse.statusText ||
          "Failed to fetch legal requests",
        fetchResponse.status,
        responseData.errors
      );
    }

    return responseData;
  },
};

// Authentication APIs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: "user" | "vendor" | "professional";
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
  };
  token: string;
  token_type: string;
}

export const authApi = {
  // Login
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new ApiError("Invalid email or password", 401);
    }

    if (response.status === 419) {
      throw new ApiError("Session expired. Please try again.", 419);
    }

    const result: ApiResponse<AuthResponse> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.message || "Login failed",
        response.status,
        result.errors
      );
    }

    return result.data;
  },

  // Register
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 419) {
      throw new ApiError("Session expired. Please try again.", 419);
    }

    const result: ApiResponse<AuthResponse> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.message || "Registration failed",
        response.status,
        result.errors
      );
    }

    return result.data;
  },

  // Logout
  async logout(): Promise<void> {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return; // Already logged out
    }

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // Even if logout fails, clear local auth
      console.error("Logout error:", error);
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthResponse["user"]> {
    const result = await apiFetch<{ user: AuthResponse["user"] }>("/auth/user");
    return result.user;
  },
};
