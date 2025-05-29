"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/Product"

export function useProducts(options?: { featured?: boolean; category?: string; search?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (options?.featured) params.append("featured", "true")
      if (options?.category) params.append("category", options.category)
      if (options?.search) params.append("search", options.search)

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error("Failed to fetch products")

      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [options?.featured, options?.category, options?.search])

  return { products, loading, error, refetch: () => fetchProducts() }
}
