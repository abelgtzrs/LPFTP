import { type NextRequest, NextResponse } from "next/server"
import { PromotionService } from "@/lib/promotionService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")

    let promotions

    if (active === "true") {
      promotions = await PromotionService.getActivePromotions()
    } else {
      promotions = await PromotionService.getAllPromotions()
    }

    return NextResponse.json({ promotions })
  } catch (error) {
    console.error("Error fetching promotions:", error)
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const promotionData = await request.json()
    const promotion = await PromotionService.createPromotion(promotionData)

    return NextResponse.json({ promotion }, { status: 201 })
  } catch (error) {
    console.error("Error creating promotion:", error)
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500 })
  }
}
