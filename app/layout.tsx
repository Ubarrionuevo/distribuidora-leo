import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { SonnerProvider } from "@/components/sonner-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DISTRIBUIDORAA LEO - Mayorista de bebidas y alimentos",
  description: "Catálogo digital de productos mayoristas - Bebidas, alimentos, limpieza y más",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return ( 
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <SonnerProvider />
        </CartProvider>
      </body>
    </html>
  )
}

