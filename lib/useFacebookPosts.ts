"use client"

import { useState, useEffect } from "react"
import type { FacebookPost } from "@/lib/FacebookPost"

export function useFacebookPosts() {
  const [posts, setPosts] = useState<FacebookPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/facebook-posts")
        if (!response.ok) throw new Error("Failed to fetch Facebook posts")

        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
