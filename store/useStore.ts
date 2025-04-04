import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Category {
  id: number
  name: string
  image: string
  slug: string
  emoji: string
}

interface CategoryState {
  categories: Category[]
  isLoading: boolean
  error: string | null
  isInitialized: boolean
  preloadedImages: { [key: string]: boolean }
  initializeCategories: () => void
  setImagePreloaded: (imageUrl: string) => void
}

const categoryImages: { [key: string]: string } = {
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
  "yerbas": "https://images.unsplash.com/photo-1573739022854-abceaeb585dc?q=80&w=1974&auto=format&fit=crop",
  "harina": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop",
  "panificados": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
}

const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Cervezas",
    image: categoryImages["cervezas"],
    slug: "cervezas",
    emoji: "🍻",
  },
  {
    id: 2,
    name: "Gaseosas",
    image: categoryImages["gaseosas"],
    slug: "gaseosas",
    emoji: "🥤",
  },
  {
    id: 3,
    name: "Saborizadas y Jugos",
    image: categoryImages["saborizadas-jugos"],
    slug: "saborizadas-jugos",
    emoji: "🧃",
  },
  {
    id: 4,
    name: "Aguas y Sodas",
    image: categoryImages["aguas-sodas"],
    slug: "aguas-sodas",
    emoji: "🫗",
  },
  {
    id: 5,
    name: "Aperitivos",
    image: categoryImages["aperitivos"],
    slug: "aperitivos",
    emoji: "🍹",
  },
  {
    id: 6,
    name: "Espumantes y Whisky",
    image: categoryImages["espumantes-whisky"],
    slug: "espumantes-whisky",
    emoji: "🍾",
  },
  {
    id: 7,
    name: "Energizantes",
    image: categoryImages["energizantes"],
    slug: "energizantes",
    emoji: "🪫",
  },
  {
    id: 8,
    name: "Vinos",
    image: categoryImages["vinos"],
    slug: "vinos",
    emoji: "🍷",
  },
  {
    id: 9,
    name: "Yerbas",
    image: categoryImages["yerbas"],
    slug: "yerbas",
    emoji: "🧉",
  },
  {
    id: 10,
    name: "Harina",
    image: categoryImages["harina"],
    slug: "harina",
    emoji: "🥖",
  },
  {
    id: 11,
    name: "Puré de Tomate",
    image: categoryImages["pure-tomate"],
    slug: "pure-tomate",
    emoji: "🍅",
  },
  {
    id: 12,
    name: "Arroz",
    image: categoryImages["arroz"],
    slug: "arroz",
    emoji: "🍚",
  },
  {
    id: 13,
    name: "Fideos",
    image: categoryImages["fideos"],
    slug: "fideos",
    emoji: "🍝",
  },
  {
    id: 14,
    name: "Panificados",
    image: categoryImages["panificados"],
    slug: "panificados",
    emoji: "🍞",
  },
  {
    id: 15,
    name: "Galletitas",
    image: categoryImages["galletitas"],
    slug: "galletitas",
    emoji: "🍪",
  },
  {
    id: 16,
    name: "Snacks y Golosinas",
    image: categoryImages["snacks-golosinas"] || "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop",
    slug: "snacks-golosinas",
    emoji: "🥔",
  },
  {
    id: 17,
    name: "Papeles",
    image: categoryImages["papeles"],
    slug: "papeles",
    emoji: "🧻",
  },
  {
    id: 18,
    name: "Limpieza y Perfumería",
    image: categoryImages["limpieza-perfumeria"] || "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop",
    slug: "limpieza-perfumeria",
    emoji: "🧼",
  },
  {
    id: 19,
    name: "Otros",
    image: categoryImages["otros"] || "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2069&auto=format&fit=crop",
    slug: "otros",
    emoji: "💥",
  },
  {
    id: 20,
    name: "Electrodomésticos",
    image: categoryImages["electrodomesticos"],
    slug: "electrodomesticos",
    emoji: "🔌",
  },
]

// Función para precargar una imagen
const preloadImage = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject()
    img.src = imageUrl
  })
}

// Función para precargar un grupo de imágenes
const preloadImageGroup = async (images: string[], startIndex: number, batchSize: number) => {
  const endIndex = Math.min(startIndex + batchSize, images.length)
  const batch = images.slice(startIndex, endIndex)
  
  await Promise.all(batch.map(imageUrl => preloadImage(imageUrl)))
  
  if (endIndex < images.length) {
    // Precargar el siguiente grupo después de un pequeño retraso
    setTimeout(() => {
      preloadImageGroup(images, endIndex, batchSize)
    }, 100)
  }
}

export const useStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: defaultCategories,
      isLoading: false,
      error: null,
      isInitialized: true,
      preloadedImages: {},
      setImagePreloaded: (imageUrl: string) => {
        set(state => ({
          preloadedImages: { ...state.preloadedImages, [imageUrl]: true }
        }))
      },
      initializeCategories: () => {
        if (get().isInitialized) return

        set({ isLoading: true, error: null })
        
        try {
          // Establecer las categorías inmediatamente
          set({ 
            categories: defaultCategories,
            isLoading: false,
            isInitialized: true
          })
          
          // Iniciar la precarga de imágenes en grupos de 5
          const allImages = defaultCategories.map(category => category.image)
          preloadImageGroup(allImages, 0, 5)
          
        } catch (error) {
          set({ 
            error: 'Error al cargar las categorías', 
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'category-storage',
      partialize: (state) => ({ 
        categories: state.categories,
        isInitialized: state.isInitialized,
        preloadedImages: state.preloadedImages
      }),
    }
  )
) 