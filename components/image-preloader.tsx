"use client"

import { useEffect } from "react"

const categoryImages = {
  "cervezas": "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=2070&auto=format&fit=crop",
  "gaseosas": "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1974&auto=format&fit=crop",
  "saborizadas-jugos": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2187&auto=format&fit=crop",
  "aguas-sodas": "https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=2070&auto=format&fit=crop",
  "aperitivos": "https://images.unsplash.com/photo-1598373187432-c1ff06874ce8?q=80&w=2070&auto=format&fit=crop",
  "espumantes-whisky": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=2070&auto=format&fit=crop",
  "energizantes": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
  "vinos": "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1974&auto=format&fit=crop",
  "pure-tomate": "https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=2067&auto=format&fit=crop",
  "arroz": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop",
  "fideos": "https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?q=80&w=1974&auto=format&fit=crop",
  "galletitas": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1999&auto=format&fit=crop",
  "papeles": "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?q=80&w=2070&auto=format&fit=crop",
  "electrodomesticos": "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1964&auto=format&fit=crop",
  "yerbas": "https://www.infocampo.com.ar/wp-content/uploads/2019/12/mate.jpg",
  "harina": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop",
  "panificados": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
}

export function ImagePreloader() {
  useEffect(() => {
    // Precargar todas las imágenes de categorías
    Object.values(categoryImages).forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }, [])

  return null
} 