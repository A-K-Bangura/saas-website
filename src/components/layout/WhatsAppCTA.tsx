import { Button } from "@/src/components/ui/Button";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const MAJOR_EXACT_PATHS = ["/", "/about"];
const MAJOR_PREFIX_PATHS = ["/projects", "/profiles", "/store", "/services"];

function isVisibleOnMajorPages(pathname: string) {
  if (MAJOR_EXACT_PATHS.includes(pathname)) {
    return true;
  }

  return MAJOR_PREFIX_PATHS.some((prefix) => pathname.startsWith(prefix));
}

function normalizePhoneNumber(rawPhone: string) {
  return rawPhone.replace(/\D/g, "");
}

export function WhatsAppCTA() {
  const { pathname } = useLocation();

  if (!isVisibleOnMajorPages(pathname)) {
    return null;
  }

  const rawPhone = import.meta.env.VITE_CONTACT_PHONE ?? "";
  const normalizedPhone = normalizePhoneNumber(rawPhone);

  if (!normalizedPhone) {
    return null;
  }

  const message = encodeURIComponent(
    "Hello, I would like to enquire about your services.",
  );
  const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="group h-14 md:h-15 w-12 md:w-36 hover:w-48 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-all duration-300 overflow-hidden"
        asChild
      >
        {/* <Button
        size="lg"
        className="group h-14 w-14 hover:w-48 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-all duration-300 overflow-hidden"
        asChild
      > */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-8 w-8 shrink-0" />
          <span className="max-w-0 opacity-0 group-hover:max-w-36 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-semibold">
            Chat on WhatsApp
          </span>
        </a>
      </Button>
    </div>
  );
}
