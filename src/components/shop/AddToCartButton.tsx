"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string;
  availableForSale: boolean;
}) {
  const { addItem, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    if (!variantId || !availableForSale) return;
    await addItem(variantId, quantity);
  };

  return (
    <div className="space-y-3">
      {/* Quantity picker */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-body font-semibold text-white/50 tracking-[0.15em] uppercase">
          Qty
        </span>
        <div className="flex items-center border border-white/15">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
          >
            -
          </button>
          <span className="w-9 h-9 flex items-center justify-center text-white text-sm border-x border-white/15">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        disabled={!availableForSale || isLoading}
        className={`w-full py-3.5 text-xs font-body font-semibold tracking-[0.15em] uppercase transition-colors ${
          availableForSale
            ? "bg-gold text-background hover:bg-gold-light"
            : "bg-white/5 text-white/25 cursor-not-allowed"
        }`}
      >
        {isLoading
          ? "Adding..."
          : availableForSale
            ? "Add to Cart"
            : "Sold Out"}
      </button>
    </div>
  );
}
