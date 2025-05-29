"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Save, Upload, X, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function NewPromotion() {
  const router = useRouter()

  const [promotion, setPromotion] = useState({
    title: "",
    body: "",
    image: "",
    startDate: "",
    endDate: "",
    active: true,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPromotion((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setPromotion((prev) => ({
      ...prev,
      active: checked,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setPromotion((prev) => ({
          ...prev,
          image: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setPromotion((prev) => ({
      ...prev,
      image: "",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to create the promotion
    console.log("Promotion created:", promotion)

    // Redirect to promotions page after save
    router.push("/admin/promotions")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/admin/promotions">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-fiesta">🎉 Crear Nueva Promoción</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">📝 Información de la Promoción</h3>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Título de la Promoción *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={promotion.title}
                    onChange={handleChange}
                    placeholder="ej. 🎉 ¡Gran Venta de Verano!"
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="body">Descripción *</Label>
                  <Textarea
                    id="body"
                    name="body"
                    value={promotion.body}
                    onChange={handleChange}
                    placeholder="Describe los detalles de la promoción..."
                    rows={5}
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">📅 Fechas de Vigencia</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="startDate">Fecha de Inicio *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={promotion.startDate}
                    onChange={handleChange}
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="endDate">Fecha de Fin *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={promotion.endDate}
                    onChange={handleChange}
                    required
                    className="border-2 focus:border-fiesta-orange"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-fiesta-yellow/10 rounded-lg">
                <div className="flex items-center space-x-2 text-fiesta-orange">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {promotion.startDate && promotion.endDate
                      ? `Duración: ${Math.ceil((new Date(promotion.endDate).getTime() - new Date(promotion.startDate).getTime()) / (1000 * 60 * 60 * 24))} días`
                      : "Selecciona las fechas para ver la duración"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">⚙️ Configuración</h3>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="active">Promoción Activa</Label>
                  <p className="text-sm text-gray-500">La promoción será visible para los clientes</p>
                </div>
                <Switch id="active" checked={promotion.active} onCheckedChange={handleSwitchChange} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4 font-fiesta">🖼️ Imagen de la Promoción</h3>

              <div className="grid gap-6">
                <div>
                  <Label className="mb-3 block">Imagen Principal</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fiesta-orange transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative h-40 w-full mb-4">
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
                      <div className="h-40 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="promotion-image-upload"
                    />
                    <label htmlFor="promotion-image-upload" className="cursor-pointer">
                      <Button type="button" className="bg-fiesta-orange hover:bg-mexican-red">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Imagen
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Recomendado: 500x300px, JPG o PNG</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-mexican-red to-fiesta-pink hover:from-fiesta-pink hover:to-mexican-red text-white font-bold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Crear Promoción
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
