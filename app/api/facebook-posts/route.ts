import { type NextRequest, NextResponse } from "next/server"
import { FacebookService } from "@/lib/facebookService"

export async function GET() {
  try {
    const posts = await FacebookService.getActivePosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching Facebook posts:", error)
    return NextResponse.json({ error: "Failed to fetch Facebook posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()
    const post = await FacebookService.createPost(postData)

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("Error creating Facebook post:", error)
    return NextResponse.json({ error: "Failed to create Facebook post" }, { status: 500 })
  }
}
