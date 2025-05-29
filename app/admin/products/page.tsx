"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Edit, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Sample product data - this would come from your database in a real implementation
const initialProducts = [
  {
    id: 1,
    name: "Tortillas de Maíz",
    category: "Alimentos",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Frijoles Negros",
    category: "Alimentos",
    price: 2.49,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Salsa Picante",
    category: "Condimentos",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Queso Fresco",
    category: "Lácteos",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Aguacates",
    category: "Frutas",
    price: 1.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Mangos",
    category: "Frutas",
    price: 2.29,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Café Colombiano",
    category: "Bebidas",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Arroz",
    category: "Alimentos",
    price: 3.49,
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Get unique categories from products
const categories = [...new Set(initialProducts.map((product) => product.category))]

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Handle product deletion
  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setProductToDelete(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/admin">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-grow">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
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
        </div>

        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Añadir Producto
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-12 w-12">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setProductToDelete(product.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar eliminación</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar el producto "{product.name}"? Esta acción no se puede
                              deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setProductToDelete(null)}>
                              Cancelar
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteProduct}>
                              Eliminar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
