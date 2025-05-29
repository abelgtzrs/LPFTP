"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Save, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewCommunication() {
  const router = useRouter()

  const [communication, setCommunication] = useState({
    title: "",
    content: "",
    publishDate: new Date().toISOString().split("T")[0],
    status: "draft",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCommunication((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (value: string) => {
    setCommunication((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to create the communication
    console.log("Communication created:", communication)

    // Redirect to communications page after save
    router.push("/admin/communications")
  }

  const handlePublish = () => {
    setCommunication((prev) => ({
      ...prev,
      status: "published",
    }))
    // Auto-submit when publishing
    setTimeout(() => {
      handleSubmit(new Event("submit") as any)
    }, 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/admin/communications">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-fiesta">📢 Nueva Comunicación</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">📝 Contenido de la Comunicación</h3>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={communication.title}
                    onChange={handleChange}
                    placeholder="ej. Horario Especial para Fiestas Patrias"
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="content">Contenido *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={communication.content}
                    onChange={handleChange}
                    placeholder="Escribe el contenido de la comunicación..."
                    rows={10}
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                  <p className="text-xs text-gray-500">
                    Puedes usar emojis para hacer la comunicación más atractiva 😊
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">👀 Vista Previa</h3>

              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-xl font-bold mb-3 font-fiesta text-gray-800">
                  {communication.title || "Título de la comunicación"}
                </h4>
                <div className="text-gray-600 font-mexican whitespace-pre-wrap">
                  {communication.content || "El contenido de la comunicación aparecerá aquí..."}
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Publicado el: {new Date(communication.publishDate).toLocaleDateString("es-ES")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">⚙️ Configuración</h3>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="publishDate">Fecha de Publicación</Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="date"
                    value={communication.publishDate}
                    onChange={handleChange}
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={communication.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="border-2 focus:border-fiesta-orange">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">📝 Borrador</SelectItem>
                      <SelectItem value="published">✅ Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-fiesta-orange to-mexican-red hover:from-mexican-red hover:to-fiesta-orange text-white font-bold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Borrador
                  </Button>

                  <Button
                    type="button"
                    onClick={handlePublish}
                    className="w-full bg-gradient-to-r from-mexican-green to-fiesta-lime hover:from-fiesta-lime hover:to-mexican-green text-white font-bold"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Publicar Ahora
                  </Button>
                </div>

                <div className="bg-fiesta-yellow/10 p-3 rounded-lg">
                  <p className="text-sm font-mexican text-gray-700">
                    💡 <strong>Tip:</strong> Guarda como borrador para revisar antes de publicar, o publica directamente
                    para que sea visible inmediatamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
