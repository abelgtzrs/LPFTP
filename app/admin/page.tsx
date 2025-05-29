import Link from "next/link"
import { Package, Tag, MessageSquare, BarChart3, Settings } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-gray-500">Gestiona productos, promociones y comunicaciones</p>
        </div>
        <Button asChild>
          <Link href="/">Ver Sitio</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Productos</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Productos en inventario</p>
            <div className="mt-4 flex gap-2">
              <Button asChild>
                <Link href="/admin/products">Gestionar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/products/new">Añadir Nuevo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Promociones</CardTitle>
            <Tag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Promociones activas</p>
            <div className="mt-4 flex gap-2">
              <Button asChild>
                <Link href="/admin/promotions">Gestionar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/promotions/new">Añadir Nueva</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Comunicaciones</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Comunicaciones publicadas</p>
            <div className="mt-4 flex gap-2">
              <Button asChild>
                <Link href="/admin/communications">Gestionar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/communications/new">Añadir Nueva</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resumen de Actividad</CardTitle>
            <CardDescription>Visión general de la actividad reciente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Gráfico de actividad reciente</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos a funciones comunes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/products/new">
                <Package className="mr-2 h-4 w-4" />
                Añadir Producto
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/promotions/new">
                <Tag className="mr-2 h-4 w-4" />
                Crear Promoción
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/communications/new">
                <MessageSquare className="mr-2 h-4 w-4" />
                Nueva Comunicación
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Analíticas
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
