"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Category } from "@/store/useStore"
import { Skeleton } from "@/components/ui/skeleton"
import { useStore } from "@/store/useStore"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { preloadedImages, setImagePreloaded } = useStore()

  const imageLoaded = preloadedImages[category.image] || false

  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Si la imagen aún no está precargada, cargarla ahora
            if (!imageLoaded) {
              const img = new Image()
              img.onload = () => setImagePreloaded(category.image)
              img.src = category.image
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '100px 0px', // Comenzar a cargar cuando esté a 100px de ser visible
        threshold: 0.1
      }
    )

    observer.observe(cardRef.current)

    return () => {
      observer.disconnect()
    }
  }, [category.image, imageLoaded, setImagePreloaded])

  return (
    <Link
      ref={cardRef}
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full h-[120px] lg:h-[200px]"
    >
      <div className="absolute inset-0">
        {(!imageLoaded || !isVisible) && (
          <Skeleton className="w-full h-full" />
        )}
        {isVisible && (
          <>
            <div 
              className={`w-full h-full bg-cover bg-center transition-all duration-300 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{
                backgroundImage: `url('${category.image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </>
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