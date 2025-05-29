"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Save, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Sample product data - this would come from your database in a real implementation
const products = [
  {
    id: 1,
    name: "Tortillas de Maíz",
    category: "Alimentos",
    price: 3.99,
    description: "Tortillas de maíz tradicionales, perfectas para tacos y enchiladas.",
    image: "/placeholder.svg?height=200&width=200",
    stock: 150,
  },
  {
    id: 2,
    name: "Frijoles Negros",
    category: "Alimentos",
    price: 2.49,
    description: "Frijoles negros de alta calidad, importados directamente de México.",
    image: "/placeholder.svg?height=200&width=200",
    stock: 200,
  },
]

// Get unique categories from products
const categories = [...new Set(products.map((product) => product.category))]

export default function EditProduct() {
  const params = useParams()
  const router = useRouter()
  const productId = Number(params.id)

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  // Fetch product data
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
    } else if (productId !== 0) {
      // If product not found and not creating new product, redirect to products page
      router.push("/admin/products")
    }

    setIsLoading(false)
  }, [productId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setProduct((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to update the product
    console.log("Product saved:", product)

    // Redirect to products page after save
    router.push("/admin/products")
  }

  const isNewProduct = productId === 0
  const title = isNewProduct ? "Añadir Nuevo Producto" : "Editar Producto"

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/admin/products">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Descripción detallada del producto"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label htmlFor="category">Categoría</Label>
              <Select value={product.category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                  <SelectItem value="nueva">+ Añadir nueva categoría</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="stock">Inventario</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={product.stock}
              onChange={handleChange}
              placeholder="Cantidad en inventario"
              required
            />
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div>
                  <Label className="mb-3 block">Imagen del Producto</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
                    {product.image ? (
                      <div className="relative h-40 w-40 mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="h-40 w-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Imagen
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Producto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
