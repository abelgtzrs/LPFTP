"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePromotions } from "@/lib/usePromotions"

// Sample promotion data with Mexican theme
const promotions_static = [
  {
    id: 1,
    title: "🌮 ¡Fiesta de Sabores Mexicanos!",
    image: "/placeholder.svg?height=300&width=500",
    body: "Descuentos del 20% en todos los chiles, especias y salsas picantes. ¡Dale sabor auténtico a tus platillos favoritos!",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    active: true,
  },
  {
    id: 2,
    title: "💰 Envíos a México ¡Sin Comisión!",
    image: "/placeholder.svg?height=300&width=500",
    body: "Durante todo junio, envía dinero a México sin pagar comisión en transferencias mayores a $200. ¡Ayuda más a tu familia!",
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    active: true,
  },
  {
    id: 3,
    title: "🎉 2x1 en Dulces Mexicanos",
    image: "/placeholder.svg?height=300&width=500",
    body: "Lleva 2 y paga 1 en toda nuestra selección de dulces mexicanos: mazapanes, tamarindos, chamoy y más. ¡Para toda la familia!",
    startDate: "2023-06-10",
    endDate: "2023-07-10",
    active: true,
  },
  {
    id: 4,
    title: "🥑 Productos Frescos del Día",
    image: "/placeholder.svg?height=300&width=500",
    body: "Aguacates, nopales, chiles frescos y más productos recién llegados. ¡La frescura de México en tu mesa!",
    startDate: "2023-06-05",
    endDate: "2023-08-05",
    active: true,
  },
]

export default function FeaturedPromotions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { promotions: visiblePromotions, loading, error } = usePromotions(true)

  const nextSlide = () => {
    if (!visiblePromotions || visiblePromotions.length <= 3) return
    setCurrentIndex((prevIndex) => (prevIndex === visiblePromotions.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    if (!visiblePromotions || visiblePromotions.length <= 3) return
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? visiblePromotions.length - 3 : prevIndex - 1))
  }

  // Calculate how many promotions to show based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3
  }

  const displayPromotions = () => {
    if (!visiblePromotions) return []

    const count = getVisibleCount()
    const slicedPromotions = [...visiblePromotions]

    if (visiblePromotions.length <= count) {
      return slicedPromotions
    }

    const result = []
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % visiblePromotions.length
      result.push(slicedPromotions[index])
    }
    return result
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
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
        <p className="text-red-500">Error loading promotions: {error}</p>
      </div>
    )
  }

  if (!visiblePromotions || visiblePromotions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500 mb-4">🎭 No hay promociones activas en este momento</p>
        <p className="text-gray-400">¡Pero siempre tenemos los mejores precios para ti!</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {visiblePromotions.length > getVisibleCount() && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg -ml-4 border-fiesta-orange hover:bg-fiesta-orange hover:text-white"
            onClick={prevSlide}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg -mr-4 border-fiesta-orange hover:bg-fiesta-orange hover:text-white"
            onClick={nextSlide}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPromotions().map((promotion) => (
          <Card
            key={promotion._id?.toString()}
            className="overflow-hidden border-2 border-fiesta-orange/20 hover:border-fiesta-orange transition-all duration-300 hover:shadow-xl group"
          >
            <CardHeader className="p-0 relative">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={promotion.image || "/placeholder.svg"}
                  alt={promotion.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-mexican-red text-white border-0 shadow-lg">
                    <Tag className="h-3 w-3 mr-1" />
                    ¡OFERTA!
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-xl font-fiesta text-gray-800 group-hover:text-fiesta-orange transition-colors">
                  {promotion.title}
                </CardTitle>
              </div>
              <p className="text-gray-600 mb-4 font-mexican">{promotion.body}</p>
              <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <Calendar className="h-4 w-4 mr-2 text-fiesta-orange" />
                <span className="font-medium">
                  Válido: {new Date(promotion.startDate).toLocaleDateString("es-ES")} -{" "}
                  {new Date(promotion.endDate).toLocaleDateString("es-ES")}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white font-bold shadow-lg"
              >
                <Link href={`/promotions/${promotion.id}`}>🎯 Ver Detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
