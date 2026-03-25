"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } =
    useCart();

  // Lock body scroll when drawer is open & close on Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCart();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const lines = cart?.lines || [];
  const subtotal = cart?.cost?.subtotalAmount?.amount
    ? parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)
    : "0.00";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-[#111] border-l border-white/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-sm font-body font-semibold tracking-[0.15em] uppercase text-white">
            Cart
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-2 text-white/40">
                ({cart.totalQuantity})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-1 text-white/50 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Line Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="text-white/30 text-sm text-center mt-12">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-5">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-24 relative bg-white/5 flex-shrink-0">
                    {line.merchandise.image ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={
                          line.merchandise.image.altText ||
                          line.merchandise.product.title
                        }
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/10 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium truncate">
                      {line.merchandise.product.title}
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5">
                      {line.merchandise.selectedOptions
                        .map((o) => o.value)
                        .join(" / ")}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      $
                      {parseFloat(
                        line.cost.totalAmount.amount
                      ).toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          line.quantity === 1
                            ? removeItem(line.id)
                            : updateItem(line.id, line.quantity - 1)
                        }
                        disabled={isLoading}
                        className="w-6 h-6 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors text-xs disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="text-xs text-white/70 w-4 text-center">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItem(line.id, line.quantity + 1)
                        }
                        disabled={isLoading}
                        className="w-6 h-6 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors text-xs disabled:opacity-30"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="ml-auto text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider disabled:opacity-30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/50 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="text-sm text-white font-medium">
                ${subtotal}
              </span>
            </div>
            <a
              href={cart?.checkoutUrl}
              className="block w-full text-center py-3 bg-gold text-background text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
            >
              Checkout
            </a>
            <p className="text-[10px] text-white/50 text-center mt-3">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
