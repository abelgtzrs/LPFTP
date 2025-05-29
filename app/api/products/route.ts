import { type NextRequest, NextResponse } from "next/server"
import { ProductService } from "@/lib/productService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    let products

    if (search) {
      products = await ProductService.searchProducts(search)
    } else if (featured === "true") {
      products = await ProductService.getFeaturedProducts()
    } else if (category) {
      products = await ProductService.getProductsByCategory(category)
    } else {
      products = await ProductService.getAllProducts()
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    const product = await ProductService.createProduct(productData)

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
