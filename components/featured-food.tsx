"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Users, Flame, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Featured food data
const featuredFood = [
  {
    id: 1,
    name: "🌮 Tacos de Carnitas",
    description: "Tacos tradicionales con carnitas de cerdo, cebolla, cilantro y salsa verde",
    price: 12.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "15 min",
    serves: "3-4 personas",
    spiceLevel: 2,
    rating: 4.9,
    available: true,
    popular: true,
  },
  {
    id: 2,
    name: "🍲 Pozole Rojo",
    description: "Sopa tradicional mexicana con maíz pozolero, carne de cerdo y chile guajillo",
    price: 15.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "20 min",
    serves: "4-5 personas",
    spiceLevel: 3,
    rating: 4.8,
    available: true,
    popular: true,
  },
  {
    id: 3,
    name: "🫔 Enchiladas Verdes",
    description: "Tortillas rellenas de pollo bañadas en salsa verde con crema y queso fresco",
    price: 13.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "18 min",
    serves: "2-3 personas",
    spiceLevel: 2,
    rating: 4.7,
    available: true,
    popular: false,
  },
  {
    id: 4,
    name: "🌯 Burrito de Carne Asada",
    description: "Burrito gigante con carne asada, frijoles, arroz, guacamole y pico de gallo",
    price: 11.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "12 min",
    serves: "1-2 personas",
    spiceLevel: 1,
    rating: 4.6,
    available: false,
    popular: false,
  },
  {
    id: 5,
    name: "🥘 Mole Poblano",
    description: "Pollo en mole poblano tradicional con más de 20 ingredientes, arroz y tortillas",
    price: 18.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "25 min",
    serves: "3-4 personas",
    spiceLevel: 2,
    rating: 4.9,
    available: true,
    popular: true,
  },
  {
    id: 6,
    name: "🌮 Quesadillas de Flor de Calabaza",
    description: "Quesadillas artesanales con flor de calabaza, epazote y queso Oaxaca",
    price: 9.99,
    image: "/placeholder.svg?height=250&width=250",
    prepTime: "10 min",
    serves: "1-2 personas",
    spiceLevel: 1,
    rating: 4.5,
    available: true,
    popular: false,
  },
]

export default function FeaturedFood() {
  const [selectedFood, setSelectedFood] = useState<number | null>(null)

  const getSpiceIcons = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame key={i} className={`h-4 w-4 ${i < level ? "text-red-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredFood.map((food) => (
        <Card
          key={food.id}
          className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl group relative ${
            food.available ? "border-gray-200 hover:border-fiesta-orange" : "border-gray-300 opacity-75"
          }`}
        >
          {/* Popular Badge */}
          {food.popular && food.available && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-fiesta-yellow text-mexican-red border-0 shadow-lg font-bold">
                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                Popular
              </Badge>
            </div>
          )}

          {/* Availability Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge
              className={`border-0 shadow-lg font-bold ${
                food.available ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
            >
              {food.available ? "Disponible" : "Agotado"}
            </Badge>
          </div>

          <div className="relative h-48 overflow-hidden">
            <Image
              src={food.image || "/placeholder.svg"}
              alt={food.name}
              fill
              className={`object-cover transition-transform duration-300 ${
                food.available ? "group-hover:scale-110" : "grayscale"
              }`}
            />
          </div>

          <CardContent className="p-4">
            <h3
              className={`font-bold text-lg mb-2 font-fiesta transition-colors line-clamp-1 ${
                food.available ? "group-hover:text-fiesta-orange" : "text-gray-500"
              }`}
            >
              {food.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-mexican">{food.description}</p>

            {/* Food Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {food.prepTime}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {food.serves}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Picante:</span>
                  <div className="flex">{getSpiceIcons(food.spiceLevel)}</div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-fiesta-yellow fill-current mr-1" />
                  <span className="text-sm text-gray-600">{food.rating}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-mexican-green">${food.price.toFixed(2)}</span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              className={`w-full font-bold ${
                food.available
                  ? "bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!food.available}
            >
              {food.available ? "🛒 Ordenar Ahora" : "😔 No Disponible"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
