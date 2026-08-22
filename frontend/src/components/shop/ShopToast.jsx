import { Check } from "lucide-react";
import { useShopCart } from "@/context/ShopCartContext";

export default function ShopToast() {
  const { toast } = useShopCart();
  if (!toast) return null;

  return (
    <div className="shop-toast" role="status" aria-live="polite" data-testid="shop-toast">
      <Check size={18} aria-hidden="true" />
      <div>
        <strong>{toast.message}</strong>
        {toast.name && <span>{toast.name}</span>}
      </div>
    </div>
  );
}
