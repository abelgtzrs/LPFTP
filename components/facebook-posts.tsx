"use client"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Share, ThumbsUp, Calendar, ExternalLink } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useFacebookPosts } from "@/lib/useFacebookPosts"

// Sample Facebook posts data
// const facebookPosts = [
//   {
//     id: 1,
//     content:
//       "🎉 ¡Nueva promoción! 2x1 en todos los dulces mexicanos durante esta semana. ¡Ven y disfruta de los sabores de tu infancia! 🍭🇲🇽",
//     image: "/placeholder.svg?height=300&width=400",
//     timestamp: "2024-01-15T10:30:00Z",
//     likes: 45,
//     comments: 12,
//     shares: 8,
//     type: "promotion",
//   },
//   {
//     id: 2,
//     content:
//       "☕ Recién llegado: Café de Chiapas 100% orgánico. El aroma y sabor que tanto extrañas de México, ahora disponible en La Placita FTP. ¡Pruébalo hoy!",
//     image: "/placeholder.svg?height=300&width=400",
//     timestamp: "2024-01-14T15:45:00Z",
//     likes: 32,
//     comments: 7,
//     shares: 5,
//     type: "product",
//   },
//   {
//     id: 3,
//     content:
//       "🌮 ¡Viernes de tacos! Nuestros tacos de carnitas están listos y esperándote. Hechos con la receta tradicional de la abuela. ¿Ya probaste nuestros tacos?",
//     image: "/placeholder.svg?height=300&width=400",
//     timestamp: "2024-01-12T12:00:00Z",
//     likes: 67,
//     comments: 23,
//     shares: 15,
//     type: "food",
//   },
//   {
//     id: 4,
//     content:
//       "💰 Envía dinero a México con las mejores tarifas de la ciudad. Rápido, seguro y confiable. Tu familia te está esperando. ¡Ven hoy mismo!",
//     image: "/placeholder.svg?height=300&width=400",
//     timestamp: "2024-01-10T09:15:00Z",
//     likes: 28,
//     comments: 5,
//     shares: 12,
//     type: "service",
//   },
// ]

export default function FacebookPosts() {
  // const [posts, setPosts] = useState(facebookPosts)
  const { posts, loading, error } = useFacebookPosts()

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace menos de 1 hora"
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`

    return postTime.toLocaleDateString("es-ES")
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "promotion":
        return "bg-mexican-red text-white"
      case "product":
        return "bg-fiesta-orange text-white"
      case "food":
        return "bg-fiesta-yellow text-mexican-red"
      case "service":
        return "bg-mexican-green text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "promotion":
        return "🎉 Promoción"
      case "product":
        return "🛍️ Producto"
      case "food":
        return "🍽️ Comida"
      case "service":
        return "💼 Servicio"
      default:
        return "📢 Noticia"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse border rounded-lg p-4">
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-32 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading Facebook posts: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Facebook Page Header */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="La Placita FTP Facebook"
              width={60}
              height={60}
              className="rounded-full border-4 border-white"
            />
            <div>
              <h3 className="text-xl font-bold font-fiesta">La Placita FTP</h3>
              <p className="text-blue-100">@LaPlacitaFTP • 2.3k seguidores</p>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://facebook.com/laplacitaftp" target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Seguir en Facebook
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Facebook Posts */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {posts.map((post) => (
          <Card key={post._id?.toString()} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="La Placita FTP"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-sm">La Placita FTP</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatTimeAgo(post.timestamp)}
                    </div>
                  </div>
                </div>
                <Badge className={`${getPostTypeColor(post.type)} border-0 text-xs`}>
                  {getPostTypeLabel(post.type)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm mb-3 font-mexican leading-relaxed">{post.content}</p>

              {post.image && (
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Facebook post image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-3 border-t">
              <div className="flex items-center justify-between w-full text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="pt-6 text-center">
          <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
            <Link href="https://facebook.com/laplacitaftp" target="_blank">
              Ver más publicaciones en Facebook
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
