/**
 * Authentication utilities for managing user tokens
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  roles?: string[];
}

/**
 * Get the authentication token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Set the authentication token in localStorage
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  // Dispatch custom event for auth state change
  window.dispatchEvent(new CustomEvent('auth-change'));
}

/**
 * Remove the authentication token from localStorage
 */
export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  // Dispatch custom event for auth state change
  window.dispatchEvent(new CustomEvent('auth-change'));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

/**
 * Get the current user from localStorage
 */
export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Set the current user in localStorage
 */
export function setUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Dispatch custom event for auth state change
  window.dispatchEvent(new CustomEvent('auth-change'));
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  removeToken();
  // Event is already dispatched by removeToken
}

/**
 * Get Authorization header value
 */
export function getAuthHeader(): string | null {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
}
