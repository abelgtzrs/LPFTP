"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/lib/useProducts"

// Featured products data
// const featuredProducts = [
//   {
//     id: 1,
//     name: "🌮 Tortillas de Maíz Artesanales",
//     price: 3.99,
//     originalPrice: 4.99,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.8,
//     reviews: 124,
//     discount: 20,
//     popular: true,
//   },
//   {
//     id: 2,
//     name: "🌶️ Salsa Habanera Casera",
//     price: 4.99,
//     originalPrice: 6.49,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.9,
//     reviews: 89,
//     discount: 23,
//     popular: true,
//   },
//   {
//     id: 3,
//     name: "🥑 Aguacates Hass Premium",
//     price: 1.99,
//     originalPrice: 2.49,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.7,
//     reviews: 156,
//     discount: 20,
//     popular: false,
//   },
//   {
//     id: 4,
//     name: "☕ Café de Chiapas Orgánico",
//     price: 8.99,
//     originalPrice: 11.99,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.9,
//     reviews: 203,
//     discount: 25,
//     popular: true,
//   },
//   {
//     id: 5,
//     name: "🧀 Queso Fresco Oaxaca",
//     price: 5.99,
//     originalPrice: 7.49,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.6,
//     reviews: 78,
//     discount: 20,
//     popular: false,
//   },
//   {
//     id: 6,
//     name: "🍫 Chocolate Abuelita",
//     price: 3.79,
//     originalPrice: 4.29,
//     image: "/placeholder.svg?height=250&width=250",
//     rating: 4.8,
//     reviews: 167,
//     discount: 12,
//     popular: true,
//   },
// ]

export default function FeaturedProducts() {
  const { products: featuredProducts, loading, error } = useProducts({ featured: true })
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <Card
          key={product._id?.toString()}
          className="overflow-hidden border-2 border-gray-200 hover:border-fiesta-orange transition-all duration-300 hover:shadow-xl group relative"
        >
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-mexican-red text-white border-0 shadow-lg font-bold">-{product.discount}%</Badge>
            </div>
          )}

          {/* Popular Badge */}
          {product.popular && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-fiesta-yellow text-mexican-red border-0 shadow-lg font-bold">
                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                Popular
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-12 right-3 z-10 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-400"}`}
            />
          </button>

          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 font-fiesta group-hover:text-fiesta-orange transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-fiesta-yellow fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-mexican-green">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button
              className="flex-1 bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white font-bold"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-fiesta-orange text-fiesta-orange hover:bg-fiesta-orange hover:text-white"
            >
              Ver
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
