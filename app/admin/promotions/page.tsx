"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Edit, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

// Sample promotion data - this would come from your database in a real implementation
const initialPromotions = [
  {
    id: 1,
    title: "¡Gran Venta de Verano!",
    image: "/placeholder.svg?height=300&width=500",
    body: "Disfruta de descuentos increíbles en todos nuestros productos frescos. ¡No te lo pierdas!",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    active: true,
  },
  {
    id: 2,
    title: "2x1 en Productos Seleccionados",
    image: "/placeholder.svg?height=300&width=500",
    body: "Lleva 2 y paga 1 en productos seleccionados de nuestra tienda. Oferta por tiempo limitado.",
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    active: true,
  },
  {
    id: 3,
    title: "Descuento en Transferencias",
    image: "/placeholder.svg?height=300&width=500",
    body: "Envía dinero a tus seres queridos con tarifas reducidas. Válido para todos los destinos.",
    startDate: "2023-06-10",
    endDate: "2023-07-10",
    active: true,
  },
  {
    id: 4,
    title: "Nuevos Productos Importados",
    image: "/placeholder.svg?height=300&width=500",
    body: "Descubre nuestra nueva selección de productos importados directamente de Latinoamérica.",
    startDate: "2023-06-05",
    endDate: "2023-08-05",
    active: true,
  },
]

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState(initialPromotions)
  const [searchTerm, setSearchTerm] = useState("")
  const [promotionToDelete, setPromotionToDelete] = useState<number | null>(null)

  // Filter promotions based on search term
  const filteredPromotions = promotions.filter((promotion) =>
    promotion.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle promotion deletion
  const handleDeletePromotion = () => {
    if (promotionToDelete) {
      setPromotions(promotions.filter((promotion) => promotion.id !== promotionToDelete))
      setPromotionToDelete(null)
    }
  }

  // Check if promotion is active based on current date
  const isActive = (startDate: string, endDate: string) => {
    const today = new Date().toISOString().split("T")[0]
    return startDate <= today && endDate >= today
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
        <h1 className="text-3xl font-bold">Gestión de Promociones</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar promociones..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button asChild>
          <Link href="/admin/promotions/new">
            <Plus className="h-4 w-4 mr-2" />
            Añadir Promoción
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Fechas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromotions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No se encontraron promociones
                </TableCell>
              </TableRow>
            ) : (
              filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div className="relative h-12 w-20">
                      <Image
                        src={promotion.image || "/placeholder.svg"}
                        alt={promotion.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{promotion.title}</TableCell>
                  <TableCell>
                    {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                    {new Date(promotion.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {isActive(promotion.startDate, promotion.endDate) ? (
                      <Badge className="bg-green-100 text-green-800 border-green-300">Activa</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Inactiva
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/promotions/${promotion.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setPromotionToDelete(promotion.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar eliminación</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar la promoción "{promotion.title}"? Esta acción no se
                              puede deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setPromotionToDelete(null)}>
                              Cancelar
                            </Button>
                            <Button variant="destructive" onClick={handleDeletePromotion}>
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
