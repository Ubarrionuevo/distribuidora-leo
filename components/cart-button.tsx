"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export function CartButton() {
  const { totalItems } = useCart()
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-zinc-500 hover:text-zinc-900"
      onClick={() => router.push("/cart")}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
      <span className="sr-only">Ver carrito</span>
    </Button>
  )
}

