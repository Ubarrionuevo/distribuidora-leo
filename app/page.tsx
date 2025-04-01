"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Search, X, Clock, MapPin, Phone, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CartButton } from "@/components/cart-button"
import { FloatingCartButton } from "@/components/floating-cart-button"

interface SearchResult {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setShowResults(false)
      return
    }

    // Search through all categories and products
    const query = searchQuery.toLowerCase()
    const matchingCategories = categories.filter((category) => category.name.toLowerCase().includes(query))

    if (matchingCategories.length > 0) {
      // If we find a matching category, navigate to it
      router.push(`/category/${matchingCategories[0].slug}`)
      setIsSearchOpen(false)
      setSearchQuery("")
      return
    }

    // If no categories match, we could implement product search here
    // For now, just close the search
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white pb-20">
      {/* Header */}
      <header className="w-full border-b bg-white text-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
          {/* Mobile Menu - Only visible on mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900 -ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white p-0">
                <SheetHeader className="p-4 pb-2">
                  <SheetTitle>Menú Principal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4">
                  <Link href="/" className="py-2 text-zinc-600 hover:text-zinc-900 transition-colors">
                    Inicio
                  </Link>
                  <Link href="/cart" className="py-2 text-zinc-600 hover:text-zinc-900 transition-colors">
                    Mi Carrito
                  </Link>
                  <Link href="#" className="py-2 text-zinc-600 hover:text-zinc-900 transition-colors">
                    Mis Pedidos
                  </Link>
                  <Link href="#" className="py-2 text-zinc-600 hover:text-zinc-900 transition-colors">
                    Contacto
                  </Link>

                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-[#e63946] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Ubicación</h3>
                        <p className="text-sm text-zinc-600 mb-1">Av. San Martín 1234, Ciudad</p>
                        <p className="text-sm text-zinc-600">Mendoza, Argentina</p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <Clock className="h-5 w-5 text-[#e63946] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Horarios de Atención</h3>
                        <p className="text-sm text-zinc-600">Lunes a Viernes: 8 a 18 hs</p>
                        <p className="text-sm text-zinc-600">Sábados: 8 a 13 hs</p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <Phone className="h-5 w-5 text-[#e63946] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Contacto</h3>
                        <p className="text-sm text-zinc-600">Tel: (261) 123-4567</p>
                        <p className="text-sm text-zinc-600">info@distribuidoraleo.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <a
                      href="https://1minuto.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 px-4 bg-[#e63946] hover:bg-[#d62b39] text-white text-center font-medium rounded-md transition-colors"
                    >
                      <span className="mr-2">Quiero una tienda como esta para mi negocio</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <div className="flex items-center whitespace-nowrap">
                <span className="font-bold text-lg sm:text-xl text-[#e63946]">DISTRIBUIDORA</span>
                <span className="font-bold text-lg sm:text-xl text-zinc-900 ml-1">LEO</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Only visible on desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              Inicio
            </Link>
            <Link href="/cart" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              Mi Carrito
            </Link>
            <Link href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              Mis Pedidos
            </Link>
            <Link href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-1">
            {isSearchOpen ? (
              <div className="relative flex items-center" ref={searchRef}>
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="h-8 w-[180px] rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-zinc-400 hover:text-zinc-900 h-8 w-8"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-900 h-8 w-8"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            )}
            <CartButton />
          </div>
        </div>
      </header>

      {/* Status Banner */}
      <Dialog open={isHoursModalOpen} onOpenChange={setIsHoursModalOpen}>
        <DialogTrigger asChild>
          <div className="bg-red-50 text-red-900 cursor-pointer hover:bg-red-100 transition-colors">
            <div className="container py-2 px-4 flex items-center justify-center text-center">
              <Clock className="h-4 w-4 flex-shrink-0 mr-2" />
              <div>
                <p className="font-medium">Lista de precios actualizada: 20/03/25</p>
                <p className="text-sm">Hacé click para consultar nuestros horarios</p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Horarios de Atención</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-red-50 p-3 rounded-md">
                <h3 className="font-medium text-zinc-900">Lunes a Viernes</h3>
                <p className="text-zinc-600">8:00 a 18:00 hs</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md">
                <h3 className="font-medium text-zinc-900">Sábados</h3>
                <p className="text-zinc-600">8:00 a 13:00 hs</p>
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-md text-center">
              <h3 className="font-medium text-zinc-900">Domingos y Feriados</h3>
              <p className="text-zinc-600">Cerrado</p>
            </div>
            <div className="pt-2 text-center text-sm text-zinc-500">
              Para consultas fuera de horario, puede enviarnos un mensaje por WhatsApp al (261) 123-4567
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Buscar Productos</DialogTitle>
          </DialogHeader>
          <div className="relative" ref={searchRef}>
            <input
              type="search"
              placeholder="Buscar..."
              className="h-8 w-[180px] rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 text-zinc-400 hover:text-zinc-900 h-8 w-8"
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1 bg-zinc-50">
        {/* Categories */}
        <section className="py-6">
          <div className="container px-4 flex justify-center">
            <div className="w-full max-w-6xl">
              <h2 className="text-xl font-bold mb-4 text-zinc-900 text-center">Categorías</h2>
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingCartButton />
    </div>
  )
}

interface Category {
  id: number
  name: string
  image: string
  slug: string
  emoji: string
}

const categories: Category[] = [
  {
    id: 1,
    name: "Cervezas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "cervezas",
    emoji: "🍻",
  },
  {
    id: 2,
    name: "Gaseosas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "gaseosas",
    emoji: "🥤",
  },
  {
    id: 3,
    name: "Saborizadas y Jugos",
    image: "/placeholder.svg?height=400&width=600",
    slug: "saborizadas-jugos",
    emoji: "🧃",
  },
  {
    id: 4,
    name: "Aguas y Sodas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "aguas-sodas",
    emoji: "🫗",
  },
  {
    id: 5,
    name: "Aperitivos",
    image: "/placeholder.svg?height=400&width=600",
    slug: "aperitivos",
    emoji: "🍹",
  },
  {
    id: 6,
    name: "Espumantes y Whisky",
    image: "/placeholder.svg?height=400&width=600",
    slug: "espumantes-whisky",
    emoji: "🍾",
  },
  {
    id: 7,
    name: "Energizantes",
    image: "/placeholder.svg?height=400&width=600",
    slug: "energizantes",
    emoji: "🪫",
  },
  {
    id: 8,
    name: "Vinos",
    image: "/placeholder.svg?height=400&width=600",
    slug: "vinos",
    emoji: "🍷",
  },
  {
    id: 9,
    name: "Yerbas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "yerbas",
    emoji: "🧉",
  },
  {
    id: 10,
    name: "Harina",
    image: "/placeholder.svg?height=400&width=600",
    slug: "harina",
    emoji: "🥖",
  },
  {
    id: 11,
    name: "Puré de Tomate",
    image: "/placeholder.svg?height=400&width=600",
    slug: "pure-tomate",
    emoji: "🍅",
  },
  {
    id: 12,
    name: "Arroz",
    image: "/placeholder.svg?height=400&width=600",
    slug: "arroz",
    emoji: "🍚",
  },
  {
    id: 13,
    name: "Fideos",
    image: "/placeholder.svg?height=400&width=600",
    slug: "fideos",
    emoji: "🍝",
  },
  {
    id: 14,
    name: "Panificados",
    image: "/placeholder.svg?height=400&width=600",
    slug: "panificados",
    emoji: "🍞",
  },
  {
    id: 15,
    name: "Galletitas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "galletitas",
    emoji: "🍪",
  },
  {
    id: 16,
    name: "Snacks y Golosinas",
    image: "/placeholder.svg?height=400&width=600",
    slug: "snacks-golosinas",
    emoji: "🥔",
  },
  {
    id: 17,
    name: "Papeles",
    image: "/placeholder.svg?height=400&width=600",
    slug: "papeles",
    emoji: "🧻",
  },
  {
    id: 18,
    name: "Limpieza y Perfumería",
    image: "/placeholder.svg?height=400&width=600",
    slug: "limpieza-perfumeria",
    emoji: "🧼",
  },
  {
    id: 19,
    name: "Otros",
    image: "/placeholder.svg?height=400&width=600",
    slug: "otros",
    emoji: "💥",
  },
  {
    id: 20,
    name: "Electrodomésticos",
    image: "/placeholder.svg?height=400&width=600",
    slug: "electrodomesticos",
    emoji: "🔌",
  },
]

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full h-[120px] lg:h-[200px]"
    >
      <div className="absolute inset-0">
        {category.slug === "cervezas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "gaseosas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1974&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "saborizadas-jugos" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2187&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "aguas-sodas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=2070&auto=format&fit=crop')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "aperitivos" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1598373187432-c1ff06874ce8?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "espumantes-whisky" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "energizantes" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "vinos" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1974&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "pure-tomate" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=2067&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "arroz" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "fideos" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?q=80&w=1974&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "panificados" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "galletitas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1999&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "snacks-golosinas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "papeles" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1584556812952-905ffd0c611a?q=80&w=2070&auto=format&fit=crop')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "limpieza-perfumeria" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "electrodomesticos" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1964&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "otros" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2069&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "yerbas" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1573739022854-abceaeb585dc?q=80&w=1974&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : category.slug === "harina" ? (
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        )}
      </div>
      <div className="relative h-full p-4 lg:p-6 flex flex-col justify-between">
        <h3 className="text-lg lg:text-xl font-medium text-white flex items-center">
          <span className="mr-2 text-xl lg:text-3xl">{category.emoji}</span> {category.name}
        </h3>
        <div className="flex justify-end">
          <div className="bg-[#e63946] text-white text-sm px-3 py-1 lg:px-4 lg:py-2 rounded-full flex items-center gap-1 group-hover:bg-[#d62b39] transition-colors">
            Ver más <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

