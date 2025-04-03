"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FormPage({ params }: { params: { id: string } }) {
  // Find the product by ID
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || {
    id: 0,
    name: "Producto no encontrado",
    description: "",
    price: 0,
    category: "",
  }

  // Form state
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    paymentMethod: "efectivo",
    deliveryMethod: "retiro",
    additionalInfo: "",
  })

  // Handle form changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Format WhatsApp message
  const formatWhatsAppMessage = () => {
    const message = `Pedido - DISTRIBUIDORA LEO:
${product.name} x ${quantity} = $${(product.price * quantity).toLocaleString("es-AR")}

Precio Total: $${(product.price * quantity).toLocaleString("es-AR")}

Método de Pago:
${formData.paymentMethod === "transferencia" ? "Transferencia" : "Efectivo"}

Método de Entrega:
${formData.deliveryMethod === "retiro" ? "Retiro en local" : "Envío a domicilio"}

${
  formData.additionalInfo
    ? `Información Adicional:
${formData.additionalInfo}

`
    : ""
}`

    return encodeURIComponent(message)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "5493834035119" // Número de WhatsApp actualizado
    const message = formatWhatsAppMessage()
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-14 items-center">
          <Link href={`/category/${product.category}`} className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
            <span className="font-medium text-zinc-900">Volver</span>
          </Link>
          <h1 className="flex-1 text-center font-bold text-xl text-zinc-900">Formulario de Pedido</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="container px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="font-bold text-lg text-zinc-900">{product.name}</h2>
          <p className="text-zinc-600 text-sm">{product.description}</p>
          <p className="font-bold text-[#e63946] mt-1">${product.price.toLocaleString("es-AR")}</p>

          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium mr-3">Cantidad:</span>
            <div className="flex items-center border rounded-md">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-zinc-500"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-zinc-500"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="ml-4 text-sm font-medium">
              Total:{" "}
              <span className="font-bold text-[#e63946]">${(product.price * quantity).toLocaleString("es-AR")}</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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

          <Separator />

          <div className="space-y-4">
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

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Información Adicional</h3>
            <Textarea
              placeholder="Escribe cualquier información adicional aquí..."
              className="bg-white border-zinc-200"
              value={formData.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
            />
          </div>

          <div className="bg-white rounded-lg p-4 mt-6 shadow-sm">
            <h3 className="font-medium text-lg mb-2 text-zinc-900">Horario</h3>
            <p className="text-sm text-zinc-600">L a V: 8 a 18 hs</p>
            <p className="text-sm text-zinc-600">S: 8 a 13 hs</p>
          </div>

          <Button type="submit" className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white">
            <Check className="mr-2 h-4 w-4" /> Enviar Pedido por WhatsApp
          </Button>
        </form>
      </main>
    </div>
  )
}

// Sample data
interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
}

const products: Product[] = [
  // CERVEZAS
  {
    id: 1,
    name: "Brahma 1l (12u)",
    description: "Cerveza Brahma botella de 1 litro. Caja por 12 unidades.",
    price: 26500,
    category: "cervezas",
  },
  {
    id: 2,
    name: "Miller 1l (12u)",
    description: "Cerveza Miller botella de 1 litro. Caja por 12 unidades.",
    price: 36000,
    category: "cervezas",
  },
  {
    id: 3,
    name: "Palermo 1l (12u)",
    description: "Cerveza Palermo botella de 1 litro. Caja por 12 unidades.",
    price: 22900,
    category: "cervezas",
  },
  {
    id: 4,
    name: "361 1l (6u)",
    description: "Cerveza 361 botella de 1 litro. Pack por 6 unidades.",
    price: 10000,
    category: "cervezas",
  },
  {
    id: 5,
    name: "Brahma Lata 473cc (24u min 12u)",
    description: "Cerveza Brahma lata de 473cc. Caja por 24 unidades, mínimo 12 unidades.",
    price: 26900,
    category: "cervezas",
  },
  {
    id: 6,
    name: "Miller laton 710cc (6u)",
    description: "Cerveza Miller lata grande de 710cc. Pack por 6 unidades.",
    price: 16250,
    category: "cervezas",
  },
  {
    id: 7,
    name: "Heineken Laton 710cc (6u)",
    description: "Cerveza Heineken lata grande de 710cc. Pack por 6 unidades.",
    price: 18750,
    category: "cervezas",
  },
  {
    id: 8,
    name: "Schneider Laton 710cc (24u min 12u)",
    description: "Cerveza Schneider lata grande de 710cc. Caja por 24 unidades, mínimo 12 unidades.",
    price: 51990,
    category: "cervezas",
  },
  {
    id: 9,
    name: "Corona 710cc (12u)",
    description: "Cerveza Corona botella de 710cc. Caja por 12 unidades.",
    price: 34900,
    category: "cervezas",
  },

  // GASEOSAS
  {
    id: 10,
    name: "Coca 1lt vidrio (12u)",
    description: "Coca-Cola botella de vidrio retornable de 1 litro. Caja por 12 unidades.",
    price: 22600,
    category: "gaseosas",
  },
  {
    id: 11,
    name: "Coca 2lt reto (9u)",
    description: "Coca-Cola botella retornable de 2 litros. Pack por 9 unidades.",
    price: 20500,
    category: "gaseosas",
  },
  {
    id: 12,
    name: "Coca 2,5l desc (6u)",
    description: "Coca-Cola botella descartable de 2,5 litros. Pack por 6 unidades.",
    price: 17000,
    category: "gaseosas",
  },
  {
    id: 13,
    name: "Sprite 2,25l desc (8u)",
    description: "Sprite botella descartable de 2,25 litros. Pack por 8 unidades.",
    price: 22600,
    category: "gaseosas",
  },
  {
    id: 14,
    name: "Pepsi 2l (8u)",
    description: "Pepsi botella de 2 litros. Pack por 8 unidades.",
    price: 14500,
    category: "gaseosas",
  },
  {
    id: 15,
    name: "7up 2l (8u)",
    description: "7up botella de 2 litros. Pack por 8 unidades.",
    price: 14500,
    category: "gaseosas",
  },
  {
    id: 16,
    name: "7up desc 2,25u (8u)",
    description: "7up botella descartable de 2,25 litros. Pack por 8 unidades.",
    price: 15500,
    category: "gaseosas",
  },
  {
    id: 17,
    name: "Manaos 2,25lt (6u)",
    description:
      "Manaos botella de 2,25 litros. Sabores: cola, naranja, lima, pomelo, tónica, manzana. Pack por 6 unidades.",
    price: 6290,
    category: "gaseosas",
  },

  // SABORIZADAS Y JUGOS
  {
    id: 18,
    name: "Placer Sab 1,5lt (6u)",
    description: "Agua saborizada Placer de 1,5 litros. Sabores: ananá, pera, pomelo. Pack por 6 unidades.",
    price: 4900,
    category: "saborizadas-jugos",
  },
  {
    id: 19,
    name: "Placer Sab 500ml (12u)",
    description: "Agua saborizada Placer de 500ml. Sabores: pera, ananá, pomelo. Pack por 12 unidades.",
    price: 4899,
    category: "saborizadas-jugos",
  },
  {
    id: 20,
    name: "Baggio Jugo 200ml (18u)",
    description: "Jugo Baggio de 200ml sabor multifruta. Pack por 18 unidades.",
    price: 5990,
    category: "saborizadas-jugos",
  },
  {
    id: 21,
    name: "Baggio Jugo 1l (8u)",
    description: "Jugo Baggio de 1 litro sabor multifruta. Pack por 8 unidades.",
    price: 10000,
    category: "saborizadas-jugos",
  },
  {
    id: 22,
    name: "Rinde Dos (10u)",
    description: "Jugo concentrado Rinde Dos. Pack por 10 unidades.",
    price: 359,
    category: "saborizadas-jugos",
  },
  {
    id: 23,
    name: "Clight (20u)",
    description: "Jugo en polvo Clight. Pack por 20 unidades.",
    price: 220,
    category: "saborizadas-jugos",
  },

  // AGUAS Y SODAS
  {
    id: 24,
    name: "Soda Manaos 2l (6u)",
    description: "Soda Manaos botella de 2 litros. Pack por 6 unidades.",
    price: 6790,
    category: "aguas-sodas",
  },
  {
    id: 25,
    name: "Agua Bidón 10l (min 5u)",
    description: "Bidón de agua de 10 litros. Mínimo 5 unidades.",
    price: 1690,
    category: "aguas-sodas",
  },
  {
    id: 26,
    name: "Agua Villamanaos 2l (6u)",
    description: "Agua Villamanaos botella de 2 litros. Pack por 6 unidades.",
    price: 3900,
    category: "aguas-sodas",
  },
  {
    id: 27,
    name: "Agua Villamanaos 600ml (12u)",
    description: "Agua Villamanaos botella de 600ml. Pack por 12 unidades.",
    price: 3900,
    category: "aguas-sodas",
  },

  // APERITIVOS
  {
    id: 28,
    name: "Ananá Fizz Fiesta 1l (6u)",
    description: "Aperitivo Ananá Fizz Fiesta botella de 1 litro. Pack por 6 unidades.",
    price: 4000,
    category: "aperitivos",
  },
  {
    id: 29,
    name: "Clerico Fizz Fiesta 1l (6u)",
    description: "Aperitivo Clerico Fizz Fiesta botella de 1 litro. Pack por 6 unidades.",
    price: 4000,
    category: "aperitivos",
  },
  {
    id: 30,
    name: "Sidra Real 750cc (6u)",
    description: "Sidra Real botella de 750cc. Pack por 6 unidades.",
    price: 10490,
    category: "aperitivos",
  },
  {
    id: 31,
    name: "Fernando Forte 1l (6u)",
    description: "Aperitivo Fernando Forte botella de 1 litro. Pack por 6 unidades.",
    price: 4800,
    category: "aperitivos",
  },

  // ESPUMANTES Y WHISKY
  {
    id: 32,
    name: "Petacas Borsa (20u min 10u)",
    description: "Petacas de whisky Borsa. Pack por 20 unidades, mínimo 10 unidades.",
    price: 990,
    category: "espumantes-whisky",
  },
  {
    id: 33,
    name: "Licor Cusenier 700ml (6u)",
    description: "Licor Cusenier botella de 700ml. Sabores: chocolate, café al cognac. Pack por 6 unidades.",
    price: 4000,
    category: "espumantes-whisky",
  },

  // ENERGIZANTES
  {
    id: 34,
    name: "RedBull 450ml (24u min12u)",
    description: "Energizante RedBull lata de 450ml sabor sandía. Pack por 24 unidades, mínimo 12 unidades.",
    price: 990,
    category: "energizantes",
  },
  {
    id: 35,
    name: "Speed 473ml (12u min 6u)",
    description: "Energizante Speed lata de 473ml. Pack por 12 unidades, mínimo 6 unidades.",
    price: 1750,
    category: "energizantes",
  },
  {
    id: 36,
    name: "Speed Zero 473ml (12u min 6u)",
    description: "Energizante Speed Zero lata de 473ml. Pack por 12 unidades, mínimo 6 unidades.",
    price: 1750,
    category: "energizantes",
  },
  {
    id: 37,
    name: "Speed 250ml (24u min 12u)",
    description: "Energizante Speed lata de 250ml. Pack por 24 unidades, mínimo 12 unidades.",
    price: 1089,
    category: "energizantes",
  },
  {
    id: 38,
    name: "Monster 500cc (6u)",
    description: "Energizante Monster lata de 500cc. Pack por 6 unidades.",
    price: 10500,
    category: "energizantes",
  },

  // VINOS
  {
    id: 39,
    name: "Viñas de Balbo 1,25l (6u)",
    description: "Vino Viñas de Balbo botella de 1,25 litros. Pack por 6 unidades.",
    price: 13500,
    category: "vinos",
  },
  {
    id: 40,
    name: "Viñas de Alvear 1,25l (6u)",
    description: "Vino Viñas de Alvear botella de 1,25 litros. Pack por 6 unidades.",
    price: 13500,
    category: "vinos",
  },
  {
    id: 41,
    name: "Termidor Tinto 1l (12u)",
    description: "Vino Termidor Tinto botella de 1 litro. Pack por 12 unidades.",
    price: 19000,
    category: "vinos",
  },
  {
    id: 42,
    name: "Pico Oro Bco Dulce 1l (12u)",
    description: "Vino Pico Oro Blanco Dulce botella de 1 litro. Pack por 12 unidades.",
    price: 16000,
    category: "vinos",
  },
  {
    id: 43,
    name: "Uvita Tinto 1l (12u)",
    description: "Vino Uvita Tinto botella de 1 litro. Pack por 12 unidades.",
    price: 16500,
    category: "vinos",
  },

  // YERBAS
  {
    id: 44,
    name: "Marolio 250gr (10u)",
    description: "Yerba mate Marolio paquete de 250 gramos. Pack por 10 unidades.",
    price: 650,
    category: "yerbas",
  },

  // HARINA
  {
    id: 45,
    name: "Harina Doña Luisa 000 1k (10u)",
    description: "Harina Doña Luisa 000 paquete de 1 kilo. Pack por 10 unidades.",
    price: 560,
    category: "harina",
  },

  // PURE TOMATE
  {
    id: 46,
    name: "Huerta Pure Tomate 530gr (12u)",
    description: "Puré de tomate Huerta envase de 530 gramos. Pack por 12 unidades.",
    price: 649,
    category: "pure-tomate",
  },
  {
    id: 47,
    name: "Marolio Pure Tomate 530gr (12u)",
    description: "Puré de tomate Marolio envase de 530 gramos. Pack por 12 unidades.",
    price: 599,
    category: "pure-tomate",
  },
  {
    id: 48,
    name: "Molto Pure Tomate 530gr (12u)",
    description: "Puré de tomate Molto envase de 530 gramos. Pack por 12 unidades.",
    price: 650,
    category: "pure-tomate",
  },
  {
    id: 49,
    name: "Abeto Pure Tomate 950ml (8u)",
    description: "Puré de tomate Abeto envase de 950ml. Pack por 8 unidades.",
    price: 1250,
    category: "pure-tomate",
  },
  {
    id: 50,
    name: "Big C Pure Tomate 200ml (18u)",
    description: "Puré de tomate Big C envase de 200ml. Pack por 18 unidades.",
    price: 299,
    category: "pure-tomate",
  },
  {
    id: 51,
    name: "Marolio Pulpa Tomate 530gr (12u)",
    description: "Pulpa de tomate Marolio envase de 530 gramos. Pack por 12 unidades.",
    price: 469,
    category: "pure-tomate",
  },
  {
    id: 52,
    name: "Mora Tomate Lata 400gr (12u)",
    description: "Tomate Mora lata de 400 gramos. Pack por 12 unidades.",
    price: 650,
    category: "pure-tomate",
  },

  // ARROZ
  {
    id: 53,
    name: "Arroz Carogran 1k (10u)",
    description: "Arroz Carogran paquete de 1 kilo. Pack por 10 unidades.",
    price: 1050,
    category: "arroz",
  },
  {
    id: 54,
    name: "Arroz Ala 500g (10u)",
    description: "Arroz Ala paquete de 500 gramos. Pack por 10 unidades.",
    price: 659,
    category: "arroz",
  },

  // FIDEOS
  {
    id: 55,
    name: "Santa Isabel (12u)",
    description: "Fideos Santa Isabel. Variedades: tirabuzón, codito, mostachol. Pack por 12 unidades.",
    price: 559,
    category: "fideos",
  },
  {
    id: 56,
    name: "Lucchetti (15u)",
    description: "Fideos Lucchetti. Variedades: mostachol, codito, rigatti. Pack por 15 unidades.",
    price: 950,
    category: "fideos",
  },
  {
    id: 57,
    name: "Marolio (12u)",
    description: "Fideos Marolio. Variedades: codito, celentano. Pack por 12 unidades.",
    price: 690,
    category: "fideos",
  },

  // PANIFICADOS
  {
    id: 58,
    name: "Pan Lacteado Familiar (min 3u)",
    description: "Pan lacteado familiar El Remanso. Mínimo 3 unidades.",
    price: 1290,
    category: "panificados",
  },
  {
    id: 59,
    name: "Pan Salvado Familiar (min 3u)",
    description: "Pan de salvado familiar El Remanso. Mínimo 3 unidades.",
    price: 1290,
    category: "panificados",
  },
  {
    id: 60,
    name: "Pan Mix Semillas 400gr (x unid)",
    description: "Pan mix de semillas El Remanso de 400 gramos. Precio por unidad.",
    price: 1290,
    category: "panificados",
  },
  {
    id: 61,
    name: "Pan Hamburguesas x4 (min 3u)",
    description: "Pan para hamburguesas El Remanso x4 unidades. Mínimo 3 paquetes.",
    price: 890,
    category: "panificados",
  },
  {
    id: 62,
    name: "Pan Panchos x6 (min 3u)",
    description: "Pan para panchos El Remanso x6 unidades. Mínimo 3 paquetes.",
    price: 890,
    category: "panificados",
  },

  // GALLETITAS
  {
    id: 63,
    name: "Don Satur grasa (30u)",
    description: "Galletitas Don Satur de grasa. Pack por 30 unidades.",
    price: 679,
    category: "galletitas",
  },
  {
    id: 64,
    name: "Pitusas (30u)",
    description: "Galletitas Pitusas. Pack por 30 unidades.",
    price: 699,
    category: "galletitas",
  },
  {
    id: 65,
    name: "Pitusas surtidas (30u)",
    description: "Galletitas Pitusas surtidas. Sabores: chocolate, mousse. Pack por 30 unidades.",
    price: 730,
    category: "galletitas",
  },
  {
    id: 66,
    name: "Parnor (30u)",
    description: "Galletitas Parnor. Pack por 30 unidades.",
    price: 639,
    category: "galletitas",
  },
  {
    id: 67,
    name: "Parnor surtidas (30u)",
    description: "Galletitas Parnor surtidas. Variedades: minichips, marmoladas, morochitas. Pack por 30 unidades.",
    price: 699,
    category: "galletitas",
  },

  // SNACKS Y GOLOSINAS
  {
    id: 68,
    name: "Lays 17gr (min 10u)",
    description: "Papas fritas Lays de 17 gramos. Mínimo 10 unidades.",
    price: 590,
    category: "snacks-golosinas",
  },
  {
    id: 69,
    name: "Doritos 77gr (min 10u)",
    description: "Doritos de 77 gramos. Mínimo 10 unidades.",
    price: 1799,
    category: "snacks-golosinas",
  },
  {
    id: 70,
    name: "Rueditas 40gr (min 10u)",
    description: "Snack Rueditas de 40 gramos. Mínimo 10 unidades.",
    price: 990,
    category: "snacks-golosinas",
  },
  {
    id: 71,
    name: "Rueditas 120gr (min 10u)",
    description: "Snack Rueditas de 120 gramos. Mínimo 10 unidades.",
    price: 2200,
    category: "snacks-golosinas",
  },
  {
    id: 72,
    name: "Ramitas Pep 84gr (min 10u)",
    description: "Snack Ramitas Pehuamar de 84 gramos. Mínimo 10 unidades.",
    price: 1200,
    category: "snacks-golosinas",
  },
  {
    id: 73,
    name: "Palitos Pehuamar 165gr (min 10u)",
    description: "Palitos Pehuamar de 165 gramos. Mínimo 10 unidades.",
    price: 1800,
    category: "snacks-golosinas",
  },
  {
    id: 74,
    name: "Papas Clasicas Nikitos 65gr (min 10u)",
    description: "Papas fritas clásicas Nikitos de 65 gramos. Mínimo 10 unidades.",
    price: 750,
    category: "snacks-golosinas",
  },
  {
    id: 75,
    name: "Papas Cheddar Nikitos 65gr (min 10u)",
    description: "Papas fritas sabor cheddar Nikitos de 65 gramos. Mínimo 10 unidades.",
    price: 865,
    category: "snacks-golosinas",
  },
  {
    id: 76,
    name: "Papas Jamon Serrano Nikitos 65gr (min 10u)",
    description: "Papas fritas sabor jamón serrano Nikitos de 65 gramos. Mínimo 10 unidades.",
    price: 865,
    category: "snacks-golosinas",
  },
  {
    id: 77,
    name: "Puflitos Nikitos 80gr (min 10u)",
    description: "Puflitos Nikitos de 80 gramos. Mínimo 10 unidades.",
    price: 500,
    category: "snacks-golosinas",
  },
  {
    id: 78,
    name: "Pizzitos Nikitos 80gr (min 10u)",
    description: "Pizzitos Nikitos de 80 gramos. Mínimo 10 unidades.",
    price: 500,
    category: "snacks-golosinas",
  },
  {
    id: 79,
    name: "Chizzitos Nikitos 80gr (min 10u)",
    description: "Chizzitos Nikitos de 80 gramos. Mínimo 10 unidades.",
    price: 500,
    category: "snacks-golosinas",
  },
  {
    id: 80,
    name: "Tutucas Nikitos 80gr (min 10u)",
    description: "Tutucas Nikitos de 80 gramos. Mínimo 10 unidades.",
    price: 540,
    category: "snacks-golosinas",
  },
  {
    id: 81,
    name: "Juguito Nikitos p/ Congelar (20u)",
    description: "Juguito Nikitos para congelar. Pack por 20 unidades.",
    price: 1860,
    category: "snacks-golosinas",
  },
  {
    id: 82,
    name: "Juguito Nikitos p/ Congelar (60u)",
    description: "Juguito Nikitos para congelar. Pack por 60 unidades.",
    price: 1760,
    category: "snacks-golosinas",
  },
  {
    id: 83,
    name: "Krukers 4H 120gr (min 20u)",
    description: "Galletitas Krukers 4H de 120 gramos. Sabores: queso, clásicas, jamón, pizza. Mínimo 20 unidades.",
    price: 450,
    category: "snacks-golosinas",
  },

  // PAPELES
  {
    id: 84,
    name: "Papel Higiénico Unitario 30m (30u)",
    description: "Papel higiénico unitario de 30 metros. Pack por 30 unidades.",
    price: 119,
    category: "papeles",
  },
  {
    id: 85,
    name: "Rollo Cocina Duplex x3 (10u)",
    description: "Rollo de cocina dúplex x3 unidades. Pack por 10 unidades.",
    price: 990,
    category: "papeles",
  },

  // LIMPIEZA Y PERFUMERIA
  {
    id: 86,
    name: "Aktiol Crema Repelente 200gr (min 3u)",
    description: "Crema repelente Aktiol de 200 gramos. Mínimo 3 unidades.",
    price: 4500,
    category: "limpieza-perfumeria",
  },
  {
    id: 87,
    name: "Detergente Val 750ml (12u)",
    description: "Detergente Val de 750ml. Fragancias: marina, limón, aloe vera, glicerina. Pack por 12 unidades.",
    price: 799,
    category: "limpieza-perfumeria",
  },
  {
    id: 88,
    name: "Lavandina Val 2l (8u)",
    description: "Lavandina Val de 2 litros. Pack por 8 unidades.",
    price: 890,
    category: "limpieza-perfumeria",
  },
  {
    id: 89,
    name: "Limpiador Piso Val 900ml (12u)",
    description: "Limpiador de pisos Val de 900ml. Fragancias: cherry, lavanda, pino. Pack por 12 unidades.",
    price: 550,
    category: "limpieza-perfumeria",
  },
  {
    id: 90,
    name: "Bolsas Consorcio 80x110 (20u)",
    description: "Bolsas de consorcio 80x110. Pack por 20 unidades.",
    price: 200,
    category: "limpieza-perfumeria",
  },
  {
    id: 91,
    name: "Bolsas Consorcio 80x110 (100u)",
    description: "Bolsas de consorcio 80x110. Pack por 100 unidades.",
    price: 180,
    category: "limpieza-perfumeria",
  },

  // OTROS
  {
    id: 92,
    name: "Azucar 1k (10u)",
    description: "Azúcar paquete de 1 kilo. Pack por 10 unidades.",
    price: 740,
    category: "otros",
  },
  {
    id: 93,
    name: "Leche Serenisima 1l (min 10u)",
    description: "Leche La Serenísima de 1 litro. Mínimo 10 unidades.",
    price: 1400,
    category: "otros",
  },
  {
    id: 94,
    name: "Dulce Leche Serenisima Clasico 400gr (12u)",
    description: "Dulce de leche La Serenísima Clásico de 400 gramos. Pack por 12 unidades.",
    price: 2050,
    category: "otros",
  },
  {
    id: 95,
    name: "Sal Fina Doña Sal 500gr (24u)",
    description: "Sal fina Doña Sal de 500 gramos. Pack por 24 unidades.",
    price: 399,
    category: "otros",
  },
  {
    id: 96,
    name: "Mayonesa Natura 125gr (20u)",
    description: "Mayonesa Natura de 125 gramos. Pack por 20 unidades.",
    price: 489,
    category: "otros",
  },
  {
    id: 97,
    name: "Durazno Comai Lata (12u)",
    description: "Durazno Comai en lata. Pack por 12 unidades.",
    price: 1290,
    category: "otros",
  },
  {
    id: 98,
    name: "Mermelada HorVinDul Pote (12u)",
    description: "Mermelada HorVinDul en pote. Sabores: durazno, frutilla, damasco, ciruela. Pack por 12 unidades.",
    price: 750,
    category: "otros",
  },
  {
    id: 99,
    name: "Carbon 5k rinde 10 (min 5u)",
    description: "Carbón de 5 kilos, rinde 10. Mínimo 5 unidades.",
    price: 3000,
    category: "otros",
  },

  // ELECTRODOMESTICOS
  {
    id: 100,
    name: "Estufa electrica 2 velas vertical",
    description: "Estufa eléctrica de 2 velas vertical.",
    price: 14500,
    category: "electrodomesticos",
  },
]

