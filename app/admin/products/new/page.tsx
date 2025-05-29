"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Save, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// Categories for products
const categories = [
  "Tortillería",
  "Granos y Legumbres",
  "Salsas y Condimentos",
  "Lácteos",
  "Frutas y Verduras",
  "Bebidas",
  "Harinas y Masas",
  "Dulces y Postres",
  "Carnes y Embutidos",
  "Enlatados y Conservas",
]

export default function NewProduct() {
  const router = useRouter()

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    originalPrice: 0,
    description: "",
    image: "",
    stock: 0,
    popular: false,
    featured: false,
    discount: 0,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "originalPrice" || name === "stock" || name === "discount" ? Number(value) : value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setProduct((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setProduct((prev) => ({
          ...prev,
          image: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setProduct((prev) => ({
      ...prev,
      image: "",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to create the product
    console.log("Product created:", product)

    // Redirect to products page after save
    router.push("/admin/products")
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
        <h1 className="text-3xl font-bold font-fiesta">🆕 Añadir Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">📝 Información Básica</h3>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nombre del Producto *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="ej. 🌮 Tortillas de Maíz Artesanales"
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Descripción detallada del producto..."
                    rows={4}
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={product.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category" className="border-2 focus:border-fiesta-orange">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">💰 Precios e Inventario</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="price">Precio Actual ($) *</Label>
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
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="originalPrice">Precio Original ($)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={product.originalPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="border-2 focus:border-fiesta-orange"
                  />
                  <p className="text-xs text-gray-500">Dejar vacío si no hay descuento</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="stock">Inventario *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Cantidad disponible"
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="discount">Descuento (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">⭐ Configuraciones Especiales</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="popular">Producto Popular</Label>
                    <p className="text-sm text-gray-500">Mostrar badge de "Popular" en el producto</p>
                  </div>
                  <Switch
                    id="popular"
                    checked={product.popular}
                    onCheckedChange={(checked) => handleSwitchChange("popular", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Producto Destacado</Label>
                    <p className="text-sm text-gray-500">Mostrar en la sección de productos destacados</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={product.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">📸 Imagen del Producto</h3>

              <div className="grid gap-6">
                <div>
                  <Label className="mb-3 block">Imagen Principal</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fiesta-orange transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative h-40 w-40 mb-4">
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="h-40 w-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" className="bg-fiesta-orange hover:bg-mexican-red">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Imagen
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Formatos: JPG, PNG, WebP (máx. 5MB)</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-mexican-green to-fiesta-lime hover:from-fiesta-lime hover:to-mexican-green text-white font-bold"
                  >
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
