"use client"

import { useState, useEffect } from "react"
import type { Promotion } from "@/lib/Promotion"

export function usePromotions(activeOnly = false) {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true)
        const params = activeOnly ? "?active=true" : ""
        const response = await fetch(`/api/promotions${params}`)
        if (!response.ok) throw new Error("Failed to fetch promotions")

        const data = await response.json()
        setPromotions(data.promotions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [activeOnly])

  return { promotions, loading, error }
}
