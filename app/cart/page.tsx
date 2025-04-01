"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    paymentMethod: "efectivo",
    deliveryMethod: "retiro",
    additionalInfo: "",
  })

  // Handle form changes
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Format WhatsApp message
  const formatWhatsAppMessage = () => {
    let message = `Pedido - DISTRIBUIDORA LEO:\n\n`

    // Add each item to the message
    items.forEach((item) => {
      message += `⚪ ${item.name} x ${item.quantity} = $${(item.price * item.quantity).toLocaleString("es-AR")}\n`
    })

    message += `\nPrecio Total: $${totalPrice.toLocaleString("es-AR")}\n\n`

    message += `Método de Pago:\n`
    message += `${formData.paymentMethod === "transferencia" ? "⚫" : "⚪"}Transferencia\n`
    message += `${formData.paymentMethod === "efectivo" ? "⚫" : "⚪"}Efectivo\n\n`

    message += `Método de Entrega:\n`
    message += `${formData.deliveryMethod === "retiro" ? "⚫" : "⚪"}Retiro en local\n`
    message += `${formData.deliveryMethod === "envio" ? "⚫" : "⚪"}Envío a domicilio\n\n`

    if (formData.additionalInfo) {
      message += `⚫Información Adicional:\n${formData.additionalInfo}\n\n`
    }

    message += `⚫Horario\nL a V: 8 a 18 hs\nS: 8 a 13 hs`

    return encodeURIComponent(message)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error("El carrito está vacío.")
      return
    }

    const phoneNumber = "5491112345678" // Replace with your actual WhatsApp number
    const message = formatWhatsAppMessage()
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
            <span className="font-medium text-zinc-900">Volver</span>
          </Link>
          <h1 className="flex-1 text-center font-bold text-xl text-zinc-900">Mi Carrito</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="container px-4 py-6 max-w-2xl mx-auto">
        {items.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-zinc-900">Productos</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-zinc-500 hover:text-red-500"
                  onClick={() => {
                    clearCart()
                    toast.success("Carrito vaciado")
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Vaciar
                </Button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-zinc-100">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-zinc-900">{item.name}</h3>
                      <p className="text-xs text-zinc-500">
                        ${item.price.toLocaleString("es-AR")} x {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-zinc-500"
                          onClick={() => {
                            if (item.quantity - 1 === 0) {
                              removeItem(item.id)
                              toast.warning("Producto eliminado")
                            } else {
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-zinc-500"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-zinc-500 hover:text-red-500 h-7 w-7 p-0"
                        onClick={() => {
                          removeItem(item.id)
                          toast.warning("Producto eliminado")
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center font-medium">
                <span>Total:</span>
                <span className="text-[#e63946]">${totalPrice.toLocaleString("es-AR")}</span>
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg text-zinc-900">Método de Pago</h3>
              <RadioGroup
                defaultValue="efectivo"
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange("paymentMethod", value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transferencia" id="p1" />
                  <Label htmlFor="p1">Transferencia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="efectivo" id="p2" />
                  <Label htmlFor="p2">Efectivo</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg text-zinc-900">Método de Entrega</h3>
              <RadioGroup
                defaultValue="retiro"
                value={formData.deliveryMethod}
                onValueChange={(value) => handleChange("deliveryMethod", value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retiro" id="d1" />
                  <Label htmlFor="d1">Retiro en local: Av. San Martín 1234, Ciudad, Mendoza</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="envio" id="d2" />
                  <Label htmlFor="d2">Envío a domicilio (consultar costo)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg text-zinc-900">Información Adicional</h3>
              <Textarea
                placeholder="Escribe cualquier información adicional aquí..."
                className="bg-white border-zinc-200"
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
              />
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg mb-2 text-zinc-900">Horario</h3>
              <p className="text-sm text-zinc-600">L a V: 8 a 18 hs</p>
              <p className="text-sm text-zinc-600">S: 8 a 13 hs</p>
            </div>

            <Button type="submit" className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white">
              <ShoppingBag className="mr-2 h-4 w-4" /> Finalizar Pedido por WhatsApp
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-zinc-300 mb-4" />
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-zinc-600 mb-6">Agrega productos de nuestro catálogo para realizar tu pedido</p>
            <Link href="/">
              <Button className="bg-[#e63946] hover:bg-[#d62b39] text-white">Ver Categorías</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

