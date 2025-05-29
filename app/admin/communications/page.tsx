"use client"

import { useState } from "react"
import Link from "next/link"
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

// Sample communications data - this would come from your database in a real implementation
const initialCommunications = [
  {
    id: 1,
    title: "Horario Especial para Fiestas Patrias",
    content: "Estimados clientes, les informamos que durante las Fiestas Patrias nuestro horario será de 10am a 4pm.",
    publishDate: "2023-09-10",
    status: "published",
  },
  {
    id: 2,
    title: "Nuevos Servicios de Transferencia",
    content: "Nos complace anunciar que hemos ampliado nuestros servicios de transferencia de dinero a más países.",
    publishDate: "2023-08-15",
    status: "published",
  },
  {
    id: 3,
    title: "Mantenimiento Programado",
    content: "El próximo lunes 25 de septiembre estaremos cerrados por mantenimiento. Disculpen las molestias.",
    publishDate: "2023-09-20",
    status: "draft",
  },
  {
    id: 4,
    title: "Nuevos Productos Importados",
    content: "¡Llegaron nuevos productos importados directamente de Perú! Ven y descubre nuestras novedades.",
    publishDate: "2023-08-30",
    status: "published",
  },
]

export default function AdminCommunications() {
  const [communications, setCommunications] = useState(initialCommunications)
  const [searchTerm, setSearchTerm] = useState("")
  const [communicationToDelete, setCommunicationToDelete] = useState<number | null>(null)

  // Filter communications based on search term
  const filteredCommunications = communications.filter((communication) =>
    communication.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle communication deletion
  const handleDeleteCommunication = () => {
    if (communicationToDelete) {
      setCommunications(communications.filter((communication) => communication.id !== communicationToDelete))
      setCommunicationToDelete(null)
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
        <h1 className="text-3xl font-bold">Gestión de Comunicaciones</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar comunicaciones..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button asChild>
          <Link href="/admin/communications/new">
            <Plus className="h-4 w-4 mr-2" />
            Añadir Comunicación
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Fecha de Publicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommunications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No se encontraron comunicaciones
                </TableCell>
              </TableRow>
            ) : (
              filteredCommunications.map((communication) => (
                <TableRow key={communication.id}>
                  <TableCell className="font-medium">{communication.title}</TableCell>
                  <TableCell>{new Date(communication.publishDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {communication.status === "published" ? (
                      <Badge className="bg-green-100 text-green-800 border-green-300">Publicado</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Borrador
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/communications/${communication.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCommunicationToDelete(communication.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar eliminación</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar la comunicación "{communication.title}"? Esta acción
                              no se puede deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setCommunicationToDelete(null)}>
                              Cancelar
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteCommunication}>
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
