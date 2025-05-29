import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Filter, Search, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Mexican-themed product data
const products = [
  {
    id: 1,
    name: "Tortillas de Maíz Artesanales",
    category: "Tortillería",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
  {
    id: 2,
    name: "Frijoles Negros de Olla",
    category: "Granos y Legumbres",
    price: 2.49,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 3,
    name: "Salsa Habanera Casera",
    category: "Salsas y Condimentos",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
  {
    id: 4,
    name: "Queso Fresco Oaxaca",
    category: "Lácteos",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 5,
    name: "Aguacates Hass Premium",
    category: "Frutas y Verduras",
    price: 1.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
  {
    id: 6,
    name: "Mangos Manila Dulces",
    category: "Frutas y Verduras",
    price: 2.29,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 7,
    name: "Café de Chiapas Orgánico",
    category: "Bebidas",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
  {
    id: 8,
    name: "Arroz Blanco Premium",
    category: "Granos y Legumbres",
    price: 3.49,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 9,
    name: "Masa Harina para Tamales",
    category: "Harinas y Masas",
    price: 4.29,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
  {
    id: 10,
    name: "Chocolate Abuelita",
    category: "Dulces y Postres",
    price: 3.79,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 11,
    name: "Chiles Jalapeños en Escabeche",
    category: "Salsas y Condimentos",
    price: 2.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: false,
  },
  {
    id: 12,
    name: "Horchata de Arroz Natural",
    category: "Bebidas",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    popular: true,
  },
];

// Get unique categories from products
const categories = [...new Set(products.map((product) => product.category))];

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-1/3" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function ProductsList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden border-2 border-gray-200 hover:border-fiesta-orange transition-all duration-300 hover:shadow-lg group"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.popular && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-mexican-red text-white border-0 shadow-lg">
                  <Star className="h-3 w-3 mr-1" fill="currentColor" />
                  Popular
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 font-fiesta group-hover:text-fiesta-orange transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block font-mexican">
              {product.category}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <p className="font-bold text-xl text-mexican-green">
              ${product.price.toFixed(2)}
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white font-bold"
            >
              Ver Detalles
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mr-2 hover:bg-fiesta-orange/20"
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold font-fiesta text-gray-800">
              Nuestros Productos
            </h1>
            <p className="text-lg text-gray-600 font-mexican">
              Los mejores sabores de México
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar productos mexicanos..."
              className="pl-10 border-2 border-gray-200 focus:border-fiesta-orange"
            />
          </div>

          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[200px] border-2 border-gray-200 focus:border-fiesta-orange">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px] border-2 border-gray-200 focus:border-fiesta-orange">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                <SelectItem value="price-asc">
                  Precio (Menor a Mayor)
                </SelectItem>
                <SelectItem value="price-desc">
                  Precio (Mayor a Menor)
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="border-2 border-fiesta-orange text-fiesta-orange hover:bg-fiesta-orange hover:text-white"
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 font-fiesta text-gray-800">
            Categorías Populares
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-2 border-fiesta-orange/30 text-fiesta-orange hover:bg-fiesta-orange hover:text-white font-mexican"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <ProductsList />
        </Suspense>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-mexican-green/10 to-mexican-red/10 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 font-fiesta text-gray-800">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-lg text-gray-600 mb-6 font-mexican">
            ¡Pregúntanos! Podemos conseguir productos especiales de México para
            ti.
          </p>
          <Button className="bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white font-bold text-lg px-8 py-3">
            Contáctanos
          </Button>
        </div>
      </div>
    </div>
  );
}
