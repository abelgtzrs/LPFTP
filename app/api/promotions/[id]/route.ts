import { type NextRequest, NextResponse } from "next/server"
import { PromotionService } from "@/lib/promotionService"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const promotion = await PromotionService.getPromotionById(params.id)

    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json({ promotion })
  } catch (error) {
    console.error("Error fetching promotion:", error)
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const promotion = await PromotionService.updatePromotion(params.id, updateData)

    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json({ promotion })
  } catch (error) {
    console.error("Error updating promotion:", error)
    return NextResponse.json({ error: "Failed to update promotion" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await PromotionService.deletePromotion(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Promotion deleted successfully" })
  } catch (error) {
    console.error("Error deleting promotion:", error)
    return NextResponse.json({ error: "Failed to delete promotion" }, { status: 500 })
  }
}
