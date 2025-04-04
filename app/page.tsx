"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Menu, Search, X, Clock, MapPin, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CartButton } from "@/components/cart-button"
import { FloatingCartButton } from "@/components/floating-cart-button"
import { CategoryCard } from "@/components/category-card"
import { CategorySkeletonGrid } from "@/components/category-skeleton"
import { useStore } from "@/store/useStore"

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  const { categories, isLoading, error, initializeCategories, isInitialized } = useStore()

  // Inicializar categorías solo una vez
  useEffect(() => {
    if (!isInitialized) {
      initializeCategories()
    }
  }, [initializeCategories, isInitialized])

  // Memoizar la función de búsqueda
  const handleSearch = useCallback(() => {
    if (searchQuery.trim() === "") {
      setIsSearchOpen(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const matchingCategory = categories.find((category) => 
      category.name.toLowerCase().includes(query)
    )

    if (matchingCategory) {
      router.push(`/category/${matchingCategory.slug}`)
      setIsSearchOpen(false)
      setSearchQuery("")
      return
    }

    setIsSearchOpen(false)
    setSearchQuery("")
  }, [searchQuery, categories, router])

  // Cerrar búsqueda al hacer clic fuera
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

  // Memoizar las categorías para evitar re-renders innecesarios
  const categoryCards = useMemo(() => {
    return categories.map((category) => (
      <CategoryCard key={category.id} category={category} />
    ))
  }, [categories])

  return (
    <div className="flex min-h-screen flex-col bg-white pb-20">
      {/* Header */}
      <header className="w-full border-b bg-white/80 backdrop-blur-sm text-zinc-900 fixed top-0 left-0 right-0 z-50">
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
                  <SheetTitle>Distribuidora Leo</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4">
                  <div className="mb-6">
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

      <main className="flex-1 bg-zinc-50 mt-28">
        {/* Status Banner */}
        <Dialog open={isHoursModalOpen} onOpenChange={setIsHoursModalOpen}>
          <DialogTrigger asChild>
            <div className="bg-red-50 text-red-900 cursor-pointer hover:bg-red-100 transition-colors fixed top-14 left-0 right-0 z-40">
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
                Para consultas fuera de horario, puede enviarnos un mensaje por WhatsApp al +54 9 11 3155-3407
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

        {/* Categories */}
        <section className="py-6">
          <div className="container px-4 flex justify-center">
            <div className="w-full max-w-6xl">
              <h2 className="text-xl font-bold mb-4 text-zinc-900 text-center">Categorías</h2>
              {isLoading ? (
                <CategorySkeletonGrid />
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryCards}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <FloatingCartButton />
    </div>
  )
}

