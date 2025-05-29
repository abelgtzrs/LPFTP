import { NextResponse } from "next/server"
import { ProductService } from "@/lib/productService"
import { PromotionService } from "@/lib/promotionService"
import { CommunicationService } from "@/lib/communicationService"
import { FacebookService } from "@/lib/facebookService"

export async function POST() {
  try {
    // Seed Products
    const products = [
      {
        name: "🌮 Tortillas de Maíz Artesanales",
        category: "Tortillería",
        price: 3.99,
        originalPrice: 4.99,
        description: "Tortillas de maíz tradicionales, perfectas para tacos y enchiladas.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 150,
        popular: true,
        featured: true,
        discount: 20,
      },
      {
        name: "🌶️ Salsa Habanera Casera",
        category: "Salsas y Condimentos",
        price: 4.99,
        originalPrice: 6.49,
        description: "Salsa picante artesanal con habaneros frescos y especias mexicanas.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 75,
        popular: true,
        featured: true,
        discount: 23,
      },
      {
        name: "🥑 Aguacates Hass Premium",
        category: "Frutas y Verduras",
        price: 1.99,
        originalPrice: 2.49,
        description: "Aguacates Hass maduros, perfectos para guacamole y ensaladas.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 200,
        popular: true,
        featured: true,
        discount: 20,
      },
      {
        name: "☕ Café de Chiapas Orgánico",
        category: "Bebidas",
        price: 8.99,
        originalPrice: 11.99,
        description: "Café 100% orgánico de las montañas de Chiapas, tostado artesanalmente.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 50,
        popular: true,
        featured: true,
        discount: 25,
      },
      {
        name: "🧀 Queso Fresco Oaxaca",
        category: "Lácteos",
        price: 5.99,
        originalPrice: 7.49,
        description: "Queso fresco tradicional de Oaxaca, perfecto para quesadillas.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 30,
        popular: false,
        featured: true,
        discount: 20,
      },
      {
        name: "🍫 Chocolate Abuelita",
        category: "Dulces y Postres",
        price: 3.79,
        originalPrice: 4.29,
        description: "Chocolate tradicional mexicano para bebidas calientes.",
        image: "/placeholder.svg?height=250&width=250",
        stock: 100,
        popular: true,
        featured: true,
        discount: 12,
      },
    ]

    for (const product of products) {
      await ProductService.createProduct(product)
    }

    // Seed Promotions
    const promotions = [
      {
        title: "🌮 ¡Fiesta de Sabores Mexicanos!",
        body: "Descuentos del 20% en todos los chiles, especias y salsas picantes. ¡Dale sabor auténtico a tus platillos favoritos!",
        image: "/placeholder.svg?height=300&width=500",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        active: true,
      },
      {
        title: "💰 Envíos a México ¡Sin Comisión!",
        body: "Durante todo el mes, envía dinero a México sin pagar comisión en transferencias mayores a $200. ¡Ayuda más a tu familia!",
        image: "/placeholder.svg?height=300&width=500",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        active: true,
      },
      {
        title: "🎉 2x1 en Dulces Mexicanos",
        body: "Lleva 2 y paga 1 en toda nuestra selección de dulces mexicanos: mazapanes, tamarindos, chamoy y más. ¡Para toda la familia!",
        image: "/placeholder.svg?height=300&width=500",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        active: true,
      },
    ]

    for (const promotion of promotions) {
      await PromotionService.createPromotion(promotion)
    }

    // Seed Communications
    const communications = [
      {
        title: "Horario Especial para Fiestas Patrias",
        content:
          "Estimados clientes, les informamos que durante las Fiestas Patrias nuestro horario será de 10am a 4pm. ¡Celebremos juntos nuestra cultura mexicana!",
        publishDate: "2024-01-15",
        status: "published" as const,
      },
      {
        title: "Nuevos Servicios de Transferencia",
        content:
          "Nos complace anunciar que hemos ampliado nuestros servicios de transferencia de dinero a más países de Centroamérica. Ahora puedes enviar dinero a Guatemala, El Salvador, Honduras y Nicaragua con las mejores tarifas.",
        publishDate: "2024-01-10",
        status: "published" as const,
      },
    ]

    for (const communication of communications) {
      await CommunicationService.createCommunication(communication)
    }

    // Seed Facebook Posts
    const facebookPosts = [
      {
        content:
          "🎉 ¡Nueva promoción! 2x1 en todos los dulces mexicanos durante esta semana. ¡Ven y disfruta de los sabores de tu infancia! 🍭🇲🇽",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: "2024-01-15T10:30:00Z",
        likes: 45,
        comments: 12,
        shares: 8,
        type: "promotion" as const,
        active: true,
      },
      {
        content:
          "☕ Recién llegado: Café de Chiapas 100% orgánico. El aroma y sabor que tanto extrañas de México, ahora disponible en La Placita FTP. ¡Pruébalo hoy!",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: "2024-01-14T15:45:00Z",
        likes: 32,
        comments: 7,
        shares: 5,
        type: "product" as const,
        active: true,
      },
      {
        content:
          "🌮 ¡Viernes de tacos! Nuestros tacos de carnitas están listos y esperándote. Hechos con la receta tradicional de la abuela. ¿Ya probaste nuestros tacos?",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: "2024-01-12T12:00:00Z",
        likes: 67,
        comments: 23,
        shares: 15,
        type: "food" as const,
        active: true,
      },
    ]

    for (const post of facebookPosts) {
      await FacebookService.createPost(post)
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      seeded: {
        products: products.length,
        promotions: promotions.length,
        communications: communications.length,
        facebookPosts: facebookPosts.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
