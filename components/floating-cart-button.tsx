"use client"

import { useState } from "react"
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

export function FloatingCartButton() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  if (totalItems === 0) return null

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full max-w-md flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 bg-[#e63946] hover:bg-[#d62b39] text-white rounded-2xl shadow-[0_8px_30px_rgb(230,57,70,0.3)] backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-[0_8px_35px_rgb(230,57,70,0.4)] hover:translate-y-[-2px] border border-white/10"
        >
          <div className="flex items-center">
            <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-medium text-sm sm:text-base ml-3 sm:ml-4">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </span>
          </div>
          <div className="flex items-center bg-white/10 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
            <span className="font-medium text-sm sm:text-base mr-2 sm:mr-3">${totalPrice.toLocaleString("es-AR")}</span>
            <div className="bg-white/10 rounded-lg p-0.5 sm:p-1">
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="bottom" 
          className="h-[85vh] sm:h-full w-full sm:max-w-md p-4 sm:p-6 rounded-t-3xl sm:rounded-none sm:rounded-l-3xl sm:rounded-r-none sm:side-right"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-lg font-bold flex items-center">
              <div className="bg-[#e63946]/10 rounded-xl p-2">
                <ShoppingBag className="h-5 w-5 mr-2 text-[#e63946]" />
              </div>
              <span className="ml-2">Carrito de compras</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto -mx-4 px-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent hover:scrollbar-thumb-zinc-300">
            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-2 border-b border-zinc-100">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-sm text-zinc-900">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">${item.price.toLocaleString("es-AR")}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-zinc-500"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                        <span className="w-4 sm:w-6 text-center text-xs">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-zinc-500"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-zinc-500 hover:text-red-500 h-6 w-6 sm:h-7 sm:w-7 p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-500 text-sm">No hay productos en el carrito</p>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center font-medium">
              <span className="text-sm sm:text-base">Total:</span>
              <span className="text-[#e63946] text-sm sm:text-base">${totalPrice.toLocaleString("es-AR")}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <SheetClose asChild>
                <Button variant="outline" className="w-full sm:flex-1 text-sm">
                  Seguir comprando
                </Button>
              </SheetClose>
              <Button
                className="w-full sm:flex-1 bg-[#e63946] hover:bg-[#d62b39] text-white text-sm"
                onClick={() => {
                  setIsOpen(false)
                  router.push("/cart")
                }}
              >
                Finalizar pedido
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

