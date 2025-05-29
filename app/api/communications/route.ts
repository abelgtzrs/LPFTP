import { type NextRequest, NextResponse } from "next/server"
import { CommunicationService } from "@/lib/communicationService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    let communications

    if (published === "true") {
      communications = await CommunicationService.getPublishedCommunications()
    } else {
      communications = await CommunicationService.getAllCommunications()
    }

    return NextResponse.json({ communications })
  } catch (error) {
    console.error("Error fetching communications:", error)
    return NextResponse.json({ error: "Failed to fetch communications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const communicationData = await request.json()
    const communication = await CommunicationService.createCommunication(communicationData)

    return NextResponse.json({ communication }, { status: 201 })
  } catch (error) {
    console.error("Error creating communication:", error)
    return NextResponse.json({ error: "Failed to create communication" }, { status: 500 })
  }
}
