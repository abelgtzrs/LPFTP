"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Home, LogOut, Menu, MessageSquare, Package, Settings, Tag, User, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Productos", href: "/admin/products", icon: Package },
    { name: "Promociones", href: "/admin/promotions", icon: Tag },
    { name: "Comunicaciones", href: "/admin/communications", icon: MessageSquare },
    { name: "Analíticas", href: "/admin/analytics", icon: BarChart3 },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
          <div className="flex items-center justify-between px-4">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="La Placita FTP Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">La Placita</span>
            </Link>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar panel</span>
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src="/placeholder.svg?height=36&width=36"
                  alt="Avatar"
                  width={36}
                  height={36}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <Link href="/admin/profile" className="text-xs font-medium text-gray-500 hover:text-gray-700">
                  Ver perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-16 border-b">
              <Link href="/admin" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="La Placita FTP Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-bold">La Placita</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <Image
                    className="inline-block h-9 w-9 rounded-full"
                    src="/placeholder.svg?height=36&width=36"
                    alt="Avatar"
                    width={36}
                    height={36}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <Link
                    href="/admin/profile"
                    className="text-xs font-medium text-gray-500 hover:text-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="px-4 border-r border-gray-200 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h1 className="text-xl font-semibold flex items-center">Panel de Administración</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Ver notificaciones</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-3 rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Abrir menú de usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">Configuración</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
