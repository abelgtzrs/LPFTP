import { type NextRequest, NextResponse } from "next/server"
import { CommunicationService } from "@/lib/communicationService"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const communication = await CommunicationService.getCommunicationById(params.id)

    if (!communication) {
      return NextResponse.json({ error: "Communication not found" }, { status: 404 })
    }

    return NextResponse.json({ communication })
  } catch (error) {
    console.error("Error fetching communication:", error)
    return NextResponse.json({ error: "Failed to fetch communication" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const communication = await CommunicationService.updateCommunication(params.id, updateData)

    if (!communication) {
      return NextResponse.json({ error: "Communication not found" }, { status: 404 })
    }

    return NextResponse.json({ communication })
  } catch (error) {
    console.error("Error updating communication:", error)
    return NextResponse.json({ error: "Failed to update communication" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await CommunicationService.deleteCommunication(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Communication not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Communication deleted successfully" })
  } catch (error) {
    console.error("Error deleting communication:", error)
    return NextResponse.json({ error: "Failed to delete communication" }, { status: 500 })
  }
}
