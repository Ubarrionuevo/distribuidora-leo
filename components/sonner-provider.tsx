"use client"

import { Toaster as SonnerToaster } from "sonner"

export function SonnerProvider() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e2e8f0",
          maxWidth: "90vw",
          width: "fit-content",
        },
        className: "border border-zinc-200 rounded-lg shadow-md text-sm",
      }}
      closeButton
      richColors
      expand={false}
    />
  )
}

